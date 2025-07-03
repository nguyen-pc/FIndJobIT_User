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
import JobFollowPage from "../pages/JobFollowPage";

//admin route
import HomeAdmin from "../pages/admin/Home";

import Dashboard from "../pages/admin/Dashboard";
import Bar from "../pages/admin/Bar";
import Calendar2 from "../pages/admin/Calendar2";
import Contact from "../pages/admin/Contact";
import Faq from "../pages/admin/Faq";
import Form from "../pages/admin/Form";
import FormEmployerAdd from "../pages/admin/FormEmployerAdd";

import Geography from "../pages/admin/Geography";
import Invoices from "../pages/admin/Invoices";
import Line from "../pages/admin/Line";
import Pie from "../pages/admin/Pie";
import Team from "../pages/admin/Team";
import JobListPage from "../pages/JobListPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />

        <Route path="/job_list" element={<JobListPage />} />
        <Route path="/job/:jobId" element={<JobPage />} />
        <Route path="/jobfollow" element={<JobFollowPage />}/>


        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="/company_list" element={<CompanyList />} />
        <Route path="/recommend-job" element={<RecommendJob />} />
        {/* route admin */}
        <Route path="/admin/*" element={<HomeAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="team" element={<Team />} />
          <Route path="contacts" element={<Contact />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="form" element={<Form />} />
          <Route path="formEmployer" element={<FormEmployerAdd />} />

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
