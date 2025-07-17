import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import logo from "../../../assets/fpt.png";
import background from "../../../assets/fpt_banner.png";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { callFetchCompanyById, callFetchUserById } from "../../../config/api";
import { Spin } from "antd/lib";

const mockCompany = {
  name: "Công ty TNHH Công Nghệ NEXTDEV",
  address: "Tầng 5, Tòa nhà ABC, Quận 1, TP.HCM",
  logo: logo,
  banner: background, // demo banner
  description: `<p><strong>NextDev</strong> là công ty chuyên phát triển giải pháp phần mềm và hỗ trợ sinh viên ngành CNTT tiếp cận thị trường việc làm.</p><ul><li>Giải pháp công nghệ tuyển dụng</li><li>Hệ thống hỗ trợ sinh viên</li><li>Dịch vụ tư vấn nhân sự</li></ul>`,
};

const CompanyManagement = () => {
  const navigate = useNavigate();
  const [displayUser, setDisplayUser] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  console.log("user", user);

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

  // Sau khi displayUser có dữ liệu, call API để fetch company details
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await callFetchCompanyById(displayUser.company.id);
        setCompanyDetails(res.data);
        console.log("Company details:", res.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };
    if (displayUser) {
      fetchCompanyDetails();
    }
  }, [displayUser]);

  // Nếu companyDetails chưa được load, hiển thị loading hoặc trả về null
  if (!companyDetails) {
    return (
      <Typography>
        {" "}
        <Spin spinning={isLoading} tip="Loading..."></Spin>
      </Typography>
    );
  }

  return (
    <Box m={1}>
      <Button
        variant="contained"
        color="secondary"
        className="mb-3"
        onClick={() => navigate("/employer/editCompany/" + companyDetails.id)}
      >
        Chỉnh sửa công ty
      </Button>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Banner */}
        <Box
          sx={{
            width: "100%",
            height: "200px",
            backgroundImage: `url(${
              import.meta.env.VITE_BACKEND_URL
            }/storage/company/${companyDetails?.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        />

        {/* Logo + Tên công ty */}
        <Box display="flex" alignItems="center">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
              companyDetails?.logo
            }`}
            alt="Company Logo"
            style={{
              width: 80,
              height: 80,
              objectFit: "contain",
              marginRight: 16,
            }}
          />
          <Typography variant="h5" fontWeight="bold">
            {companyDetails.name}
          </Typography>
        </Box>

        {/* Địa chỉ */}
        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Địa chỉ:
          </Typography>
          <Typography>{companyDetails.address}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Mô tả */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Giới thiệu:
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: companyDetails.description }}
            style={{ lineHeight: 1.6 }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CompanyManagement;
