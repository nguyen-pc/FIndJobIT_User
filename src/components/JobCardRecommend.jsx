import React from "react";
import { convertSlug, getLocationName } from "../config/utils";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";
import nen3 from "../assets/nen3.jpg";

const JobCardRecommend = ({ jobs }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const handleViewDetailJob = (item) => {
    const slug = convertSlug(item.job.title);
    navigate(`/job/${slug}?id=${item.job.id}`);
  };
  return (
    <section className="featured-jobs" id="jobs">
      {/* <h2>Việc làm có thể phù hợp với bạn</h2> */}

      <div className="jobs-list">
        {isLoading ? (
          <Spin spinning={isLoading} tip="Loading..."></Spin>
        ) : jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
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
                      job?.job?.logoUrl
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
                    {getLocationName(job.job.location)}
                  </span>
                </div>
              </div>

              {/* Nội dung mô tả (nửa dưới) */}
              <div className="h-1/2 p-3 text-black">
                <h3 className="text-base font-bold truncate flex">
                  <div className=" font-medium font-san serif text-xl text-[#1C9EAF]">
                    {job.job.title}
                  </div>
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Lương:{" "}
                  {(job.job.salary + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ{" "}
                  <br />
                  <div className="flex mt-2">
                    Yêu cầu:
                    {Array.isArray(job.job.skills) && job.job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 ml-2">
                        {job.job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </p>
                <p className="text-sm text-gray-400">
                  {job.updatedAt
                    ? dayjs(job.job.updatedAt).locale("en").fromNow()
                    : dayjs(job.job.createAt).locale("en").fromNow()}
                </p>
              </div>
              {/* <Button className="">Ứng tuyển ngay</Button> */}
            </div>
          ))
        ) : (
          <p>Không có việc làm nào.</p>
        )}
      </div>

      {/* Pagination nếu cần */}
    </section>
  );
};

export default JobCardRecommend;

//    {total > pageSize && (
//         <div className="pagination">
//           <span onClick={() => handleOnchangePage({ current: current - 1 })}>
//             ⬅️
//           </span>
//           {/* Hiển thị số trang, có thể sử dụng hàm renderPageNumbers */}
//           <span onClick={() => handleOnchangePage({ current: current + 1 })}>
//             ➡️
//           </span>
//         </div>
//       )}
