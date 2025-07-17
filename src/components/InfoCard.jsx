import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

import parse from "html-react-parser";
import {
  cancelFollowCompany,
  checkCompanyStatus,
  countUserFollowCompany,
  disLikeCompany,
  followCompany,
  likeCompany,
} from "../config/api";
import { useAppSelector } from "../redux/hooks";
import { convertSlug } from "../config/utils";
import { useNavigate } from "react-router-dom";
function InfoCard({ company }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const [follower, setFollower] = useState(false); // Có thể dùng state này để tăng số lượng người theo dõi
  const [isFollowing, setIsFollowing] = useState(false); // Trạng thái mới: theo dõi hay chưa
  const [counter, setCounter] = useState(0); // Biến đếm số người theo dõi
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  const handleViewDetailCompanyJob = (name, id) => {
    if (name) {
      const slug = convertSlug(name);
      navigate(`/company/${slug}?id=${id}`);
    }
  };

  useEffect(() => {
    const getFollowState = async () => {
      if (isAuthenticated && company && user?.id) {
        try {
          const res = await checkCompanyStatus(company.id, user.id);
          const count = await countUserFollowCompany(company.id);

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

  // const toggleLike = () => {
  //   setLiked(!liked);
  // };

  return (
    <div className="bg-white/100 p-4 shadow-lg rounded w-[300px] h-[350px] relative cursor-pointer ">
      {/* Logo và nội dung */}
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
          company?.logo
        }`}
        alt="logo"
        className="w-12 mb-2"
      />
      <p className="font-bold">{company.title}</p>
      <p className="text-sm text-gray-600 line-clamp-6">
        {parse(company.description ?? "")}
      </p>
      <p className="text-sm text-gray-600 line-clamp-4 font-semibold flex">
        <FaUserPlus className="mr-3 mt-1" /> {company.likeCount}{" "}
        <span className="ml-1 font-normal">người theo dõi</span>
      </p>
      {/* Button thích */}
      <div className="flex">
        <button
          onClick={() => handleViewDetailCompanyJob(company?.name, company?.id)}
          className="absolute bg-[#1c9eaf] bottom-4 left w-23 h-11 flex flex-col items-center justify-center border rounded text-white text-sm focus:outline-none"
        >
          <span className="text-xs">Xem chi tiết</span>
        </button>
        <button
          onClick={handleFollowClick}
          className="absolute bottom-4 right-4  w-26 h-11 flex  items-center justify-center border rounded text-[#1C9EAF] text-xs focus:outline-none"
          title={isFollowing ? "Bỏ thích" : "Thích"}
        >
          {isFollowing ? (
            <FaHeart className="text-xm" />
          ) : (
            <FaRegHeart className="text-xm" />
          )}
          <span className="text-sm ml-2">Thích</span>
        </button>
      </div>
    </div>
  );
}

export default InfoCard;
