import CompanyBanner from "../components/CompanyBanner";
import CompanyAboutUs from "../components/CompanyAboutUs";

import CompanyContact from "../components/CompanyContact ";
import JobListCard from "../components/CompanyListCard";
import logo from "../assets/logofpt.png";
// import location from "../assets/location_1.png";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { callFetchCompanyById, callFetchJobByIdCompany } from "../config/api";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
function CompanyDetails() {
  const description = `Công ty Cổ phần Viễn thông FPT (tên gọi tắt là FPT Telecom) hiện là một trong những nhà cung cấp dịch vụ viễn thông và Internet hàng đầu khu vực.`;

  const bulletPoints = [
    "Đã có mặt tại 59 tỉnh thành",
    "289 văn phòng giao dịch",
    "Thường xuyên đổi mới công nghệ",
    "Tạo giá trị bền vững",
  ];

  const handleSeeMore = () => {
    console.log("Xem thêm clicked");
  };

  const [companyDetail, setCompanyDetail] = useState(null);
  const [jobOfCompany, setJobOfCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id"); // job id
  // Lọc công việc dựa trên title hoặc tags

  useEffect(() => {
    const init = async () => {
      if (id) {
        setIsLoading(true);
        const res = await callFetchCompanyById(id);
        const resJob = await callFetchJobByIdCompany(id);
        console.log("res", res);
        console.log("resjob", resJob);
        if (res?.data) {
          setCompanyDetail(res.data);
        }
        if (resJob?.data) {
          setJobOfCompany(resJob.data);
        }
        setIsLoading(false);
      }
    };
    init();
  }, [id]);

  return (
    <div>
      <Header />
      <CompanyBanner company={companyDetail} />
      <div className="company-info-row">
        <CompanyAboutUs
          title="Về chúng tôi"
          description={companyDetail?.description}
          bulletPoints={bulletPoints}
          onSeeMore={handleSeeMore}
        />
        <CompanyContact
          title="Thông tin liên hệ"
          address={companyDetail?.address}
          // mapImage={companyDetail?.address}
        />
      </div>
      {jobOfCompany && jobOfCompany.length > 0 ? (
        <JobListCard title="Tuyển dụng" jobs={jobOfCompany} />
      ) : (
        <div className="">
          <p className="ml-3">Hiện tại công ty chưa có công việc nào được đăng tuyển.</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CompanyDetails;
