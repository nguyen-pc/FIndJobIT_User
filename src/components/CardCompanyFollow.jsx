import React from "react";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getLocationName, convertSlug } from "../config/utils";
import { useNavigate } from "react-router-dom";
import { cancelFollowCompany } from "../config/api";
import { FaTrash } from "react-icons/fa";
import parse from "html-react-parser";

const CardCompanyFollow = ({
  displayCompany,
  userId,
  isLoading,
  onUnfollow,
}) => {
  const navigate = useNavigate();

  const handleViewDetailCompany = (item) => {
    const slug = convertSlug(item.name);
    navigate(`/company/${slug}?id=${item.id}`);
  };

  const handleCancelFollowJob = async (companyId, userId) => {
    const payload = {
      companyId: companyId,
      userId: userId,
    };
    console.log("payload", payload);
    try {
      const response = await cancelFollowCompany(payload);
      // Sau khi hủy theo dõi thành công, gọi callback để xóa job đó khỏi danh sách
      if (response) {
        onUnfollow(companyId);
      }
    } catch (error) {
      console.error("Error cancelling follow job:", error);
    }
  };

  return (
    <section className="flex flex-col" id="jobs">
      <div className="">
        {isLoading ? (
          <p>Loading...</p>
        ) : displayCompany && displayCompany.length > 0 ? (
          displayCompany.map((company) => (
            <div
              className="w-full  items-center border p-4 my-2 cursor-pointer"
              key={company.id}
            >
              <div
                onClick={() => handleViewDetailCompany(company)}
                className="job-card-header flex items-center gap-4"
              >
                <img
                  className=" w-20 h-20 object-contain"
                  src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
                    company?.logo
                  }`}
                  alt={company?.name}
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold">{company.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <ThunderboltOutlined style={{ color: "orange" }} />
                    <span className="ml-1">
                      {parse(
                        company.description && company.description.length > 100
                          ? company.description.substring(0, 100) + "..."
                          : company.description ?? ""
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvironmentOutlined style={{ color: "#58aaab" }} />
                    <span className="ml-1">{company.address}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleViewDetailCompany(company)}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Xem chi tiết
                </button>
                <div
                  onClick={() => handleCancelFollowJob(company.id, userId)}
                  className="flex items-center gap-2  cursor-pointer text-[#424e5c] bg-[#e9eaec] rounded p-2"
                >
                  <FaTrash />
                  Bỏ lưu
                </div>
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

export default CardCompanyFollow;
