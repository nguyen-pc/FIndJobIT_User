import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
