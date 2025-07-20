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
  const [AllCompany, setAllCompany] = useState([]);
  const [hoveredOtherIndex, setHoveredOtherIndex] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");

  const totalCompanyPages = Math.ceil(total / pageSize);

  useEffect(() => {
    fetchAllCompany();
  }, [current, pageSize, sortQuery]);

  const fetchAllCompany = async () => {
    let query = `page=${current}&size=${pageSize}`;
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchCompany(query);
    if (res && res.data) {
      setAllCompany(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const handleOnchangePage = ({ current, pageSize }) => {
    setCurrent(current);
    setPageSize(pageSize);
  };

  const renderPageNumbers = (totalPages, currentPage, onChange) => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <span
        key={num}
        className={`cursor-pointer px-2 py-1 rounded ${
          currentPage === num ? "bg-[#1C9EAF] text-white" : "hover:bg-gray-200"
        }`}
        onClick={() => onChange({ current: num, pageSize })}
      >
        {num}
      </span>
    ));
  };

  return (
    <div
      className="OtherCompanies"
      style={{ padding: "0 50px", marginTop: "50px" }}
    >
      <div className="mb-6">
        <p
          className="text-2xl font-semibold ml-[20px]"
          style={{ color: "#1C9EAF" }}
        >
          CÁC CÔNG TY KHÁC
        </p>
      </div>
      <div className="ml-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {AllCompany.map((c, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setHoveredOtherIndex(i)}
              onMouseLeave={() => setHoveredOtherIndex(null)}
            >
              <CompanyCard company={c} />
              <div
                className={`absolute top-3 -left-16 z-50 transition-all duration-900 ${
                  hoveredOtherIndex === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <InfoCard company={c} />
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-container flex justify-center mt-8 mb-8">
          {total > pageSize && (
            <div className="pagination flex gap-2 items-center text-blue-600">
              {/* Nút trang trước */}
              {current > 1 ? (
                <span
                  onClick={() =>
                    handleOnchangePage({ current: current - 1, pageSize })
                  }
                  className="cursor-pointer hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
              ) : (
                <span className="text-gray-400">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
              )}

              {/* Hiển thị số trang */}
              {renderPageNumbers(
                totalCompanyPages,
                current,
                handleOnchangePage
              )}

              {/* Nút trang sau */}
              {current < totalCompanyPages ? (
                <span
                  onClick={() =>
                    handleOnchangePage({ current: current + 1, pageSize })
                  }
                  className="cursor-pointer hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              ) : (
                <span className="text-gray-400">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherCompanies;
