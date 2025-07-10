import {
  Box,
  Button,
  Switch,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { message, notification } from "antd";
import { useEffect, useState } from "react";
import {
  callCreateRole,
  callFetchPermission,
  callUpdateRole,
} from "../../../config/api";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { groupBy, map } from "lodash";
import { useParams } from "react-router-dom";

// initial values cho Formik
const initialValues = {
  name: "",
  description: "",
  active: true,
  // permissions lưu dưới dạng object, key là id permission hoặc tên module (để đánh dấu tất cả)
  permissions: {},
};

const roleSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên vai trò"),
  description: yup.string().required("Vui lòng nhập mô tả vai trò"),
});

// Hàm nhóm permissions theo module
const groupByPermission = (data) => {
  const groupedData = groupBy(data, (x) => x.module);
  return map(groupedData, (value, key) => {
    return { module: key, permissions: value };
  });
};

// Component phụ trợ dùng trong Formik để điền giá trị từ singleRole (nếu tồn tại)
const FillPermission = ({ listPermissions, singleRole }) => {
  const { setValues, values } = useFormikContext();
  useEffect(() => {
    if (listPermissions?.length && singleRole?.id) {
      // tạo bản sao giá trị mới dựa theo singleRole
      const newValues = {
        name: singleRole.name,
        description: singleRole.description,
        active: singleRole.active,
        permissions: { ...values.permissions },
      };
      // Nhóm các permission của role hiện tại
      const userPermissions = groupByPermission(singleRole.permissions);
      listPermissions.forEach((group) => {
        let allCheck = true;
        group.permissions.forEach((perm) => {
          const temp = userPermissions.find((u) => u.module === group.module);
          if (temp) {
            const isExist = temp.permissions.find((k) => k.id === perm.id);
            if (isExist) {
              newValues.permissions[perm.id] = true;
            } else {
              allCheck = false;
            }
          } else {
            allCheck = false;
          }
        });
        // Đánh dấu checkbox toàn bộ cho module
        newValues.permissions[group.module] = allCheck;
      });
      setValues(newValues);
    }
  }, [listPermissions, singleRole, setValues, values.permissions]);
  return null;
};

const AddRole = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [listPermissions, setListPermissions] = useState([]);
  const singleRole = useAppSelector((state) => state.role.singleRole);
  const dispatch = useAppDispatch();

  // Fetch danh sách permission (để hiển thị checkbox nhóm theo module)
  useEffect(() => {
    const init = async () => {
      const res = await callFetchPermission(`page=1&size=100`);
      if (res.data?.result) {
        setListPermissions(groupByPermission(res.data.result));
      }
    };
    init();
  }, []);

  // Xử lý submit role (update nếu singleRole tồn tại, create nếu không)
  const submitRole = async (valuesForm, { resetForm }) => {
    const { name, description, active, permissions } = valuesForm;
    const checkedPermissions = [];

    if (permissions) {
      for (const key in permissions) {
        // Kiểm tra chỉ key là id (kiểu số) và giá trị true
        if (/^[1-9][0-9]*$/.test(key) && permissions[key] === true) {
          checkedPermissions.push({ id: key });
        }
      }
    }

    const role = { name, description, active, permissions: checkedPermissions };

    if (singleRole?.id) {
      // Cập nhật role
      const res = await callUpdateRole(role, singleRole.id);
      if (res.data) {
        message.success("Cập nhật role thành công");
        // handleReset và reloadTable là các hàm của dự án bạn, gọi sau khi update thành công
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    } else {
      // Tạo mới role
      console.log("Tạo mới role:", role);
      const res = await callCreateRole(role);
      if (res.data) {
        message.success("Thêm mới role thành công");
        resetForm();
        // handleReset và reloadTable tương tự trên
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="THÊM VAI TRÒ" subtitle="Tạo thông tin vai trò mới" />

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={roleSchema}
        onSubmit={submitRole}
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
            {/* Nếu đang chỉnh sửa role, điền dữ liệu permission */}
            <FillPermission
              listPermissions={listPermissions}
              singleRole={singleRole}
            />
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Tên vai trò */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên vai trò"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Kích hoạt vai trò */}
              <Box display="flex" alignItems="center" gridColumn="span 2">
                <Switch
                  checked={values.active}
                  onChange={(e) => setFieldValue("active", e.target.checked)}
                  name="active"
                />
                <span style={{ marginLeft: 10 }}>Kích hoạt vai trò</span>
              </Box>
              {/* Mô tả vai trò */}
              <TextField
                fullWidth
                variant="filled"
                multiline
                minRows={4}
                label="Mô tả vai trò"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Hiển thị danh sách Permissions theo nhóm */}
              {listPermissions.map((group) => (
                <Box
                  key={group.module}
                  sx={{
                    gridColumn: "span 4",
                    border: "1px solid #ccc",
                    p: 2,
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!!values.permissions[group.module]}
                          onChange={(e) => {
                            // Nếu chọn toàn bộ (module), set tất cả các permission của module lên true
                            group.permissions.forEach((perm) => {
                              setFieldValue(
                                `permissions.${perm.id}`,
                                e.target.checked
                              );
                            });
                            setFieldValue(
                              `permissions.${group.module}`,
                              e.target.checked
                            );
                          }}
                          color="primary"
                        />
                      }
                      label={group.module}
                    />
                  </Box>
                  <Box sx={{ pl: 3, display: "flex", flexWrap: "wrap" }}>
                    {group.permissions.map((perm) => (
                      <FormControlLabel
                        key={perm.id}
                        control={
                          <Switch
                            checked={!!values.permissions[perm.id]}
                            onChange={(e) =>
                              setFieldValue(
                                `permissions.${perm.id}`,
                                e.target.checked
                              )
                            }
                            color="primary"
                          />
                        }
                        // Hiển thị tên permission kèm theo method và apiPath
                        label={`${perm.name} (Method: ${perm.method}, API: ${perm.apiPath})`}
                        sx={{ width: "40%" }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box display="flex" justifyContent="end" mt="60px">
              <Button type="submit" color="secondary" variant="contained">
                {singleRole?.id ? "Cập nhật vai trò" : "Thêm vai trò"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddRole;
