import React, { useEffect, useState } from "react";
import { Card } from "antd";
import parse from "html-react-parser";
import Heart from "../assets/heart.png";
import HeartFilled from "../assets/heart-filled.png";
import { useAppSelector } from "../redux/hooks";
import {
  cancelFollowCompany,
  checkCompanyStatus,
  countUserFollowCompany,
  disLikeCompany,
  followCompany,
  likeCompany,
} from "../config/api";

const CompanyAboutUs = ({ title, description, company }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  const [isFollowing, setIsFollowing] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const getFollowState = async () => {
      if (isAuthenticated && company && user?.id) {
        try {
          const res = await checkCompanyStatus(company.id, user.id);
          const count = await countUserFollowCompany(company.id);
          setCounter(count.data.followerCount);
          setIsFollowing(res.data.followed);
        } catch (error) {
          console.error("Error checking follow status", error);
        }
      }
    };
    getFollowState();
  }, [company, user, isAuthenticated]);

  const handleFollowClick = async () => {
    if (!isAuthenticated) {
      alert("Bạn cần đăng nhập để theo dõi công ty."); // Or navigate to login page
      return;
    }

    const payload = {
      companyId: company.id,
      userId: user.id,
    };
    try {
      if (!isFollowing) {
        const response = await followCompany(payload);
        await likeCompany(company.id);
        if (response.data) {
          setIsFollowing(true);
          setCounter((prev) => prev + 1);
        }
      } else {
        await cancelFollowCompany(payload);
        await disLikeCompany(company.id);
        setIsFollowing(false);
        setCounter((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error following company", error);
    }
  };

  return (
    <Card
      // Responsive width: full width on small screens, max-width on larger screens
      className="w-full md:max-w-[700px] "
      title={<span className="text-lg md:text-xl font-semibold">{title}</span>}
      bordered={false}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
            company?.logo
          }`}
          alt={`${company?.name} logo`}
          className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] object-contain rounded-lg shadow-md"
        />
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="mt-3 mb-2 text-[#1c9eaf] font-semibold text-xl md:text-2xl">
            {company?.name}
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
            <span>{counter} người theo dõi</span>
            {isAuthenticated && ( // Only show button if authenticated
              <button
                onClick={handleFollowClick}
                className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              >
                <img
                  src={isFollowing ? HeartFilled : Heart}
                  alt={isFollowing ? "Heart Filled" : "Heart"}
                  className="w-4 h-4"
                />
                <span className="text-xs md:text-sm">
                  {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-gray-800 leading-relaxed text-sm md:text-base">
        {parse(description ?? "")}
      </p>
    </Card>
  );
};

export default CompanyAboutUs;
