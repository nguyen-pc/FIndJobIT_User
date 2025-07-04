import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


const JobFollow = () => {
    return (
        <div className="job-follow-page">
            <Header /> {/* Bỏ comment dòng này */}
            <main className="job-follow-content">
                <div className="page-header-placeholder">
                    {/* Placeholder cho tiêu đề trang */}
                </div>
                <div className="saved-jobs-list-placeholder">
                    {/* Placeholder cho danh sách công việc đã lưu */}
                </div>
            </main>
            <Footer /> {/* Bỏ comment dòng này */}
        </div>
    );
};

export default JobFollow;