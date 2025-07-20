import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { callFetchJob } from "../../config/api";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { convertSlug, getLocationName } from "../../config/utils";
import { Spin } from "antd";
import { useAppSelector } from "../../redux/hooks";
import axios from "axios";
import nen3 from "../../assets/nen3.jpg";

dayjs.extend(relativeTime);

const CardJob = ({ displayJob, isLoading }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  const navigate = useNavigate();
  const handleViewDetailJob = async (item) => {
    const payload = {
      user_id: user.id,
      job_id: item.id,
      interaction_type: "view",
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/interactions",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error interaction:", error);
    }
    const slug = convertSlug(item.name);
    navigate(`/job/${slug}?id=${item.id}`);
  };

  return (
    <section className="featured-jobs" id="jobs">
      {/* <h2>Việc làm nổi bật</h2> */}

      <div className="jobs-list gap-4 m-0">
        {isLoading ? (
          <Spin spinning={isLoading} tip="Loading..."></Spin>
        ) : displayJob && displayJob.length > 0 ? (
          displayJob.map((job, index) => (
            <div
              key={job.id}
              className="rounded-xl overflow-hidden cursor-pointer shadow-md hover:scale-[1.02] transition w-[250px] h-[350px] bg-transparent"
              onClick={() => handleViewDetailJob(job)}
            >
              {/* Ảnh nền nửa trên */}
              <div
                className="h-1/3 bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${nen3})` }}
              >
                {/* Hình ảnh công ty (logo) đè lên ảnh nền */}
                <div className="absolute top-2 left-2 w-18 h-18 bg-white rounded p-1 shadow">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
                      job?.company?.logo
                    }`}
                    alt={job.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className=" absolute top-20 left-2 text-xm italic text-white truncate">
                  {typeof job.company === "object"
                    ? job.company.name
                    : job.company}
                </p>

                {/* Nhãn ở góc trên trái */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded font-semibold">
                    {getLocationName(job.location)}
                  </span>
                </div>
              </div>

              {/* Nội dung mô tả (nửa dưới) */}
              <div className="h-1/2 p-3 text-black">
                <h3 className="text-base font-bold truncate flex">
                  <div className=" font-medium font-san serif text-xl text-[#1C9EAF]">
                    {job.name}
                  </div>
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Lương:{" "}
                  {(job.salary + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ{" "}
                  <br />
                  <div className="flex mt-2">
                    Yêu cầu:
                    {Array.isArray(job.skills) && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 ml-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </p>
                <p className="text-sm text-gray-400">
                  {job.updatedAt
                    ? dayjs(job.updatedAt).locale("en").fromNow()
                    : dayjs(job.createdAt).locale("en").fromNow()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Không có việc làm nào.</p>
        )}
      </div>
    </section>
  );
};

export default CardJob;
