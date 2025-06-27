import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callFetchCompany } from "../config/api";
import fptLogo from "../assets/fpt.png";
import { convertSlug } from "../config/utils";
// import { convertSlug } from "../utils";

const CardCompany = (props) => {
  const navigate = useNavigate();

  // State cho dữ liệu lấy từ backend
  const [displayCompany, setDisplayCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");

  useEffect(() => {
    fetchCompany();
  }, [current, pageSize, filter, sortQuery]);

  const fetchCompany = async () => {
    setIsLoading(true);
    let query = `page=${current}&size=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchCompany(query);
    console.log("res", res);
    if (res && res.data) {
      setDisplayCompany(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleOnchangePage = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const handleViewDetailCompany = (item) => {
    if (item.name) {
      const slug = convertSlug(item.name);
      navigate(`/company/${slug}?id=${item.id}`);
    }
  };

  // Tính tổng số trang từ dữ liệu backend
  const totalCompanyPages = Math.ceil(total / pageSize);

  // Render phân trang (ví dụ với số trang)
  const renderPageNumbers = (totalPages, currentPage, onChange) => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <span
        key={num}
        className={currentPage === num ? "active" : ""}
        onClick={() => onChange({ current: num, pageSize })}
      >
        {num}
      </span>
    ));
  };

  return (
    <section className="job-categories" id="companies">
      <h2>Công ty nổi bật</h2>
      <div className="categories-grid">
        {isLoading ? (
          <p>Loading...</p>
        ) : displayCompany && displayCompany.length > 0 ? (
          displayCompany.map((company) => (
            <div
              className="category-item"
              key={company.id}
              onClick={() => handleViewDetailCompany(company)}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
                  company?.logo
                }`}
                alt={company.name}
              />
              <h3>{company.name}</h3>
              {/* <p>{company.description}</p> */}
            </div>
          ))
        ) : (
          <p>Không có công ty nào.</p>
        )}
      </div>
      {totalCompanyPages > 1 && (
        <div className="pagination">
          <span
            onClick={() =>
              handleOnchangePage({ current: current - 1, pageSize })
            }
          >
            ⬅️
          </span>
          {renderPageNumbers(totalCompanyPages, current, handleOnchangePage)}
          <span
            onClick={() =>
              handleOnchangePage({ current: current + 1, pageSize })
            }
          >
            ➡️
          </span>
        </div>
      )}
    </section>
  );
};

export default CardCompany;
