import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import "react-quill/dist/quill.snow.css";
import { message, notification } from "antd";
import {
  callCreateQuestion,
  callFetchAllPosition,
  callFetchAllSkill,
} from "../../../config/api";
import { useEffect, useState } from "react";

const initialValues = {
  questionName: "",
  answer: "",
  skillId: "", // sửa tên thành skillId
  positionId: "", // sửa tên thành positionId
};

const questionSchema = yup.object().shape({
  questionName: yup.string().required("Vui lòng nhập tên câu hỏi"),
  answer: yup.string().required("Vui lòng nhập câu trả lời"),
  skillId: yup.string().required("Vui lòng chọn một kỹ năng"),
  positionId: yup.string().required("Vui lòng chọn một vị trí"),
});

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

async function fetchPositionList() {
  const res = await callFetchAllPosition(`page=1&size=100`);
  if (res && res.data) {
    const list = res.data;
    return list.map((item) => ({
      label: item.positionName,
      value: `${item.idPosition}`,
    }));
  }
  return [];
}

const AddQuestion = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [skills, setSkills] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const skillData = await fetchSkillList();
      setSkills(skillData);
      const positionData = await fetchPositionList();
      setPositions(positionData);
    }
    fetchData();
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    const payload = {
      questionName: values.questionName,
      answer: values.answer,
      skillId: Number(values.skillId),
      positionId: Number(values.positionId),
    };

    console.log("Submitting question:", payload);
    const res = await callCreateQuestion(payload);
    if (res.data) {
      message.success("Thêm mới câu hỏi thành công");
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
      <Header title="THÊM CÂU HỎI" subtitle="Tạo thông tin câu hỏi mới" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={questionSchema}
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
                label="Tên câu hỏi"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.questionName}
                name="questionName"
                error={!!touched.questionName && !!errors.questionName}
                helperText={touched.questionName && errors.questionName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Câu trả lời"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.answer}
                name="answer"
                error={!!touched.answer && !!errors.answer}
                helperText={touched.answer && errors.answer}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Chọn 1 kỹ năng */}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Kỹ năng"
                name="skillId"
                value={values.skillId}
                onChange={(e) => setFieldValue("skillId", e.target.value)}
                onBlur={handleBlur}
                error={!!touched.skillId && !!errors.skillId}
                helperText={touched.skillId && errors.skillId}
                sx={{ gridColumn: "span 4" }}
              >
                {skills.map((skill) => (
                  <MenuItem key={skill.value} value={skill.value}>
                    {skill.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Chọn 1 vị trí */}
              <TextField
                select
                fullWidth
                variant="filled"
                label="Vị trí"
                name="positionId"
                value={values.positionId}
                onChange={(e) => setFieldValue("positionId", e.target.value)}
                onBlur={handleBlur}
                error={!!touched.positionId && !!errors.positionId}
                helperText={touched.positionId && errors.positionId}
                sx={{ gridColumn: "span 4" }}
              >
                {positions.map((position) => (
                  <MenuItem key={position.value} value={position.value}>
                    {position.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="60px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm câu hỏi
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddQuestion;
