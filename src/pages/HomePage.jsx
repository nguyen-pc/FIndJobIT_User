import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardCompany from "../components/CardCompany";
import CardJob from "../components/CardJob";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { callFetchJob } from "../config/api";

const HomePage = (props) => {
  //Display List Job

  const { showPagination = false } = props;

  const [displayJob, setDisplayJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    fetchJob();
  }, [current, pageSize, filter, sortQuery, location, ]);

  const fetchJob = async () => {
    setIsLoading(true);
    let query = `page=${current}&size=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    // //check query string
    // const queryLocation = searchParams.get("location");
    // const querySkills = searchParams.get("skills");
    // if (queryLocation || querySkills) {
    //   let q = "";
    //   if (queryLocation) {
    //     q = sfIn("location", queryLocation.split(",")).toString();
    //   }

    //   if (querySkills) {
    //     q = queryLocation
    //       ? q + " and " + `${sfIn("skills", querySkills.split(","))}`
    //       : `${sfIn("skills", querySkills.split(","))}`;
    //   }

    //   query += `&filter=${encodeURIComponent(q)}`;
    // }

    const res = await callFetchJob(query);
    console.log("res", res);
    if (res && res.data) {
      setDisplayJob(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleOnchangePage = (pagination) => {
    if (pagination.current < 1) return;

    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (
      pagination &&
      pagination.pageSize !== undefined &&
      pagination.pageSize !== pageSize
    ) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  // Tính tổng số trang từ dữ liệu backend
  const totalJobPages = Math.ceil(total / pageSize);

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
    <div className="homepage-wrapper">
      <Header />

      <main className="main-content">
        {/* -------- Featured Companies -------- */}
        <CardCompany />

        {/* -------- Featured Jobs -------- */}
        <h2 className=" text-center text-[#1C9EAF]! text-[28px]!">
          Việc làm nổi bật
        </h2>
        <CardJob displayJob={displayJob} isLoading={isLoading} />
        {total > pageSize && (
          <div className="pagination">
            {/* Nút trang trước */}
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
            {/* Hiển thị số trang */}
            {renderPageNumbers(totalJobPages, current, handleOnchangePage)}
            {/* Nút trang sau */}
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
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
