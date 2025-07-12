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

//admin route
import HomeAdmin from "../pages/admin/Home";

import Dashboard from "../pages/admin/Dashboard";
import Bar from "../pages/admin/Bar";
import Calendar2 from "../pages/admin/Calendar2";
import EmployerManagement from "../pages/admin/EmployerManagement";
import Faq from "../pages/admin/Faq";
import FormUserAdd from "../pages/admin/user/FormUserAdd";
import FormEmployerAdd from "../pages/admin/FormEmployerAdd";

import Geography from "../pages/admin/Geography";
import JobManagement from "../pages/admin/job/JobManagement";
import Line from "../pages/admin/Line";
import Pie from "../pages/admin/Pie";
import UserManagement from "../pages/admin/user/UserManagement";
import EditUser from "../pages/admin/user/EditUser";
import SkillManagement from "../pages/admin/skill/SkillManagement";
import AddJob from "../pages/admin/job/AddJob";

import JobListPage from "../pages/JobListPage";
import HistoryApply from "../pages/HistoryApply.tsx";
import CompanyFollowPage from "../pages/CompanyFollowPage.jsx";
import CompanyManagement from "../pages/admin/company/CompanyManagement.jsx";
import AddCompany from "../pages/admin/company/addCompany.jsx";
import EditCompany from "../pages/admin/company/EditCompany.jsx";
import EditSkill from "../pages/admin/skill/EditSkill.jsx";
import AddSkill from "../pages/admin/skill/AddSkill.jsx";
import EditJob from "../pages/admin/job/EditJob.jsx";
import PermissionManagement from "../pages/admin/permission/PermissionManagement.jsx";
import EditPermission from "../pages/admin/permission/EditPermission.jsx";
import AddPermission from "../pages/admin/permission/AddPermission.jsx";
import RoleManagement from "../pages/admin/role/RoleManagement.jsx";
import EditRole from "../pages/admin/role/EditRole.jsx";
import AddRole from "../pages/admin/role/AddRole.jsx";

//Employer route
import HomeEmployer from "../pages/employer/Home.jsx";
import EmployerAddCompany from "../pages/employer/company/AddCompany.jsx";
import EmployerEditCompany from "../pages/employer/company/EditCompany.jsx";
import EmployerCompanyManagement from "../pages/employer/company/CompanyManagement.jsx";

import EmployerJobManagement from "../pages/employer/job/JobManagement.jsx";
import EmployerAddJob from "../pages/employer/job/AddJob.jsx";
import EmployerEditJob from "../pages/employer/job/EditJob.jsx";
import EmployerCVManagement from "../pages/employer/cv/CVManagement.jsx";
import ResumeManagement from "../pages/admin/resume/ResumeManagement.jsx";
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
        <Route path="/job-follow" element={<JobFollow />} />{" "}
        <Route path="/applied-jobs" element={<HistoryApply />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="/company_follow" element={<CompanyFollowPage />} />
        <Route path="/company_list" element={<CompanyList />} />
        <Route path="/recommend-job" element={<RecommendJob />} />
        {/* route admin */}
        <Route path="/admin/*" element={<HomeAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="userManagement" element={<UserManagement />} />
          <Route path="addUser" element={<FormUserAdd />} />
          <Route path="editUser/:id" element={<EditUser />} />

          <Route path="employerManagement" element={<EmployerManagement />} />

          <Route path="jobManagement" element={<JobManagement />} />
          <Route path="addJob" element={<AddJob />} />
          <Route path="editJob/:id" element={<EditJob />} />

          <Route path="companyManagement" element={<CompanyManagement />} />
          <Route path="addCompany" element={<AddCompany />} />
          <Route path="editCompany/:id" element={<EditCompany />} />

          <Route path="skillManagement" element={<SkillManagement />} />
          <Route path="editSkill/:id" element={<EditSkill />} />
          <Route path="addSkill" element={<AddSkill />} />

          <Route
            path="permissionManagement"
            element={<PermissionManagement />}
          />
          <Route path="editPermission/:id" element={<EditPermission />} />
          <Route path="addPermission" element={<AddPermission />} />

          <Route path="roleManagement" element={<RoleManagement />} />
          <Route path="editRole/:id" element={<EditRole />} />
          <Route path="addRole" element={<AddRole />} />

           <Route path="resumeManagement" element={<ResumeManagement />} />

          <Route path="formEmployer" element={<FormEmployerAdd />} />

          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="faq" element={<Faq />} />
          <Route path="calendar" element={<Calendar2 />} />
          <Route path="geography" element={<Geography />} />
        </Route>
        {/* route employer */}
        <Route path="/employer/*" element={<HomeEmployer />}>
          <Route
            path="companyManagement"
            element={<EmployerCompanyManagement />}
          />

          <Route path="addCompany" element={<EmployerAddCompany />} />
          <Route path="editCompany/:id" element={<EmployerEditCompany />} />

          <Route path="jobManagement" element={<EmployerJobManagement />} />
          <Route path="addJob" element={<EmployerAddJob />} />
          <Route path="editJob/:id" element={<EmployerEditJob />} />

          <Route path="cvManagement" element={<EmployerCVManagement />} />
        </Route>
        {/* Catch-all route for 404 Not Found */}
      </Routes>
    </BrowserRouter>
  );
}
