// JobPage.jsx
import "tailwindcss";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import salary from "../assets/salary.png";
import location_1 from "../assets/location_1.png";
import skill from "../assets/skill.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faWebAwesome,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import {
  callFetchJobById,
  cancelFollowJob,
  checkFollowStatus,
  followJob,
} from "../config/api";
import { convertSlug } from "../config/utils";
import dayjs from "dayjs";
import parse from "html-react-parser";
import ApplyModal from "../components/ApplyModal";
import ReviewCVModal from "../components/ReviewCVModal";
import { useAppSelector } from "../redux/hooks";
import Heart from "../assets/heart.png";
import HeartFilled from "../assets/heart-filled.png";
import RecommendJob from "./RecommendJob";
const JobPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [isApplied, setIsApplied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewCVModalOpen, setIsReviewCVModalOpen] = useState(false);
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id"); // job id
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  useEffect(() => {
    const init = async () => {
      if (id) {
        setIsLoading(true);
        const res = await callFetchJobById(id);
        if (res?.data) {
          setJobDetail(res.data);
        }
        console.log("Job detail:", res?.data);
        setIsLoading(false);
      }
    };
    init();
  }, [id]);

  useEffect(() => {
    const getFollowState = async () => {
      if (isAuthenticated && jobDetail && user?.id) {
        try {
          const res = await checkFollowStatus(jobDetail.id, user.id);
          setIsFavorite(res.data.followed);
        } catch (error) {
          console.error("Error checking follow status", error);
        }
      }
    };
    getFollowState();
  }, [jobDetail, isAuthenticated, user]);

  const handleViewDetailCompanyJob = (name, id) => {
    if (name) {
      const slug = convertSlug(name);
      navigate(`/company/${slug}?id=${id}`);
    }
  };

  const handleFollowJob = async () => {
    const payload = {
      jobId: jobDetail?.id,
      userId: user?.id,
    };

    try {
      if (!isFavorite) {
        const response = await followJob(payload);
        if (response.data) {
          console.log("Follow job successful:", response.data);
          setIsFavorite(true);
        } else {
          console.error("Follow job failed:", response.message);
        }
      } else {
        const response = await cancelFollowJob(payload);
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error following job:", error);
    }
  };

  return (
    <div className="job-detail-page-wrapper">
      <Header />
      <div className="job-detail-content-container">
        {/* Two-column layout for job-detail-card and company-info-card */}
        <div className="two-column-container">
          <div className="left-panel">
            {/* Khung thông tin công việc chính */}
            <div className="job-detail-card">
              <div className="job-header">
                <h2>
                  {jobDetail
                    ? jobDetail.name
                    : "Vị trí công việc không xác định"}
                </h2>
                <div className="job-meta-grid">
                  <div className="job-meta-item flex">
                    <div className="flex items-center justify-center mr-3 text-2xl text-white bg-[#1c9eaf] w-15 h-15 p-1 rounded-full">
                      <FontAwesomeIcon className="" icon={faMoneyBill} />
                    </div>
                    <div className="block">
                      <strong>Thu nhập:</strong> <br />
                      <span>
                        {jobDetail && (
                          <span>
                            {(jobDetail.salary + "")?.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}{" "}
                            đ
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="job-meta-item flex">
                    <div className="flex items-center justify-center mr-3 text-2xl text-white bg-[#1c9eaf] w-15 h-15 p-1 rounded-full">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className="block">
                      <strong>Địa điểm:</strong> <br />
                      {jobDetail ? jobDetail.location : ""}
                    </div>
                  </div>
                  <div className="job-meta-item flex">
                    <div className="flex items-center justify-center mr-3 text-2xl text-white bg-[#1c9eaf] w-15 h-15 p-1 rounded-full">
                      <FontAwesomeIcon icon={faWebAwesome} />
                    </div>
                    <div className="block">
                      <strong>Kinh nghiệm:</strong>
                      <div>Không có</div>
                    </div>
                  </div>
                </div>

                <div className="job-info-and-actions">
                  <div className="job-skills-and-deadline-info">
                    {jobDetail && jobDetail.skills && (
                      <div className="job-skills-container">
                        {jobDetail.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {jobDetail && (
                      <span className="deadline-item_1">
                        📅{" "}
                        {jobDetail.updatedAt
                          ? dayjs(jobDetail.updatedAt).locale("en").fromNow()
                          : dayjs(jobDetail.createdAt).locale("en").fromNow()}
                      </span>
                    )}
                    <span className="deadline-item">
                      📅 <strong>Hạn nộp hồ sơ:</strong> 28/05/2025
                    </span>
                  </div>

                  <div className="job-actions-vertical">
                    <button
                      className="action-button review-cv"
                      onClick={() => setIsReviewCVModalOpen(true)}
                    >
                      Review CV
                    </button>
                    <div className="apply-favorite-group">
                      <button
                        className="action-button apply-button"
                        // onClick={handleApply}
                        disabled={isApplied}
                        onClick={() => setIsModalOpen(true)}
                      >
                        {isApplied ? "Đã ứng tuyển" : "Ứng tuyển"}
                      </button>
                      <button
                        className={`favorite-button ${isFavorite ? "" : ""}`}
                        onClick={handleFollowJob}
                      >
                        <img
                          className="w-[100%]"
                          src={isFavorite ? HeartFilled : Heart}
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-panel">
            {/* Khung thông tin công ty */}
            <div className="company-info-card">
              <div className="company-header">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
                    jobDetail?.company?.logo
                  }`}
                  alt="logo"
                  className="company-logo"
                />
                <h3>{jobDetail?.company?.name}</h3>
              </div>
              <div className="company-details">
                <p>
                  <strong>Địa điểm:</strong>{" "}
                  {jobDetail?.company?.address || "Unknown"}
                </p>
              </div>
              <button
                className="view-company-button"
                onClick={() =>
                  handleViewDetailCompanyJob(
                    jobDetail?.company?.name,
                    jobDetail?.company?.id
                  )
                }
              >
                Xem công ty
              </button>
            </div>
          </div>
        </div>
        {/* KHUNG LỚN: Chi tiết tuyển dụng */}
        <div className="full-width-panel">
          <div className="job-section-card detail-recruitment-card">
            <h3>Chi tiết tuyển dụng</h3>
            {jobDetail ? parse(jobDetail.description || "") : null}
            <h4>Yêu cầu kỹ năng</h4>
            <div className="job-skills-and-deadline-info">
              {jobDetail && jobDetail.skills && (
                <div className="job-skills-container">
                  {jobDetail.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <RecommendJob /> */}
      </div>
      <ApplyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        jobDetail={jobDetail}
        onApplySuccess={() => setIsApplied(true)}
      />
      <ReviewCVModal
        isReviewCVModalOpen={isReviewCVModalOpen}
        setIsReviewCVModalOpen={setIsReviewCVModalOpen}
        jobDetail={jobDetail}
        onReviewSuccess={() => console.log("CV reviewed successfully")}
      />
      <Footer />
    </div>
  );
};

export default JobPage;
