import React, { useEffect, useState } from "react";
import ImageCompany from "../assets/fpt_banner.png";
import Background2 from "../assets/background2.png";
import LogoCompany from "../assets/logofpt.png";
import Heart from "../assets/heart.png";
import HeartFilled from "../assets/heart-filled.png"; // Giả sử bạn có icon trái tim đã tô màu

import parse from "html-react-parser";
import { useAppSelector } from "../redux/hooks";
import {
  cancelFollowCompany,
  checkCompanyStatus,
  countUserFollowCompany,
  disLikeCompany,
  followCompany,
  likeCompany,
} from "../config/api";

function CompanyBanner({ company }) {
  console.log("company", company);
  if (!company) {
    return <div>Loading company details...</div>;
  }
  // console.log("company", company.name);

  const [follower, setFollower] = useState(false); // Có thể dùng state này để tăng số lượng người theo dõi
  const [isFollowing, setIsFollowing] = useState(false); // Trạng thái mới: theo dõi hay chưa
  const [counter, setCounter] = useState(0); // Biến đếm số người theo dõi
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  // Hàm xử lý khi click vào button

  useEffect(() => {
    const getFollowState = async () => {
      if (isAuthenticated && company && user?.id) {
        try {
          const res = await checkCompanyStatus(company.id, user.id);
          console.log("Follow status response:", res);
          const count = await countUserFollowCompany(company.id);
          console.log("Follower count response:", count);
          setCounter(count.data.followerCount); // Cập nhật số người theo dõi từ
          // Giả sử API trả về { followed: true/false }
          setIsFollowing(res.data.followed);
        } catch (error) {
          console.error("Error checking follow status", error);
        }
      }
    };
    getFollowState();
  }, [company, user, isAuthenticated, counter]);
  const handleFollowClick = async () => {
    const payload = {
      companyId: company.id,
      userId: user.id,
    };
    try {
      if (!isFollowing) {
        console.log("Follow company payload:", payload, isFollowing);
        const response = await followCompany(payload);
        const like = await likeCompany(company.id);
        if (response.data) {
          console.log("Follow job successful:", response.data);
          setIsFollowing(true);
        } else {
          console.error("Follow job failed:", response.message);
        }
      } else {
        const response = await cancelFollowCompany(payload);
        const dislike = await disLikeCompany(company.id);
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error following company", error);
    }
  };

  return (
    <>
      <div className="company_banner_container">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
            company?.banner
          }`}
          alt=""
          className="imageCompany h-[300px] mb-10 object-cover"
        />
        {/* <img
          src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
            company?.banner
          }`}
          alt=""
          className="imageBackground"
        /> */}
        <div className="absolute top-25 z-50 bg-white rounded p-3 left-20  ">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
              company?.logo
            }`}
            alt=""
            className="w-[150px]"
          />
        </div>
      </div>
      
    </>
  );
}

export default CompanyBanner;
