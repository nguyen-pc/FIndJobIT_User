import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Link,
} from "@mui/material";

const mockCVs = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "0901234567",
    appliedDate: "2025-07-08",
    cvFile: "https://example.com/cv/nguyenvana.pdf",
    status: "Tiếp nhận",
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0932345678",
    appliedDate: "2025-07-09",
    cvFile: "https://example.com/cv/tranthib.pdf",
    status: "Phù hợp",
  },
  {
    id: 3,
    fullName: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0988765432",
    appliedDate: "2025-07-07",
    cvFile: "https://example.com/cv/levanc.pdf",
    status: "Chưa phù hợp",
  },
];

const statusColor = {
  "Tiếp nhận": "default",
  "Chưa phù hợp": "error",
  "Phù hợp": "success",
  "Hẹn phỏng vấn": "info",
  "Nhận việc": "primary",
};

const CVManagement = () => {
  const location = useLocation();
  const { jobId, jobName } = location.state || {}; // fallback nếu không có state

  return (
    <Box m={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Quản lý CV ứng tuyển
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Công việc: <strong>{jobName}</strong> (ID: {jobId})
      </Typography>
      <Paper elevation={3}>
        <TableContainer className="text-red">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>STT</strong>
                </TableCell>
                <TableCell>
                  <strong>Họ tên</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>SĐT</strong>
                </TableCell>
                <TableCell>
                  <strong>Ngày ứng tuyển</strong>
                </TableCell>
                <TableCell>
                  <strong>CV</strong>
                </TableCell>
                <TableCell>
                  <strong>Trạng thái</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockCVs.map((cv, index) => (
                <TableRow key={cv.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cv.fullName}</TableCell>
                  <TableCell>{cv.email}</TableCell>
                  <TableCell>{cv.phone}</TableCell>
                  <TableCell>{cv.appliedDate}</TableCell>
                  <TableCell>
                    <Link
                      href={cv.cvFile}
                      target="_blank"
                      rel="noopener"
                      color="secondary" // ✅ Giúp link sáng màu hơn
                      underline="hover"
                    >
                      Tải CV
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cv.status}
                      color={statusColor[cv.status]}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CVManagement;
