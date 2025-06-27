import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import fptLogo from "../assets/fpt.png"; // <-- logo FPT đã lưu trong assets
import { useNavigate } from "react-router-dom";
import { callFetchCompany } from "../config/api";
import CardCompany from "../components/CardCompany";
import CardJob from "../components/CardJob";

const HomePage = () => {



  return (
    <div className="homepage-wrapper">
      <Header />

      <main className="main-content">
        {/* -------- Featured Companies -------- */}
       <CardCompany />

        {/* -------- Featured Jobs -------- */}
      <CardJob />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
