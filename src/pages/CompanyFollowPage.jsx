import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppSelector } from "../redux/hooks";
import { fetchCompanyFollowed } from "../config/api";
import CardCompanyFollow from "../components/CardCompanyFollow";

const CompanyFollowPage = () => {
  const [displayCompany, setDisplayCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  useEffect(() => {
    fetchFollowedCompany();
  }, [user]);

  const fetchFollowedCompany = async () => {
    try {
      const res = await fetchCompanyFollowed(user.id);
      console.log(res);
      if (res && res.data) {
        setDisplayCompany(res.data);
        console.log("Followed Jobs:", res.data.data);
      } else {
        setDisplayCompany([]);
      }
    } catch (error) {
      console.error("Error fetching followed jobs:", error);
    }
  };

  return (
    <div className="job-follow-page">
      <Header /> {/* Bỏ comment dòng này */}
      <main className="job-follow-content">
        <div className="page-header-placeholder">
          <h4 className="text-2xl font-semibold text-center pt-2 mt-10 text-white">
            Danh sách công ty đã lưu
          </h4>
          <nav className="text-center text-white mt-2">
            Xem lại danh sách những công ty mà bạn đã lưu trước đó. Theo dõi để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.     
          </nav>
        </div>
        <div className="">
          <CardCompanyFollow
            displayCompany={displayCompany}
            userId={user.id}
            onUnfollow={(companyId) => {
              setDisplayCompany(displayCompany.filter((company) => company.id !== companyId));
            }}
          />
        </div>
      </main>
      <Footer /> {/* Bỏ comment dòng này */}
    </div>
  );
};

export default CompanyFollowPage;
