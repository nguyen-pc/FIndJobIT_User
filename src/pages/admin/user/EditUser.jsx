import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  callFetchUserById,
  callFetchSkillNoPagination,
  callFetchCompany,
  callFetchRole,
  callUpdateUser, // Giả sử có API này để lấy danh sách vai trò
} from "../../../config/api";

const EditUser = ({ onSubmit }) => {
  const location = useLocation();
  const [displayUser, setDisplayUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const userData = location.state;

  console.log("EditUser userData:", userData);

  useEffect(() => {
    if (userData?.id) {
      fetchUserData();
      fetchSkillsData();
      fetchCompanyData();
      fetchRoleData();
    }
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const res = await callFetchUserById(userData.id);
      console.log("Dữ liệu người dùng đã tải:", res.data);
      if (res && res.data) {
        setDisplayUser(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu người dùng:", error);
    }
  };

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

  const fetchSkillsData = async () => {
    try {
      const res = await callFetchSkillNoPagination();
      if (res && res.data) {
        setSkills(res.data);
        console.log("Kỹ năng đã tải:", res.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải kỹ năng:", error);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      // Chuyển đổi role và company sang định dạng đối tượng
      const payload = {
        ...values,
        role: { id: values.role },
        company: { id: values.company },
      };
      console.log("Submitting form with payload:", payload);
      const res = await callUpdateUser(payload);
      if (res && res.statusCode === 200) {
        console.log("User has been updated successfully:", res.data);
        // Ví dụ: thông báo thành công, redirect, ...
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
        title="CHỈNH SỬA NGƯỜI DÙNG"
        subtitle="Cập nhật thông tin người dùng"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          ...userData,
          name: userData?.name || "",
          phoneNumber: displayUser?.phoneNumber || "",
          address: userData?.address || "",
          taxNumber: displayUser?.taxNumber || "",
          age: userData?.age || "",
          gender: userData?.gender || "",
          // Lưu trữ dưới dạng id cho role và company
          role: userData?.role ? userData.role.id : "",
          company: userData?.company ? userData.company.id : "",
        }}
        enableReinitialize
        validationSchema={yup.object().shape({
          name: yup.string().required("Vui lòng nhập họ và tên"),
          gender: yup.string().required("Vui lòng chọn giới tính"),
          age: yup
            .number()
            .required("Vui lòng nhập tuổi")
            .min(0, "Tuổi không hợp lệ"),
          phoneNumber: yup
            .string()
            .matches(
              /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
              "Số điện thoại không hợp lệ"
            ),
          address: yup.string().required("Vui lòng nhập địa chỉ"),
          taxNumber: yup.string(),
        })}
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
                value={values.email}
                name="email"
                disabled
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

              {/* Chọn Vai trò */}
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

              {/* Chọn Công ty */}
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
              <Button type="submit" color="primary" variant="contained">
                Cập nhật
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

const userEditSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  age: yup.number().required("Vui lòng nhập tuổi").min(0, "Tuổi không hợp lệ"),
  phoneNumber: yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
  taxNumber: yup.string(),
});

export default EditUser;
