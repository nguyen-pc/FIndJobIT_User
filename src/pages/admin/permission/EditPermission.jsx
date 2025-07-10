import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { message, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  callFetchPermissionById,
  callUpdatePermission,
} from "../../../config/api";

const initialValues = {
  name: "",
  apiPath: "",
  method: "",
  module: "",
};

const permissionSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên permission"),
  apiPath: yup.string().required("Vui lòng nhập api path"),
  method: yup.string().required("Vui lòng chọn phương thức"),
  module: yup.string().required("Vui lòng chọn module"),
});

// Danh sách các lựa chọn cho Method và Module
const HTTP_METHODS = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "PATCH", label: "PATCH" },
  { value: "DELETE", label: "DELETE" },
];

const MODULE_OPTIONS = [
  { value: "USERS", label: "USERS" },
  { value: "PERMISSIONS", label: "PERMISSIONS" },
  { value: "JOBS", label: "JOBS" },
  { value: "COMPANIES", label: "COMPANIES" },
  { value: "SKILLS", label: "SKILLS" },
  { value: "RESUMES", label: "RESUMES" },
  { value: "SUBSCRIBERS", label: "SUBSCRIBERS" },
  { value: "ROLES", label: "ROLES" },
  { value: "FILES", label: "FILES" },
];

const EditPermission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [displayPermission, setDisplayPermission] = useState(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await callFetchPermissionById(id);
          console.log(id);
          console.log("Fetched permission data:", res);
          if (res.data) {
            setDisplayPermission(res.data);
          }
        } catch (error) {
          console.error("Error fetching permission data:", error);
          notification.error({
            message: "Có lỗi xảy ra",
            description: "Không thể tải thông tin permission.",
          });
        }
      })();
    }
  }, [id]);

  // Xây dựng giá trị khởi tạo cho Formik từ displayPermission nếu có, ngược lại dùng initialValues
  const formInitialValues = displayPermission
    ? {
        name: displayPermission.name || "",
        apiPath: displayPermission.apiPath || "",
        method: displayPermission.method || "",
        module: displayPermission.module || "",
      }
    : initialValues;

  const handleFormSubmit = async (values, { resetForm }) => {
    const payload = {
      name: values.name,
      apiPath: values.apiPath,
      method: values.method,
      module: values.module,
    };

    console.log("Payload to edit permission:", payload);
    try {
      const res = await callUpdatePermission(payload, id);
      if (res.data) {
        message.success("Cập nhật permission thành công");

        // Nếu cần chuyển hướng, uncomment dòng dưới:
        navigate("/admin/permissionManagement");
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    } catch (error) {
      console.error("Error updating permission:", error);
      notification.error({
        message: "Có lỗi xảy ra",
        description: error.message,
      });
    }
  };

  return (
    <Box m="20px">
      <Header
        title="CHỈNH SỬA PERMISSION (QUYỀN HẠN)"
        subtitle="Cập nhật thông tin permission"
      />
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={permissionSchema}
        onSubmit={handleFormSubmit}
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
              {/* Tên permission */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên permission"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              {/* API Path */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="API Path"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apiPath}
                name="apiPath"
                error={!!touched.apiPath && !!errors.apiPath}
                helperText={touched.apiPath && errors.apiPath}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Method */}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Method"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.method}
                name="method"
                error={!!touched.method && !!errors.method}
                helperText={touched.method && errors.method}
                sx={{ gridColumn: "span 2" }}
              >
                {HTTP_METHODS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
              {/* Module */}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Module"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.module}
                name="module"
                error={!!touched.module && !!errors.module}
                helperText={touched.module && errors.module}
                sx={{ gridColumn: "span 2" }}
              >
                {MODULE_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="60px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật permission
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditPermission;
