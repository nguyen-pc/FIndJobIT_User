import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import "react-quill/dist/quill.snow.css";
import { message, notification } from "antd";
import { callCreatePermission, callCreateSkill } from "../../../config/api";

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

const AddPermission = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    const payload = {
      name: values.name,
      apiPath: values.apiPath,
      method: values.method,
      module: values.module,
    };
    
    console.log("Payload to create permission:", payload);
    const res = await callCreatePermission(payload);
    if (res.data) {
      message.success("Thêm mới permission thành công");
      resetForm();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  return (
    <Box m="20px">
      <Header
        title="THÊM PERMISSION (QUYỀN HẠN)"
        subtitle="Tạo thông tin permission mới"
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={permissionSchema}
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
                Thêm permission
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddPermission;
