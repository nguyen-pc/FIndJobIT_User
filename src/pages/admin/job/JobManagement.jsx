import React from "react";
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
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { mockJobs } from "../../../data/mockData"; // mockJobs phải là export có thật
import { useNavigate } from "react-router-dom";
const JobManagement = () => {
  const handleEdit = (jobId) => {
    console.log("Edit job:", jobId);
    // Navigate or open form here
  };

  const handleDelete = (jobId) => {
    console.log("Delete job:", jobId);
    // Confirm and delete logic here
  };

  const handleAdd = () => {
    console.log("Add new job");
    // Navigate to create job form
  };
  const navigate = useNavigate();
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
          onClick={() => navigate("/admin/addJob")}
        >
          Thêm công việc
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>ID</strong>
            </TableCell>
            <TableCell>
              <strong>Tên công việc</strong>
            </TableCell>
            <TableCell>
              <strong>Kỹ năng</strong>
            </TableCell>
            <TableCell>
              <strong>Công ty</strong>
            </TableCell>
            <TableCell>
              <strong>Kích hoạt</strong>
            </TableCell>
            <TableCell>
              <strong>Hành động</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {mockJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.name}</TableCell>
              <TableCell>
                {job.skills.map((skill, idx) => (
                  <Chip key={idx} label={skill} size="small" sx={{ mr: 0.5 }} />
                ))}
              </TableCell>
              <TableCell>{job.company?.name}</TableCell>
              <TableCell>
                {job.active ? (
                  <div className="font-bold text-[#1c9eaf]">Đang hoạt động</div>
                ) : (
                  <div className="font-light">Không hoạt động</div>
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(job.id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(job.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default JobManagement;
