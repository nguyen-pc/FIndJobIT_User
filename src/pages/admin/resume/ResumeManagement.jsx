import React, { useEffect, useState } from "react";
import { Box, IconButton, Button, Stack, Drawer } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../components/admin/Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchResume } from "../../../redux/slice/ResumeSlide";
import queryString from "query-string";
import { callDeleteResume } from "../../../config/api";
import { message } from "antd";
import dayjs from "dayjs";
import DrawerResume from "../../../components/admin/DrawerResume";

const ResumeManagement = () => {
  const isFetching = useAppSelector((state) => state.resume.isFetching);
  const meta = useAppSelector((state) => state.resume.meta);
  const resumes = useAppSelector((state) => state.resume.result);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const [selectedResume, setSelectedResume] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  console.log("Resumes data:", resumes);

  const buildQuery = (params, sort, filter) => {
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: "",
    };
    const clone = { ...params };
    if (clone.name) q.filter = `name like '${clone.name}'`;
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
    dispatch(fetchResume({ query: initialQuery }));
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa resume này?"
    );
    if (confirmDelete) {
      const res = await callDeleteResume(id);
      if (res) {
        message.success("Xóa resume thành công");
        dispatch(
          fetchResume({
            query: buildQuery({ current: 1, pageSize: 15 }, {}, {}),
          })
        );
      }
    }
  };

  // Mở Drawer và truyền dữ liệu resume đã chọn
  const handleOpenDrawer = (rowData) => {
    setSelectedResume(rowData);
    setDrawerOpen(true);
  };

  // Cột hiển thị trong DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
      field: "job",
      headerName: "Công việc",
      width: 160,
      renderCell: (params) => (
        <span>{params.row.job ? params.row.job.name : ""}</span>
      ),
    },
    {
      field: "companyName",
      headerName: "Công ty",
      width: 160,
    },
    {
      field: "url",
      headerName: "Xem CV",
      width: 160,
      renderCell: (params) => (
        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/storage/resume/${
            params.row.url
          }`}
          target="_blank"
        >
          Chi tiết
        </a>
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
          <IconButton onClick={() => handleOpenDrawer(params.row)}>
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
      <Header title="QUẢN LÝ RESUME" subtitle="Danh sách resume" />
      <Box mb={2}></Box>
      <Box height="400px">
        <DataGrid
          rows={resumes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedResume && (
          <DrawerResume
            resumeData={selectedResume}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onStatusChange={(updatedResume) => {
              setSelectedResume(updatedResume);
              // fetch lại danh sách resume sau khi cập nhật trạng thái thành công
              dispatch(
                fetchResume({
                  query: buildQuery({ current: 1, pageSize: 15 }, {}, {}),
                })
              );
            }}
          />
        )}
      </Drawer>
    </Box>
  );
};

export default ResumeManagement;
