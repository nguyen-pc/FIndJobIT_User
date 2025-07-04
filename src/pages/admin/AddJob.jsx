import { Box, Button, TextField, MenuItem, Switch } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/admin/Header";

const skillOptions = ["JavaScript", "React", "Node.js", "Python"];
const levelOptions = ["Intern", "Fresher", "Junior", "Mid", "Senior"];
const companyOptions = [
  { id: "1", name: "FPT Software" },
  { id: "2", name: "VNG Corp" },
];

const AddJob = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="THÊM CÔNG VIỆC" subtitle="Tạo thông tin công việc mới" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={jobSchema}
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
                label="Tên công việc"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                select
                fullWidth
                variant="filled"
                label="Công ty"
                name="company.id"
                value={values.company.id}
                onChange={(e) => {
                  const company = companyOptions.find(
                    (c) => c.id === e.target.value
                  );
                  setFieldValue("company", company || {});
                }}
                onBlur={handleBlur}
                error={!!touched.company?.id && !!errors.company?.id}
                helperText={touched.company?.id && errors.company?.id}
                sx={{ gridColumn: "span 2" }}
              >
                {companyOptions.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
              </TextField>

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
                {skillOptions.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    {skill}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa điểm"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />

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
                {levelOptions.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                multiline
                rows={4}
                label="Mô tả công việc"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />

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
                Thêm công việc
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

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
});

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

export default AddJob;
