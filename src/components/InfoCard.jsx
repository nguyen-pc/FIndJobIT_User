import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaUserPlus, FaCopy } from "react-icons/fa";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isFollowing, setIsFollowing] = useState(false);
  const [counter, setCounter] = useState(0);

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
    const payload = {
      companyId: company.id,
      userId: user.id,
    };
    try {
      if (!isFollowing) {
        await followCompany(payload);
        await likeCompany(company.id);
        setIsFollowing(true);
        setCounter((prev) => prev + 1);
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

  const handleCopy = async () => {
    try {
      const link = `${window.location.origin}/company/${convertSlug(
        company?.name
      )}?id=${company?.id}`;
      await navigator.clipboard.writeText(link);
      toast.success("Đã sao chép liên kết!", { autoClose: 1000 });
    } catch (err) {
      toast.error("Lỗi khi sao chép liên kết");
    }
  };

  return (
    <>
      <div className="bg-white/100 p-4 shadow-lg rounded w-[300px] h-[350px] relative cursor-pointer">
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
          <FaUserPlus className="mr-3 mt-1" />
          {counter} <span className="ml-1 font-normal">người theo dõi</span>
        </p>

        <div className="flex">
          <div className="flex gap-2 absolute text-xs">
            <button
              onClick={handleFollowClick}
              className="px-3 py-2 flex items-center   text-[#1C9EAF] text-[10px]"
              title={isFollowing ? "Bỏ thích" : "Thích"}
            >
              {isFollowing ? <FaHeart /> : <FaRegHeart />}
              <span className="ml-2">Thích</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 flex items-center   text-[#1C9EAF] text-xs"
              title="Sao chép liên kết"
            >
              <FaCopy />
              <span className="ml-2">Sao chép Link</span>
            </button>
          </div>
        </div>
        <button
          onClick={() => handleViewDetailCompanyJob(company?.name, company?.id)}
          className="absolute bg-[#1c9eaf] bottom-4 left-4 px-3 py-2 rounded text-white text-sm"
        >
          Xem chi tiết
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />
    </>
  );
}

export default InfoCard;
