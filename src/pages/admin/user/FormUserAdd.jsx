import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { useEffect, useState } from "react";
import { callCreateUser, callFetchCompany, callFetchRole } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const FormUserAdd = () => {
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyData();
    fetchRoleData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const res = await callFetchCompany("page=1&size=100");
      console.log("Công ty đã tải:", res.data.result);
      if (res && res.data && res.data.result) {
        setCompanies(res.data.result);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu công ty:", error);
    }
  };

  const fetchRoleData = async () => {
    try {
      const res = await callFetchRole("page=1&size=100");
      console.log("Vai trò đã tải:", res.data.result);
      if (res && res.data && res.data.result) {
        setRoles(res.data.result);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu vai trò:", error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      // Chuyển đổi role và company sang định dạng đối tượng
      const payload = {
        ...values,
        role: { id: values.role },
        company: { id: values.company },
      };
      console.log("Submitting form with payload:", payload);
      const res = await callCreateUser(payload);
      if (res) {
        console.log("User has been updated successfully:", res.data);
        message.success("Tạo người dùng thành công");
        navigate("/admin/userManagement");
      } else {
        console.error("Failed to update user:", res.message);
        // Ví dụ: hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Ví dụ: thông báo lỗi cho người dùng
    }
  };
  return (
    <Box m="20px">
      <Header
        title="TẠO NGƯỜI DÙNG"
        subtitle="Thêm người dùng mới vào hệ thống"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
                label="Họ và tên"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                select
                fullWidth
                variant="filled"
                label="Giới tính"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="MALE">MALE</MenuItem>
                <MenuItem value="FEMALE">FEMALE</MenuItem>
                <MenuItem value="OTHER">OTHER</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Tuổi"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mật khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số điện thoại"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mã số thuế"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.taxNumber}
                name="taxNumber"
                error={!!touched.taxNumber && !!errors.taxNumber}
                helperText={touched.taxNumber && errors.taxNumber}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                select
                fullWidth
                variant="filled"
                label="Vai trò"
                name="role"
                value={values.role}
                onChange={handleChange}
                sx={{ gridColumn: "span 2" }}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                variant="filled"
                label="Công ty"
                name="company"
                value={values.company}
                onChange={handleChange}
                sx={{ gridColumn: "span 2" }}
              >
                {companies.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Tạo người dùng
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  age: yup.number().required("Vui lòng nhập tuổi").min(0, "Tuổi không hợp lệ"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  phoneNumber: yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

const initialValues = {
  name: "",
  gender: "",
  age: "",
  email: "",
  password: "",
  phoneNumber: "",
  taxNumber: "",
  address: "",
  role: {
    id: "",
    name: "",
  },
  company: {
    id: "",
    name: "",
  },
};

export default FormUserAdd;
