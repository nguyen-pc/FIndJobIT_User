import React, { useEffect, useState } from "react";
import CompanyCard from "../CompanyCard";
import InfoCard from "../InfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { callFetchCompany } from "../../config/api";

const OtherCompanies = () => {
  const [allCompany, setAllCompany] = useState([]);
  const [hoveredOtherIndex, setHoveredOtherIndex] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4); // Giữ nguyên pageSize cho desktop
  const [total, setTotal] = useState(0);
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");

  const totalCompanyPages = Math.ceil(total / pageSize);

  useEffect(() => {
    fetchAllCompany();
  }, [current, pageSize, sortQuery]);

  const fetchAllCompany = async () => {
    let query = `page=${current}&size=${pageSize}`;
    if (sortQuery) query += `&${sortQuery}`;
    const res = await callFetchCompany(query);
    if (res?.data) {
      setAllCompany(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const handleOnchangePage = ({ current, pageSize }) => {
    setCurrent(current);
    setPageSize(pageSize);
  };

  const renderPageNumbers = (totalPages, currentPage, onChange) => {
    const pageNumbersToShow = [];
    const maxPages = 5; // Số lượng nút phân trang tối đa hiển thị
    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (startPage > 1) {
      pageNumbersToShow.push(1);
      if (startPage > 2) {
        pageNumbersToShow.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbersToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbersToShow.push("...");
      }
      pageNumbersToShow.push(totalPages);
    }

    return pageNumbersToShow.map((num, index) =>
      num === "..." ? (
        <span key={index} className="px-2 py-1 text-sm sm:text-base">
          ...
        </span>
      ) : (
        <span
          key={index}
          className={`cursor-pointer px-2 py-1 rounded text-sm sm:text-base ${
            currentPage === num
              ? "bg-[#1C9EAF] text-white"
              : "hover:bg-gray-200 text-gray-800"
          }`}
          onClick={() => onChange({ current: num, pageSize })}
        >
          {num}
        </span>
      )
    );
  };

  return (
    <div className="OtherCompanies px-4 sm:ml-20">
      {/* Tiêu đề */}
      <div className="mt-10 flex items-center flex-wrap gap-2">
        <p className="text-xl sm:text-2xl font-semibold text-[#1C9EAF]">
          CÁC CÔNG TY KHÁC
        </p>
      </div>

      {/* Danh sách công ty */}
      <div className="w-full mb-20">
        {/* ✅ Mobile: cuộn ngang */}
        <div className="block sm:hidden overflow-x-auto">
          <div className="flex gap-4 w-max pb-2">
            {allCompany.map((c, i) => (
              <div key={i} className="w-[40vw] flex-shrink-0">
                <CompanyCard company={c} />
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Desktop: dạng lưới có hover InfoCard */}
        <div className="hidden sm:flex flex-wrap gap-6 relative ">
          {allCompany.map((c, i) => (
            <div
              key={i}
              className="relative mr-6"
              onMouseEnter={() => setHoveredOtherIndex(i)}
              onMouseLeave={() => setHoveredOtherIndex(null)}
            >
              <CompanyCard company={c} />
              {/* ✅ InfoCard chỉ hiển thị khi hover trên desktop */}
              <div
                className={`absolute top-3 -left-16 mt-2 z-50 transition-all duration-500
                  ${
                    hoveredOtherIndex === i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }
                `}
              >
                <InfoCard company={c} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-10 mb-10">
        {total > 0 && ( // Chỉ hiển thị phân trang khi có dữ liệu
          <div className="pagination flex gap-2 items-center text-blue-600 flex-wrap justify-center">
            {/* Nút trái */}
            <span
              onClick={() =>
                current > 1 &&
                handleOnchangePage({ current: current - 1, pageSize })
              }
              className={`cursor-pointer px-2 ${
                current === 1 ? "text-gray-400" : "hover:text-blue-800"
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>

            {/* Các số trang */}
            {renderPageNumbers(totalCompanyPages, current, handleOnchangePage)}

            {/* Nút phải */}
            <span
              onClick={() =>
                current < totalCompanyPages &&
                handleOnchangePage({ current: current + 1, pageSize })
              }
              className={`cursor-pointer px-2 ${
                current === totalCompanyPages
                  ? "text-gray-400"
                  : "hover:text-blue-800"
              }`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherCompanies;
