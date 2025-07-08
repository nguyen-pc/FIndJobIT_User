import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload, message, notification } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import {
  callFetchCompanyById,
  callUpdateCompany,
  callUploadSingleFile,
} from "../../../config/api";

const jobSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên công ty"),
  address: yup.string().required("Vui lòng nhập địa điểm"),
  description: yup.string().required("Nhập mô tả"),
});

const EditCompany = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [displayCompany, setDisplayCompany] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [dataLogo, setDataLogo] = useState([]);
  const [dataBanner, setDataBanner] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await callFetchCompanyById(id);
          console.log("res", res);
          if (res.data) {
            setDisplayCompany(res.data);
          }
        } catch (error) {
          console.error("Error fetching company data:", error);
          notification.error({
            message: "Có lỗi xảy ra",
            description: "Không thể tải thông tin công ty.",
          });
        }
      })();
    }
  }, [id]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handlePreview = async (file) => {
    if (!file.originFileObj) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
      return;
    }
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeImage = (info) => {
    if (info.file.status === "uploading") {
      setLoadingUpload(true);
    }
    if (info.file.status === "done") {
      setLoadingUpload(false);
    }
    if (info.file.status === "error") {
      setLoadingUpload(false);
      message.error(
        info?.file?.error?.event?.message ?? "Đã có lỗi xảy ra khi upload file."
      );
    }
  };

  // Upload file Logo
  const handleUploadFileLogo = async (
    { file, onSuccess, onError },
    setFieldValue
  ) => {
    const res = await callUploadSingleFile(file, "company");
    if (res && res.data) {
      const fileName = res.data.fileName;
      // Cập nhật dataLogo để hiển thị ảnh
      setDataLogo([
        {
          uid: uuidv4(),
          name: fileName,
          url: `/path/to/your/images/${fileName}`,
        },
      ]);
      setFieldValue("logo", fileName);
      if (onSuccess) onSuccess("ok");
    } else {
      if (onError) {
        setDataLogo([]);
        const error = new Error(res.message);
        onError({ event: error });
      }
    }
  };

  // Upload file Banner
  const handleUploadFileBanner = async (
    { file, onSuccess, onError },
    setFieldValue
  ) => {
    const res = await callUploadSingleFile(file, "company");
    if (res && res.data) {
      const fileName = res.data.fileName;
      setDataBanner([
        {
          uid: uuidv4(),
          name: fileName,
          url: `/path/to/your/images/${fileName}`,
        },
      ]);
      setFieldValue("banner", fileName);
      if (onSuccess) onSuccess("ok");
    } else {
      if (onError) {
        setDataBanner([]);
        const error = new Error(res.message);
        onError({ event: error });
      }
    }
  };

  const handleRemoveFile = (file, type) => {
    if (type === "logo") {
      setDataLogo([]);
    } else if (type === "banner") {
      setDataBanner([]);
    }
  };

  const handleFormSubmit = async (values) => {
    console.log("Submitted values:", values);
    if (!values.logo) {
      message.error("Vui lòng upload ảnh Logo");
      return;
    }
    const payload = {
      id: id, // Thêm id để cập nhật đúng công ty
      name: values.name,
      address: values.address,
      description: values.description,
      logo: values.logo,
      banner: values.banner,
    };
    const res = await callUpdateCompany(
      payload.id,
      payload.name,
      payload.address,
      payload.description,
      payload.logo,
      payload.banner
    );
    if (res.data) {
      message.success("Cập nhật thông tin công ty thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  // Sử dụng displayCompany để khởi tạo giá trị cho form
  const formInitialValues = {
    name: displayCompany?.name || "",
    address: displayCompany?.address || "",
    logo: displayCompany?.logo || "",
    banner: displayCompany?.banner || "",
    description: displayCompany?.description || "",
  };

  return (
    <Box m="20px">
      <Header title="CHỈNH SỬA CÔNG TY" subtitle="Cập nhật thông tin công ty" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={formInitialValues}
        validationSchema={jobSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên công ty"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa điểm"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Upload Logo */}
              <Box gridColumn="span 2">
                <div>
                  <span className="font-medium">Ảnh công ty (Logo)</span>
                  <Upload
                    name="logo"
                    listType="picture-card"
                    className="avatar-uploader"
                    maxCount={1}
                    multiple={false}
                    customRequest={(options) =>
                      handleUploadFileLogo(options, setFieldValue)
                    }
                    beforeUpload={beforeUpload}
                    onChange={handleChangeImage}
                    onRemove={(file) => handleRemoveFile(file, "logo")}
                    onPreview={handlePreview}
                    fileList={
                      // nếu có ảnh đã có, hiển thị nó
                      values.logo
                        ? [
                            {
                              uid: "logo",
                              name: values.logo,
                              url: `${
                                import.meta.env.VITE_BACKEND_URL
                              }/storage/company/${values.logo}`,
                            },
                          ]
                        : dataLogo
                    }
                  >
                    <div>
                      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </div>
              </Box>
              {/* Upload Banner */}
              <Box gridColumn="span 2">
                <div>
                  <span className="font-medium">Ảnh bìa công ty (Banner)</span>
                  <Upload
                    name="banner"
                    listType="picture-card"
                    className="avatar-uploader"
                    maxCount={1}
                    multiple={false}
                    customRequest={(options) =>
                      handleUploadFileBanner(options, setFieldValue)
                    }
                    beforeUpload={beforeUpload}
                    onChange={handleChangeImage}
                    onRemove={(file) => handleRemoveFile(file, "banner")}
                    onPreview={handlePreview}
                    fileList={
                      values.banner
                        ? [
                            {
                              uid: "banner",
                              name: values.banner,
                              url: `${
                                import.meta.env.VITE_BACKEND_URL
                              }/storage/company/${values.banner}`,
                            },
                          ]
                        : dataBanner
                    }
                  >
                    <div>
                      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </div>
              </Box>
              <Box gridColumn="span 4">
                <ReactQuill
                  theme="snow"
                  value={values.description}
                  onChange={(content) => setFieldValue("description", content)}
                  style={{ width: "100%", height: "200px" }}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="60px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật công ty
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditCompany;
