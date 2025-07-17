import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { callFetchJob } from "../config/api";
import CardJob from "../components/card/CardJob";
import { useAppSelector } from "../redux/hooks";
import { sfIn } from "spring-filter-query-builder";

const SearchJobPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // State cho dữ liệu job và phân trang
  const [displayJob, setDisplayJob] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [total, setTotal] = useState(0);

  // Lấy giá trị filter hiện có từ query string (nếu có)
  const filterParam = searchParams.get("filter");
  const decodedFilter = filterParam ? decodeURIComponent(filterParam) : "";
  console.log("Decoded filter:", decodedFilter);

  // Các state của người dùng (nếu cần dùng cho render hay phân quyền)
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  // Hàm xây dựng query từ các tham số: phân trang + sort + filter.
  // Nếu có các tham số location hoặc skills trong query string thì tạo điều kiện filter dựa vào đó.
  const buildQuery = () => {
    // Bắt đầu với phân trang và sort mặc định
    let query = `page=${current}&size=${pageSize}&sort=updatedAt,desc`;

    // Kiểm tra nếu trong query string có giá trị location or skills
    const queryLocation = searchParams.get("location");
    const querySkills = searchParams.get("skills");
    let q = "";

    if (queryLocation) {
      q = sfIn("location", queryLocation.split(",")).toString();
    }
    if (querySkills) {
      // Nếu đã có điều kiện location thì nối bộ lọc với AND
      q = queryLocation
        ? q + " and " + sfIn("skills", querySkills.split(",")).toString()
        : sfIn("skills", querySkills.split(",")).toString();
    }

    // Nếu có decodedFilter từ searchParams (đã được xây dựng từ Header hoặc nơi khác)
    if (decodedFilter) {
      query += `&filter=${encodeURIComponent(decodedFilter)}`;
      console.log("Using decoded filter in query:", query);
    } else if (q) {
      query += `&filter=${encodeURIComponent(q)}`;
    }
    return query;
  };

  // Hàm call API để fetch công việc dựa vào query
  const fetchJob = async () => {
    const query = buildQuery();
    console.log("Final query:", query);
    const res = await callFetchJob(query);
    if (res) {
      setDisplayJob(res.data.result);
      setTotal(res.data.meta.total);
      console.log("Fetched jobs:", res.data.result);
    }
  };

  useEffect(() => {
    fetchJob();
    // Chạy lại khi current, pageSize, filter hoặc location (trong URL) thay đổi
  }, [current, pageSize, location]);

  const handleOnchangePage = (pagination) => {
    if (pagination.current < 1) return;
    if (pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== undefined && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  // Tính tổng số trang từ dữ liệu backend
  const totalJobPages = Math.ceil(total / pageSize);

  // Render nút phân trang
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
    <>
      <Header />
      <div className="search-job-page">
        <div className="header-title ml-20" style={{ padding: "20px 0" }}>
          <h2 style={{ color: "#1C9EAF", textAlign: "center" }}>
            DANH SÁCH CÔNG VIỆC MÀ BẠN TÌM KIẾM
          </h2>
        </div>
        <div className="job-list-container mx-auto max-w-[1300px] my-2">
          <CardJob displayJob={displayJob} isLoading={false} />
          {total > pageSize && (
            <div className="pagination">
              {current > 1 ? (
                <span
                  onClick={() =>
                    handleOnchangePage({ current: current - 1, pageSize })
                  }
                >
                  ⬅️
                </span>
              ) : (
                <span className="disabled">⬅️</span>
              )}
              {renderPageNumbers(totalJobPages, current, handleOnchangePage)}
              {current < totalJobPages ? (
                <span
                  onClick={() =>
                    handleOnchangePage({ current: current + 1, pageSize })
                  }
                >
                  ➡️
                </span>
              ) : (
                <span className="disabled">➡️</span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchJobPage;
