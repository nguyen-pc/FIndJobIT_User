import { Box, Button, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/admin/Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { callDeleteUser } from "../../../config/api";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { message, notification } from "antd";
import { fetchUser } from "../../../redux/slice/userReducer";
import dayjs from "dayjs";
import queryString from "query-string";
import { sfLike } from "spring-filter-query-builder";

const UserManagement = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isFetching = useAppSelector((state) => state.user.isFetching);
  const meta = useAppSelector((state) => state.user.meta);
  const users = useAppSelector((state) => state.user.result);
  console.log("Users data:", meta);

  // Hàm buildQuery động theo params, sort, filter
  const buildQuery = (params, sort, filter) => {
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: "",
    };

    const clone = { ...params };
    if (clone.name) q.filter = `${sfLike("name", clone.name)}`;
    if (clone.email) {
      q.filter = clone.name
        ? q.filter + " and " + `${sfLike("email", clone.email)}`
        : `${sfLike("email", clone.email)}`;
    }

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

  // Gọi fetchUser ban đầu
  useEffect(() => {
    const initialQuery = buildQuery({ current: 1, pageSize: 15 }, {}, {});
    dispatch(fetchUser({ query: initialQuery }));
  }, []); // chỉ chạy 1 lần khi mount

  useEffect(() => {
    console.log("Meta đã thay đổi:", meta);
  }, [meta]);

  const handleEdit = (id) => {
    const userData = users.find((u) => u.id === id);
    if (userData) {
      navigate(`/admin/editUser/${id}`, { state: userData });
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      const res = await callDeleteUser(id);
      if (res) {
        message.success("Xóa User thành công");
        const q = buildQuery({ current: 1, pageSize: 11 }, {}, {});
        dispatch(fetchUser({ query: q }));
      } else {
       console.error("Xóa User thất bại:", res.message);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Họ tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "role",
      headerName: "Vai trò",
      width: 120,
      renderCell: (params) => {
        return <span>{params.row.role ? params.row.role.name : ""}</span>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "company",
      headerName: "Công ty",
      width: 160,
      renderCell: (params) => (
        <span>{params.row.company ? params.row.company.name : ""}</span>
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
      <Header
        title="QUẢN LÝ NGƯỜI DÙNG"
        subtitle="Danh sách người dùng hệ thống"
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin/addUser")}
        >
          + Thêm người dùng
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
          rows={users || []}
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
            dispatch(fetchUser({ query }));
          }}
          onPageSizeChange={(newPageSize) => {
            const params = { current: 1, pageSize: newPageSize };
            const query = buildQuery(params, {}, {});
            dispatch(fetchUser({ query }));
          }}
        />
      </Box>
    </Box>
  );
};

export default UserManagement;
