import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import logo from "../../../assets/fpt.png";
import background from "../../../assets/fpt_banner.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const mockCompany = {
  name: "Công ty TNHH Công Nghệ NEXTDEV",
  address: "Tầng 5, Tòa nhà ABC, Quận 1, TP.HCM",
  logo: logo,
  banner: background, // demo banner
  description: `<p><strong>NextDev</strong> là công ty chuyên phát triển giải pháp phần mềm và hỗ trợ sinh viên ngành CNTT tiếp cận thị trường việc làm.</p><ul><li>Giải pháp công nghệ tuyển dụng</li><li>Hệ thống hỗ trợ sinh viên</li><li>Dịch vụ tư vấn nhân sự</li></ul>`,
};

const CompanyManagement = () => {
  const navigate = useNavigate();
  return (
    <Box m={1}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/employer/addCompany")}
      >
        + Thêm công ty
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/employer/editCompany")}
      >
        Chỉnh sửa công ty
      </Button>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Banner */}
        <Box
          sx={{
            width: "100%",
            height: "200px",
            backgroundImage: `url(${mockCompany.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        />

        {/* Logo + Tên công ty */}
        <Box display="flex" alignItems="center">
          <img
            src={mockCompany.logo}
            alt="Company Logo"
            style={{
              width: 80,
              height: 80,
              objectFit: "contain",
              marginRight: 16,
            }}
          />
          <Typography variant="h5" fontWeight="bold">
            {mockCompany.name}
          </Typography>
        </Box>

        {/* Địa chỉ */}
        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Địa chỉ:
          </Typography>
          <Typography>{mockCompany.address}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Mô tả */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Giới thiệu:
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: mockCompany.description }}
            style={{ lineHeight: 1.6 }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CompanyManagement;
