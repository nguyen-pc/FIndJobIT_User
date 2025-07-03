import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";
import CompanyDetails from "../pages/CompanyDetails";
import JobPage from "../pages/JobPage";
import JobFollow from "../pages/JobFollow";

import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import EditProfilePage from "../pages/EditProfilePage";
import ProfilePage from "../pages/ProfilePage";
import TestTailwind from "../components/testtailwind";
import RecommendJob from "../pages/RecommendJob";
import CompanyList from "../pages/CompanyList";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/job-list" element={<JobPage />} />
        <Route path="/job/:jobId" element={<JobPage />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
       

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />

        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="/company_list" element={<CompanyList />} />
        <Route path="/recommend-job" element={<RecommendJob />} />

        <Route path="/job-follow" element={<JobFollow />} /> {/* Thêm route cho trang JobFollow */}

        {/* Catch-all route for 404 Not Found */}
      </Routes>
    </BrowserRouter>
  );
}
