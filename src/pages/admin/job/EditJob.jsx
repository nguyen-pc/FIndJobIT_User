import { Box, Button, TextField, MenuItem, Switch } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, notification } from "antd";
import {
  callFetchJobById,
  callUpdateJob,
  callFetchCompany,
  callFetchAllSkill,
} from "../../../config/api";
import { LOCATION_LIST } from "../../../config/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const jobSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên công việc"),
  skills: yup.array().min(1, "Chọn ít nhất một kỹ năng"),
  company: yup.object({
    id: yup.string().required("Chọn công ty"),
    name: yup.string(),
  }),
  location: yup.string().required("Vui lòng nhập địa điểm"),
  salary: yup.number().required("Vui lòng nhập mức lương"),
  quantity: yup.number().required("Vui lòng nhập số lượng"),
  level: yup.string().required("Chọn cấp bậc"),
  description: yup.string().required("Nhập mô tả"),
  startDate: yup.string().required("Chọn ngày bắt đầu"),
  endDate: yup.string().required("Chọn ngày kết thúc"),
  active: yup.boolean(),
});

// Mẫu giá trị mặc định nếu chưa có dữ liệu
const initialValues = {
  name: "",
  skills: [],
  company: { id: "", name: "" },
  location: "",
  salary: 0,
  quantity: 1,
  level: "",
  description: "",
  startDate: "",
  endDate: "",
  active: true,
};

async function fetchCompanyList(name) {
  const res = await callFetchCompany(`page=1&size=100&name ~ '${name}'`);
  if (res && res.data) {
    const list = res.data.result;
    return list.map((item) => ({
      label: item.name,
      // Gán value theo định dạng "id@#$logo"
      value: `${item.id}@#$${item.logo}`,
    }));
  }
  return [];
}

