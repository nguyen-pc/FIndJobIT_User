import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";
import CompanyDetails from "../pages/CompanyDetails";
import JobPage from "../pages/JobPage";

import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import EditProfilePage from "../pages/EditProfilePage";
import ProfilePage from "../pages/ProfilePage";
import TestTailwind from "../components/testtailwind";
import RecommendJob from "../pages/RecommendJob";
import CompanyList from "../pages/CompanyList";

//admin route
import HomeAdmin from "../pages/admin/Home";

import Dashboard from "../pages/admin/Dashboard";
import Bar from "../pages/admin/Bar";
import Calendar2 from "../pages/admin/Calendar2";
import EmployerManagement from "../pages/admin/EmployerManagement";
import Faq from "../pages/admin/Faq";
import FormUserAdd from "../pages/admin/FormUserAdd";
import FormEmployerAdd from "../pages/admin/FormEmployerAdd";

import Geography from "../pages/admin/Geography";
import JobManagement from "../pages/admin/JobManagement";
import Line from "../pages/admin/Line";
import Pie from "../pages/admin/Pie";
import UserManagement from "../pages/admin/UserManagement";
import EditUser from "../pages/admin/EditUser";
import SkillManagement from "../pages/admin/SkillManagement";
import AddJob from "../pages/admin/AddJob";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/job_list" element={<JobPage />} />
        <Route path="/job/:jobId" element={<JobPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="/company_list" element={<CompanyList />} />
        <Route path="/recommend-job" element={<RecommendJob />} />
        {/* route admin */}
        <Route path="/admin/*" element={<HomeAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="employerManagement" element={<EmployerManagement />} />
          <Route path="jobManagement" element={<JobManagement />} />
          <Route path="skillManagement" element={<SkillManagement />} />

          <Route path="addUser" element={<FormUserAdd />} />
          <Route path="editUser/:id" element={<EditUser />} />

          <Route path="formEmployer" element={<FormEmployerAdd />} />
          <Route path="addJob" element={<AddJob />} />

          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="faq" element={<Faq />} />
          <Route path="calendar" element={<Calendar2 />} />
          <Route path="geography" element={<Geography />} />
        </Route>
        {/* Catch-all route for 404 Not Found */}
      </Routes>
    </BrowserRouter>
  );
}
