// src/pages/admin/QuestionManagement.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { mockSkills } from "../../../data/mockData";
import Header from "../../../components/admin/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import queryString from "query-string";
import { callDeleteQuestion, callDeleteSkill } from "../../../config/api";
import { message } from "antd";
import { fetchInterview } from "../../../redux/slice/questionSlide";
import dayjs from "dayjs";

const QuestionManagement = () => {
  const isFetching = useAppSelector((state) => state.interview.isFetching);
  const { id } = useParams();
  const meta = useAppSelector((state) => state.interview.meta);
  const interviews = useAppSelector((state) => state.interview.result);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(interviews);

  const buildQuery = (params, sort, filter) => {
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: "",
    };

    const clone = { ...params };
    if (clone.name) q.filter = `${sfLike("name", clone.name)}`;

    if (!q.filter) delete q.filter;
    let temp = queryString.stringify(q);

    let sortBy = "";
    if (sort && sort.name) {
      sortBy = sort.name === "ascend" ? "sort=name,asc" : "sort=name,desc";
    }
    if (sort && sort.email) {
      sortBy = sort.email === "ascend" ? "sort=email,asc" : "sort=email,desc";
    }
    if (sort && sort.createdAt) {
      sortBy =
        sort.createdAt === "ascend"
          ? "sort=createdAt,asc"
          : "sort=createdAt,desc";
    }
    if (sort && sort.updatedAt) {
      sortBy =
        sort.updatedAt === "ascend"
          ? "sort=updatedAt,asc"
          : "sort=updatedAt,desc";
    }

    if (!sortBy) {
      temp = `${temp}&sort=updatedAt,desc`;
    } else {
      temp = `${temp}&${sortBy}`;
    }

    return temp;
  };

  useEffect(() => {
    const initialQuery = buildQuery({ current: 1, pageSize: 15 }, {}, {});
    dispatch(fetchInterview({ query: initialQuery }));
  }, []); // chỉ chạy 1 lần khi mount

  useEffect(() => {
    console.log("Meta đã thay đổi:", meta);
  }, [meta]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa câu hỏi này?"
    );
    if (confirmDelete) {
      console.log(`Xóa câu hỏi với ID: ${id}`);
      const res = await callDeleteQuestion(id);
      if (res) {
        message.success("Xóa câu hỏi thành công");
        dispatch(
          fetchInterview({
            query: buildQuery({ current: 1, pageSize: 15 }, {}, {}),
          })
        );
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin/question/${id}`);
  };

  const columns = [
    { field: "idQuestion", headerName: "ID", width: 90 },
    { field: "questionName", headerName: "Tên câu hỏi", flex: 1 },
    { field: "answer", headerName: "Câu trả lời", flex: 1 },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 160,
      renderCell: (params) => (
        <>
          {params.row.createdAt
            ? dayjs(params.row.createdAt).format("DD-MM-YYYY HH:mm:ss")
            : ""}
        </>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Ngày câp nhật",
      width: 160,
      renderCell: (params) => (
        <>
          {params.row.updatedAt
            ? dayjs(params.row.updatedAt).format("DD-MM-YYYY HH:mm:ss")
            : ""}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row.idQuestion)}>
            <EditIcon style={{ color: "#ffa500" }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.idQuestion)}>
            <DeleteIcon style={{ color: "#ff4d4f" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="QUẢN LÝ CÂU HỎI" subtitle="Danh sách câu hỏi hệ thống" />

      <Box mb={2}>
        <Stack direction="row" spacing={2}>
          {/* <TextField
            label="Tên câu hỏi mới"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            variant="outlined"
            size="small"
          /> */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/addQuestion")}
          >
            Thêm
          </Button>
        </Stack>
      </Box>

      <Box height="400px">
        <DataGrid
          rows={interviews}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.idQuestion}
        />
      </Box>
    </Box>
  );
};

export default QuestionManagement;
