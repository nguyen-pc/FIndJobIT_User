import CompanyBanner from "../components/CompanyBanner";
import CompanyAboutUs from "../components/CompanyAboutUs";
import OtherCompany from "../components/company/OthersCompany";

import CompanyContact from "../components/CompanyContact ";
import JobListCard from "../components/CompanyListCard";
import logo from "../assets/logofpt.png";
// import location from "../assets/location_1.png";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { callFetchCompanyById, callFetchJobByIdCompany } from "../config/api";
import { useEffect, useState } from "react";
import { FaHeart, FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkCompanyStatus,
  countUserFollowCompany,
  followCompany,
  cancelFollowCompany,
  likeCompany,
  disLikeCompany,
} from "../config/api";

import { useAppSelector } from "../redux/hooks";

import Footer from "../components/Footer";
function CompanyDetails() {
  const description = `Công ty Cổ phần Viễn thông FPT (tên gọi tắt là FPT Telecom) hiện là một trong những nhà cung cấp dịch vụ viễn thông và Internet hàng đầu khu vực.`;

  const bulletPoints = [
    "Đã có mặt tại 59 tỉnh thành",
    "289 văn phòng giao dịch",
    "Thường xuyên đổi mới công nghệ",
    "Tạo giá trị bền vững",
  ];
  const [companyDetail, setCompanyDetail] = useState(null);

  const user = useAppSelector((state) => state.account.user);
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    const fetchFollowData = async () => {
      if (companyDetail && user?.id) {
        try {
          const res = await checkCompanyStatus(companyDetail.id, user.id);
          const count = await countUserFollowCompany(companyDetail.id);
          setIsFollowing(res.data.followed);
          setFollowerCount(count.data.followerCount);
        } catch (error) {
          console.error("Error fetching follow data", error);
        }
      }
    };
    fetchFollowData();
  }, [companyDetail, user]);

  const handleFollowClick = async () => {
    if (!isAuthenticated || !user || !companyDetail) return;

    const payload = {
      companyId: companyDetail.id,
      userId: user.id,
    };

    try {
      if (!isFollowing) {
        await followCompany(payload);
        await likeCompany(companyDetail.id);
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      } else {
        await cancelFollowCompany(payload);
        await disLikeCompany(companyDetail.id);
        setIsFollowing(false);
        setFollowerCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error handling follow", error);
    }
  };

  const handleSeeMore = () => {
    console.log("Xem thêm clicked");
  };

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
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép liên kết!", { autoClose: 1000 });
    } catch (err) {
      toast.error("Lỗi khi sao chép liên kết");
    }
  };

  return (
    <div className="overflow-x-hidden">
      <Header />

      <CompanyBanner company={companyDetail} />

      {/* Layout 2 cột */}
      <div className="flex flex-col lg:flex-row gap-8 px-8 mt-8">
        {/* Cột trái: Giới thiệu & Liên hệ */}
        <div className="lg:w-2/4 w-full ">
          <CompanyAboutUs
            company={companyDetail}
            title="Về chúng tôi"
            description={companyDetail?.description}
            bulletPoints={bulletPoints}
            onSeeMore={handleSeeMore}
          />
          <CompanyContact
            title="Thông tin liên hệ"
            address={companyDetail?.address}
          />
        </div>

        {/* Cột phải: Danh sách việc làm */}
        <div className="lg:w-2/4 w-full ">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 mb-4 bg-white rounded-lg p-3 sm:p-4 shadow-sm">
            {/* Follower Count */}
            <div className="text-gray-800 text-sm md:text-base font-medium flex-shrink-0">
              {followerCount} người đang theo dõi
            </div>

            <div className="flex flex-col sm:flex-row  items-center gap-3">
              {/* Follow Button */}
              <button
                onClick={handleFollowClick}
                className={`flex items-center gap-2 rounded px-4 py-2 text-sm sm:text-base font-semibold rounded-full border transition-all duration-300
        ${
          isFollowing
            ? "bg-[#1C9EAF] text-white border-[#1C9EAF] hover:bg-[#167D8D] hover:border-[#167D8D]"
            : "text-[#1C9EAF] border-[#1C9EAF] hover:bg-[#1C9EAF] hover:text-white"
        }
      `}
              >
                <FaHeart className="w-4 h-4" />{" "}
                {/* Reduced icon size for better fit */}
                <span>{isFollowing ? "Đang theo dõi" : "Theo dõi"}</span>
              </button>

              {/* Copy Link Button */}
              <button
                onClick={handleCopy}
                className="flex rounded items-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
              >
                <FaCopy className="w-4 h-4" />{" "}
                {/* Reduced icon size for better fit */}
                <span>Sao chép Link</span>
              </button>
            </div>
          </div>

          {jobOfCompany && jobOfCompany.length > 0 ? (
            <JobListCard title="Tuyển dụng" jobs={jobOfCompany} />
          ) : (
            <div className="no-jobs-message">
              <p>Hiện tại công ty chưa có công việc nào được đăng tuyển.</p>
            </div>
          )}
        </div>
      </div>
      <OtherCompany />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />

      <Footer />
    </div>
  );
}

export default CompanyDetails;
