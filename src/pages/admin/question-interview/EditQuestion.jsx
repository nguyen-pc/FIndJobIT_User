import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { message, notification } from "antd";
import {
  callFetchAllPosition,
  callFetchAllSkill,
  callFetchQuestionById,
  callUpdateQuestion,
} from "../../../config/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [displayQuestion, setDisplayQuestion] = useState(null);
  const [skills, setSkills] = useState([]);
  const [positions, setPositions] = useState([]);

  // Fetch danh sách kỹ năng và vị trí từ API
  useEffect(() => {
    async function fetchData() {
      const skillData = await fetchSkillList();
      setSkills(skillData);
      const positionData = await fetchPositionList();
      setPositions(positionData);
    }
    fetchData();
  }, []);

  // Fetch thông tin câu hỏi cần chỉnh sửa theo id
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await callFetchQuestionById(id);
          console.log("Fetched question data:", res);
          if (res.data) {
            setDisplayQuestion(res.data);
          }
        } catch (error) {
          console.error("Error fetching question data:", error);
          notification.error({
            message: "Có lỗi xảy ra",
            description: "Không thể tải thông tin câu hỏi.",
          });
        }
      })();
    }
  }, [id]);

  // Xử lý submit form cập nhật
  const handleFormSubmit = async (values) => {
    const payload = {
      idQuestion: id,
      questionName: values.questionName,
      answer: values.answer,
      skillId: Number(values.skillId),
      positionId: Number(values.positionId),
    };
    console.log("Payload for update question:", payload);
    const res = await callUpdateQuestion(payload);
    if (res.data) {
      message.success("Cập nhật câu hỏi thành công");
      navigate("/admin/questionManagement");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  // Build giá trị khởi tạo cho Formik từ displayQuestion
  const formInitialValues = {
    questionName: displayQuestion ? displayQuestion.questionName : "",
    answer: displayQuestion ? displayQuestion.answer : "",
    // Nếu data trả về có đối tượng skill và position, map về dạng flat
    skillId:
      displayQuestion && displayQuestion.skill
        ? `${displayQuestion.skill.id}`
        : "",
    positionId:
      displayQuestion && displayQuestion.position
        ? `${displayQuestion.position.idPosition}`
        : "",
  };

  return (
    <Box m="20px">
      <Header title="CẬP NHẬT CÂU HỎI" subtitle="Chỉnh sửa thông tin câu hỏi" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={formInitialValues}
        validationSchema={questionSchema}
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
        }) => {
          // Tìm ra đối tượng kỹ năng và vị trí được chọn từ mảng dựa theo giá trị lưu trong form
          const selectedSkill = skills.find((s) => s.value === values.skillId);
          const selectedPosition = positions.find(
            (p) => p.value === values.positionId
          );

          return (
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
                  Cập nhật
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditQuestion;
