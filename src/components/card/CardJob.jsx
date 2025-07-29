import React from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useAppSelector } from "../../redux/hooks";
import axios from "axios";
import nen3 from "../../assets/nen3.jpg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { convertSlug, getLocationName } from "../../config/utils";

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
      await axios.post("http://localhost:8000/interactions", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error interaction:", error);
    }
    const slug = convertSlug(item.name);
    navigate(`/job/${slug}?id=${item.id}`);
  };

  // 👉 Tách displayJob thành các nhóm 2 job
  const groupedJobs = displayJob?.reduce((result, item, index) => {
    if (index % 2 === 0) result.push([item]);
    else result[result.length - 1].push(item);
    return result;
  }, []);

  return (
    <section className="featured-jobs px-4 py-6" id="jobs">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin spinning={isLoading} tip="Loading..." />
        </div>
      ) : displayJob && displayJob.length > 0 ? (
        <>
          {/* ✅ Mobile: scroll ngang từng nhóm 2 card */}
          <div className="block sm:hidden overflow-x-auto snap-x snap-mandatory center">
            <div className="flex gap-1 px-2 w-max">
              {groupedJobs.map((group, i) => (
                <div key={i} className="snap-start flex gap-4 min-w-[85vw]">
                  {group.map((job) => (
                    <div
                      key={job.id}
                      className="w-[41vw] bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleViewDetailJob(job)}
                    >
                      <div
                        className="h-36 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${nen3})` }}
                      >
                        <div className="absolute top-2 left-2 w-12 h-12 bg-white rounded p-1 shadow">
                          <img
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/storage/company/${job?.company?.logo}`}
                            alt={job.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <p className=" absolute top-20 left-2 text-xm italic text-white truncate">
                          {typeof job.company === "object"
                            ? job.company.name
                            : job.company.name}
                        </p>
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded font-semibold">
                            {getLocationName(job.location)}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 text-xs">
                        <div className="text-[#1C9EAF] font-semibold truncate">
                          {job.name}
                        </div>
                        <div className="text-gray-500 text-[10px] mt-1">
                          Lương:{" "}
                          {(job.salary + "").replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}{" "}
                          đ
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                          {Array.isArray(job.skills) &&
                            job.skills.length > 0 &&
                            job.skills.map((skill) => (
                              <span
                                key={skill.id}
                                className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded"
                              >
                                {skill.name}
                              </span>
                            ))}
                        </div>
                        <div className="text-gray-400 text-[10px] mt-2">
                          {dayjs(job.updatedAt || job.createdAt).fromNow()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Tablet/Desktop: hiển thị dạng lưới nhiều cột */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayJob.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleViewDetailJob(job)}
              >
                <div
                  className="h-40 sm:h-44 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${nen3})` }}
                >
                  <div className="absolute top-2 left-2 w-14 h-14 bg-white rounded p-1 shadow">
                    <img
                      src={`${
                        import.meta.env.VITE_BACKEND_URL
                      }/storage/company/${job?.company?.logo}`}
                      alt={job.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <p className=" absolute top-20 left-2 text-xm italic text-white truncate">
                    {typeof job.company === "object"
                      ? job.company.name
                      : job.company}
                  </p>
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded font-semibold">
                      {getLocationName(job.location)}
                    </span>
                  </div>
                </div>
                <div className="p-3 text-sm">
                  <div className="text-[#1C9EAF] font-semibold truncate">
                    {job.name}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    Lương:{" "}
                    {(job.salary + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1 text-xs">
                    {Array.isArray(job.skills) &&
                      job.skills.length > 0 &&
                      job.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                  <div className="text-gray-400 text-xs mt-2">
                    {dayjs(job.updatedAt || job.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Không có việc làm nào.</p>
      )}
    </section>
  );
};

export default CardJob;
