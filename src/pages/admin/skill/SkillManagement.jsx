// src/pages/admin/SkillManagement.jsx
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
import { fetchSkill } from "../../../redux/slice/skillSlide";
import queryString from "query-string";
import { callDeleteSkill } from "../../../config/api";
import { message } from "antd";

const SkillManagement = () => {
  const isFetching = useAppSelector((state) => state.skill.isFetching);
  const { id } = useParams();
  const meta = useAppSelector((state) => state.skill.meta);
  const skills = useAppSelector((state) => state.skill.result);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    dispatch(fetchSkill({ query: initialQuery }));
  }, []); // chỉ chạy 1 lần khi mount

  useEffect(() => {
    console.log("Meta đã thay đổi:", meta);
  }, [meta]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa kỹ năng này?"
    );
    if (confirmDelete) {
      console.log(`Xóa kỹ năng với ID: ${id}`);
      const res = await callDeleteSkill(id);
      if (res) {
        message.success("Xóa kỹ năng thành công");
        dispatch(
          fetchSkill({
            query: buildQuery({ current: 1, pageSize: 15 }, {}, {}),
          })
        );
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin/editSkill/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên kỹ năng", flex: 1 },
    {
      field: "actions",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon style={{ color: "#ffa500" }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon style={{ color: "#ff4d4f" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="QUẢN LÝ KỸ NĂNG" subtitle="Danh sách kỹ năng hệ thống" />

      <Box mb={2}>
        <Stack direction="row" spacing={2}>
          {/* <TextField
            label="Tên kỹ năng mới"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            variant="outlined"
            size="small"
          /> */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/addSkill")}
          >
            Thêm
          </Button>
        </Stack>
      </Box>

      <Box height="400px">
        <DataGrid
          rows={skills}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
};

export default SkillManagement;
