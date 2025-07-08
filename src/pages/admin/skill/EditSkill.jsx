import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { message, notification } from "antd";
import { callFetchSkillById, callUpdateSkill } from "../../../config/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const skillSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên kĩ năng"),
});

const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [displaySkill, setDisplaySkill] = useState(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await callFetchSkillById(id);
          if (res.data) {
            setDisplaySkill(res.data);
          }
        } catch (error) {
          console.error("Error fetching skill data:", error);
          notification.error({
            message: "Có lỗi xảy ra",
            description: "Không thể tải thông tin skill.",
          });
        }
      })();
    }
  }, [id]);

  const handleFormSubmit = async (values) => {
    console.log("Submitted values:", values);
    const payload = {
      id,
      name: values.name,
    };
    console.log("Payload for update:", payload);
    const res = await callUpdateSkill(payload.id, payload.name);
    if (res.data) {
      message.success("Cập nhật kĩ năng thành công");
      navigate("/admin/skillManagement");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  // Xây dựng giá trị khởi tạo cho Formik dựa trên dữ liệu fetch được
  const formInitialValues = {
    name: displaySkill ? displaySkill.name : "",
  };

  return (
    <Box m="20px">
      <Header title="CẬP NHẬT KĨ NĂNG" subtitle="Chỉnh sửa thông tin kĩ năng" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={formInitialValues}
        validationSchema={skillSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                label="Tên kĩ năng"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="60px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditSkill;
