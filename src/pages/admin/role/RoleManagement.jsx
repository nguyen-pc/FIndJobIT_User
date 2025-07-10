import React, { useEffect } from "react";
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
import { tokens } from "../../../theme";
import { mockJobs } from "../../../data/mockData"; // mockJobs phải là export có thật
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { companySlide, fetchCompany } from "../../../redux/slice/companySlide";
import { sfLike } from "spring-filter-query-builder";
import queryString from "query-string";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  callDeleteCompany,
  callDeleteJob,
  callDeletePermission,
  callDeleteRole,
} from "../../../config/api";
import { message } from "antd";
import { fetchPermission } from "../../../redux/slice/permissionSlide";
import { fetchRole } from "../../../redux/slice/roleSlide";
const RoleManagement = () => {
  const isFetching = useAppSelector((state) => state.role.isFetching);
  const meta = useAppSelector((state) => state.role.meta);
  const roles = useAppSelector((state) => state.role.result);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  console.log("role data:", roles);

  // Hàm buildQuery động theo params, sort, filter
  const buildQuery = (params, sort, filter) => {
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: "",
    };

    const clone = { ...params };
    if (clone.name) q.filter = `${sfLike("name", clone.name)}`;
    if (clone.method) {
      q.filter = clone.name
        ? q.filter + " and " + `${sfLike("method", clone.method)}`
        : `${sfLike("method", clone.method)}`;
    }

    if (!q.filter) delete q.filter;
    let temp = queryString.stringify(q);

    let sortBy = "";
    if (sort && sort.name) {
      sortBy = sort.name === "ascend" ? "sort=name,asc" : "sort=name,desc";
    }
    if (sort && sort.address) {
      sortBy =
        sort.address === "ascend" ? "sort=address,asc" : "sort=address,desc";
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
    const initialQuery = buildQuery({ current: 1, pageSize: 47 }, {}, {});
    dispatch(fetchRole({ query: initialQuery }));
  }, []); // chỉ chạy 1 lần khi mount

  useEffect(() => {
    console.log("Meta đã thay đổi:", meta);
  }, [meta]);

  const handleEdit = (id) => {
    navigate(`/admin/editRole/${id}`);
  };

  const handleDelete = async (roleId) => {
    try {
      const res = await callDeleteRole(roleId);
      if (res) {
        message.success("Xóa role thành công");
        const q = buildQuery({ current: 1, pageSize: 47 }, {}, {});
        dispatch(fetchRole({ query: q }));
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
    console.log("Delete role:", roleId);
    // Confirm and delete logic here
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tên vai trò",
      flex: 1,
      cellClassName: "name-column--cell",
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
        </Box>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Danh sách Permission</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => navigate("/admin/addRole")}
        >
          Thêm Permission
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
          rows={roles || []}
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
            dispatch(fetchCompany({ query }));
          }}
          onPageSizeChange={(newPageSize) => {
            const params = { current: 1, pageSize: newPageSize };
            const query = buildQuery(params, {}, {});
            dispatch(fetchCompany({ query }));
          }}
        />
      </Box>
    </Box>
  );
};

export default RoleManagement;
