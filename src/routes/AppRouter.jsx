import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";
import JobPage from "../pages/JobPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/job-list" element={<JobPage />} />
        <Route path="/job/:jobId" element={<JobPage />} />
      </Routes>
    </BrowserRouter>
  );
}