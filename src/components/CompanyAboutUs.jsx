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
    <Card className="w-[700px]" title={<span>{title}</span>} bordered={false}>
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
          company?.logo
        }`}
        alt=""
        className="w-[150px]"
      />
      <div className="mt-3 mb-2 text-[#1c9eaf] font-semibold text-xl">
        {company?.name}
      </div>
      <div className="text-gray-700 mb-2">{counter} người theo dõi</div>

      <p className="mt-4">{parse(description ?? "")}</p>
    </Card>
  );
};

export default CompanyAboutUs;
