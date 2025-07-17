import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { tokens } from "../../../theme";
import {
  Box,
  Typography,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { mockJobs } from "../../../data/mockData"; // mockJobs phải là export có thật
import { useNavigate } from "react-router-dom";
import { fetchJob, fetchJobByCompany } from "../../../redux/slice/jobSlide";
import dayjs from "dayjs";
import queryString from "query-string";
import { sfLike } from "spring-filter-query-builder";
import { callDeleteJob, callFetchUserById } from "../../../config/api";
import { DataGrid } from "@mui/x-data-grid";
import { message } from "antd";
import { EyeFilled } from "@ant-design/icons";
const JobManagement = () => {
  const isFetching = useAppSelector((state) => state.job.isFetching);
  const meta = useAppSelector((state) => state.job.meta);
  const jobs = useAppSelector((state) => state.job.result);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [displayUser, setDisplayUser] = useState(null);
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  // Fetch user thông qua API
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const res = await callFetchUserById(user.id);
        setDisplayUser(res.data);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserID();
  }, [user.id]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tên công việc",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "company",
      headerName: "Tên công ty",
      width: 120,
      renderCell: (params) => {
        return <span>{params.row.company ? params.row.company.name : ""}</span>;
      },
    },
    {
      field: "salary",
      headerName: "Mưc lương",
      width: 120,
      renderCell: (params) => {
        return (
          <span>
            {params.row.salary ? params.row.salary.toLocaleString() : "0"} VND
          </span>
        );
      },
    },
    {
      field: "level",
      headerName: "Level",
      width: 120,
    },
    {
      field: "active",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) =>
        params.row.active ? (
          <Chip label="Active" color="success" variant="outlined" />
        ) : (
          <Chip label="No Active" color="error" variant="outlined" />
        ),
    },
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
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon style={{ color: "#ffa500" }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon style={{ color: "#ff4d4f" }} />
          </IconButton>
          <IconButton onClick={() => handleViewCV(params.row.id)}>
            <VisibilityIcon style={{ color: "#00c056" }} />
          </IconButton>
        </Box>
      ),
    },
  ];
  console.log(jobs);

  // Hàm buildQuery động theo params, sort, filter
  const buildQuery = (params, sort, filter) => {
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: "",
    };

    const clone = { ...params };
    if (clone.name) q.filter = `${sfLike("name", clone.name)}`;
    if (clone.salary) parts.push(`salary ~ '${clone.salary}'`);
    if (clone?.level?.length) {
      parts.push(`${sfIn("level", clone.level).toString()}`);
    }

    if (!q.filter) delete q.filter;
    let temp = queryString.stringify(q);

    let sortBy = "";
    if (sort && sort.name) {
      sortBy = sort.name === "ascend" ? "sort=name,asc" : "sort=name,desc";
    }
    if (sort && sort.salary) {
      sortBy =
        sort.salary === "ascend" ? "sort=salary,asc" : "sort=salary,desc";
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

  // Gọi fetchUser ban đầu
  useEffect(() => {
    if (displayUser?.company?.id) {
      const initialQuery = buildQuery({ current: 1, pageSize: 15 }, {}, {});
      const id = displayUser.company.id;
      console.log("Initial query:", initialQuery, id);
      dispatch(fetchJobByCompany({ id: id, query: initialQuery }));
    }
  }, [displayUser]); // chỉ chạy 1 lần khi mount

  useEffect(() => {
    console.log("Meta đã thay đổi:", meta);
  }, [meta]);

  const handleEdit = (id) => {
    navigate(`/employer/editJob/${id}`);
  };

  const handleViewCV = (id) => {
    navigate(`/employer/cvManagement/${id}`);
  };
  const handleDelete = async (jobId) => {
    try {
      const res = await callDeleteJob(jobId);
      if (res) {
        message.success("Xóa công việc thành công");
        const q = buildQuery({ current: 1, pageSize: 11 }, {}, {});
        const id = displayUser?.company?.id;
        dispatch(fetchJobByCompany({ id: id, query: q }));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
    console.log("Delete job:", jobId);
    // Confirm and delete logic here
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Danh sách công việc</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => navigate("/employer/addJob")}
        >
          Thêm công việc
        </Button>
      </Box>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={jobs || []}
          columns={columns}
          loading={isFetching}
          pageSize={meta.pageSize || 10}
          rowsPerPageOptions={[10, 20, 50]}
          paginationMode="server"
          rowCount={meta.total}
          page={meta.page - 1}
          onPageChange={(newPage) => {
            const params = {
              current: newPage + 1,
              pageSize: meta.pageSize || 15,
            };
            const query = buildQuery(params, {}, {});
            const id = displayUser?.company?.id;
            dispatch(fetchJobByCompany({ id, query }));
          }}
          onPageSizeChange={(newPageSize) => {
            const params = { current: 1, pageSize: newPageSize };
            const query = buildQuery(params, {}, {});
            const id = displayUser?.company?.id;
            dispatch(fetchJobByCompany({ id, query }));
          }}
        />
      </Box>
    </Box>
  );
};

export default JobManagement;
