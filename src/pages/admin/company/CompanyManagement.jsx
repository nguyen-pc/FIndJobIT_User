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
import { callDeleteCompany } from "../../../config/api";
import { message } from "antd";
const CompanyManagement = () => {
  const isFetching = useAppSelector((state) => state.company.isFetching);
  const meta = useAppSelector((state) => state.company.meta);
  const companies = useAppSelector((state) => state.company.result);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  console.log("Companies data:", companies);

  // Hàm buildQuery động theo params, sort, filter
  const buildQuery = (params, sort, filter) => {
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: "",
    };

    const clone = { ...params };
    if (clone.name) q.filter = `${sfLike("name", clone.name)}`;
    if (clone.address) {
      q.filter = clone.name
        ? q.filter + " and " + `${sfLike("address", clone.address)}`
        : `${sfLike("address", clone.address)}`;
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
    dispatch(fetchCompany({ query: initialQuery }));
  }, []); // chỉ chạy 1 lần khi mount

  useEffect(() => {
    console.log("Meta đã thay đổi:", meta);
  }, [meta]);

  const handleEdit = (id) => {
    navigate(`/admin/editCompany/${id}`);
  };

  const handleDelete = async (jobId) => {
    try {
      const res = await  callDeleteCompany(jobId);
      if (res) {
        message.success("Xóa công ty thành công");
        const q = buildQuery({ current: 1, pageSize: 11 }, {}, {});
        dispatch(fetchCompany({ query: q }));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
    console.log("Delete job:", jobId);
    // Confirm and delete logic here
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tên công ty",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 120,
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
        <Typography variant="h4">Danh sách công ty</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => navigate("/admin/addCompany")}
        >
          Thêm công ty
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
          rows={companies || []}
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

export default CompanyManagement;