async function fetchSkillList() {
  const res = await callFetchAllSkill(`page=1&size=100`);
  if (res && res.data) {
    const list = res.data.result;
    return list.map((item) => ({
      label: item.name,
      value: `${item.id}`,
    }));
  }
  return [];
}

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [displayJob, setDisplayJob] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await callFetchJobById(id);
        if (res && res.data) {
          setDisplayJob(res.data);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        notification.error({
          message: "Có lỗi xảy ra",
          description: "Không thể tải thông tin công việc.",
        });
      }
    }
    async function fetchData() {
      try {
        const companyRes = await callFetchCompany(`page=1&size=100&name ~ ''`);
        if (companyRes && companyRes.data) {
          setCompanies(
            companyRes.data.result.map((item) => ({
              label: item.name,
              value: `${item.id}@#$${item.logo}`,
            }))
          );
        }
        const skillsRes = await callFetchAllSkill("page=1&size=100");
        if (skillsRes && skillsRes.data) {
          setSkills(
            skillsRes.data.result.map((item) => ({
              label: item.name,
              value: `${item.id}`,
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching companies/skills:", err);
      }
    }
    fetchJob();
    fetchData();
  }, [id]);

  // Xây dựng initialValues cho Formik từ displayJob nếu có
  const formInitialValues = displayJob
    ? {
        name: displayJob.name || "",
        skills: displayJob.skills
          ? displayJob.skills.map((skill) => String(skill.id))
          : [],
        company: {
          id: displayJob.company?.id || "",
          name: displayJob.company?.name || "",
        },
        location: displayJob.location || "",
        salary: displayJob.salary || 0,
        quantity: displayJob.quantity || 1,
        level: displayJob.level || "",
        description: displayJob.description || "",
        startDate: displayJob.startDate
          ? dayjs(displayJob.startDate).format("YYYY-MM-DD")
          : "",
        endDate: displayJob.endDate
          ? dayjs(displayJob.endDate).format("YYYY-MM-DD")
          : "",
        active: displayJob.active,
      }
    : initialValues;

  const handleFormSubmit = async (values) => {
    const arrSkills = values?.skills?.map((item) => ({ id: +item }));
    const job = {
      name: values.name,
      skills: arrSkills,
      company: {
        id: values.company.id,
        name: values.company.name,
      },
      location: values.location,
      salary: values.salary,
      quantity: values.quantity,
      level: values.level,
      description: values.description,
      // Chuyển đổi định dạng ngày "YYYY-MM-DD" thành đối tượng Date
      startDate: dayjs(values.startDate, "YYYY-MM-DD").toDate(),
      endDate: dayjs(values.endDate, "YYYY-MM-DD").toDate(),
      active: values.active,
    };

    console.log("Job data to submit:", job);

    try {
      const res = await callUpdateJob(job,id );
      if (res.data) {
        message.success("Cập nhật công việc thành công");
        navigate("/admin/jobManagement");
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    } catch (error) {
      console.error("Error updating job:", error);
      notification.error({
        message: "Có lỗi xảy ra",
        description: error.message,
      });
    }
  };

  return (
    <Box m="20px">
      <Header
        title="CẬP NHẬT CÔNG VIỆC"
        subtitle="Cập nhật thông tin công việc"
      />

      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={jobSchema}
        onSubmit={handleFormSubmit}
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
              {/* Tên công việc */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên công việc"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              {/* Chọn công ty */}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Công ty"
                name="company.id"
                value={values.company.id || ""}
                onChange={(e) => {
                  const selectedCompanyId = e.target.value;
                  const company = companies.find(
                    (c) => c.value.split("@#$")[0] === selectedCompanyId
                  );
                  // Cập nhật cả id và name
                  setFieldValue(
                    "company",
                    company
                      ? { id: selectedCompanyId, name: company.label }
                      : {}
                  );
                }}
                onBlur={handleBlur}
                error={!!touched.company?.id && !!errors.company?.id}
                helperText={touched.company?.id && errors.company?.id}
                sx={{ gridColumn: "span 2" }}
              >
                {companies.map((company) => {
                  const [id] = company.value.split("@#$");
                  return (
                    <MenuItem key={id} value={id}>
                      {company.label}
                    </MenuItem>
                  );
                })}
              </TextField>

              {/* Chọn kỹ năng */}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Kỹ năng (giữ Ctrl để chọn nhiều)"
                name="skills"
                SelectProps={{ multiple: true }}
                value={values.skills}
                onChange={(e) => setFieldValue("skills", e.target.value)}
                onBlur={handleBlur}
                error={!!touched.skills && !!errors.skills}
                helperText={touched.skills && errors.skills}
                sx={{ gridColumn: "span 4" }}
              >
                {skills.map((skill) => (
                  <MenuItem key={skill.value} value={skill.value}>
                    {skill.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Các trường khác */}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Địa điểm"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              >
                {LOCATION_LIST.map((loc) => (
                  <MenuItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Mức lương"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salary}
                name="salary"
                error={!!touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Số lượng"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                select
                fullWidth
                variant="filled"
                label="Cấp bậc"
                name="level"
                value={values.level}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.level && !!errors.level}
                helperText={touched.level && errors.level}
                sx={{ gridColumn: "span 2" }}
              >
                {["INTERN", "FRESHER", "JUNIOR", "MIDDLE", "SENIOR"].map(
                  (level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  )
                )}
              </TextField>

              <Box gridColumn="span 4">
                <ReactQuill
                  theme="snow"
                  value={values.description}
                  onChange={(content) => setFieldValue("description", content)}
                  style={{
                    width: "100%",
                    height: "200px",
                    marginBottom: "20px",
                  }}
                />
              </Box>

              {/* Chọn ngày bắt đầu */}
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Ngày bắt đầu"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                name="startDate"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Chọn ngày kết thúc */}
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Ngày kết thúc"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate}
                name="endDate"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
                sx={{ gridColumn: "span 2" }}
              />

              <Box display="flex" alignItems="center" gridColumn="span 4">
                <Switch
                  checked={values.active}
                  onChange={(e) => setFieldValue("active", e.target.checked)}
                  name="active"
                />
                <span style={{ marginLeft: 10 }}>Kích hoạt công việc</span>
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật công việc
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditJob;
