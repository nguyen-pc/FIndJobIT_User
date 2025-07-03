import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { callFetchJob, callFetchJobLatest } from "../config/api";
import { Card } from "antd";
import CardJob from "../components/CardJob";

const JobListPage = () => {
  const [displayJob, setDisplayJob] = useState(null);
  const [displayJobPopular, setDisplayJobPopular] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");

  const [currentPopular, setCurrenPopular] = useState(1);
  const [pageSizePopular, setPageSizePopular] = useState(1);
  const [totalPopular, setTotalPopular] = useState(0);
  const [filterPopular, setFilterPopular] = useState("");

  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    fetchJob();
  }, [current, pageSize, filter, sortQuery, location]);

  useEffect(() => {
    fetchJobPopular();
  }, [currentPopular, pageSizePopular, filterPopular, sortQuery, location]);
 
 
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

    const res = await callFetchJobLatest(query);
    if (res) {
      setDisplayJob(res.data.result);
      console.log("res", res.data.result);
      console.log("displayJob", displayJob);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const fetchJobPopular = async () => {
    setIsLoading(true);
    let query = `page=${currentPopular}&size=${pageSizePopular}`;
    if (filter) {
      query += `&${filterPopular}`;
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
    if (res) {
      setDisplayJobPopular(res.data.result);
      console.log("res", res.data.result);
      console.log("displayJob", displayJob);
      setTotalPopular(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleOnchangePagePopular = (pagination) => {
    if (pagination.currentPopular < 1) return;

    if (pagination && pagination.currentPopular !== currentPopular) {
      setCurrenPopular(pagination.currentPopular);
    }
    if (
      pagination &&
      pagination.pageSizePopular !== undefined &&
      pagination.pageSizePopular !== pageSizePopular
    ) {
      setPageSizePopular(pagination.pageSizePopular);
      setCurrenPopular(1);
    }
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
  const totalJobPagesPopular = Math.ceil(totalPopular / pageSizePopular);

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
    <>
      <Header />
      <div>
        {/* Công việc mới nhất */}
        <div className="HotCompany ml-20 o" style={{ padding: "0px " }}>
          <div className="mt-10  flex">
            <p
              className="text-2xl font-semibold text-center"
              style={{ color: "#1C9EAF" }}
            >
              DANH SÁCH CÔNG VIỆC MỚI NHẤT
            </p>
            <div className="rounded-full border md:w-auto h-[30px] pl-2.5 ml-[10px]">
              <div
                className="width-30 cursor-pointer hover:text-[#1C9EAF] duration-300"
                onClick={() => navigate("/")}
              >
                <span className=" text-xs mr-2 ">Xem thêm</span>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-xs mr-2 "
                />
              </div>
            </div>
          </div>
          <div className="flex-grow  max-w-[1300px] my-2  mx-auto w-full  ">
            <div className="">
              <CardJob displayJob={displayJob} isLoading={isLoading} />
            </div>
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
          </div>
        </div>

        {/* Các công việc phổ biến */}
        <div className="HotCompany ml-20 o" style={{ padding: "0px " }}>
          <div className="mt-10  flex">
            <p
              className="text-2xl font-semibold text-center"
              style={{ color: "#1C9EAF" }}
            >
              CÔNG VIỆC PHỔ BIẾN
            </p>
            <div className="rounded-full border md:w-auto h-[30px] pl-2.5 ml-[10px]">
              <div
                className="width-30 cursor-pointer hover:text-[#1C9EAF] duration-300"
                onClick={() => navigate("/")}
              >
                <span className=" text-xs mr-2 ">Xem thêm</span>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-xs mr-2 "
                />
              </div>
            </div>
          </div>
          <div className="flex-grow  max-w-[1300px] my-2  mx-auto w-full  ">
            <div className="">
              <CardJob displayJob={displayJobPopular} isLoading={isLoading} />
            </div>
            {totalPopular > pageSizePopular && (
              <div className="pagination">
                {/* Nút trang trước */}
                {currentPopular > 1 ? (
                  <span
                    onClick={() =>
                      handleOnchangePagePopular({
                        currentPopular: currentPopular - 1,
                        pageSizePopular,
                      })
                    }
                  >
                    ⬅️
                  </span>
                ) 
                : (
                  <span className="disabled">⬅️</span>
                )}
                {/* Hiển thị số trang */}
                {renderPageNumbers(
                  totalJobPagesPopular,
                  currentPopular,
                  handleOnchangePagePopular
                )}
                {/* Nút trang sau */}
                {currentPopular < totalJobPagesPopular ? (
                  <span
                    onClick={() =>
                      handleOnchangePagePopular({
                        currentPopular: currentPopular + 1,
                        pageSizePopular,
                      })
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

        {/* Công việc có thể phù hợp với bạn */}
        <div className="HotCompany ml-20 o" style={{ padding: "0px " }}>
          <div className="mt-10  flex">
            <p
              className="text-2xl font-semibold text-center"
              style={{ color: "#1C9EAF" }}
            >
              GỢI Ý CÔNG VIỆC PHÙ HỢP VỚI BẠN
            </p>
            <div className="rounded-full border md:w-auto h-[30px] pl-2.5 ml-[10px]">
              <div
                className="width-30 cursor-pointer hover:text-[#1C9EAF] duration-300"
                onClick={() => navigate("/")}
              >
                <span className=" text-xs mr-2 ">Xem thêm</span>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-xs mr-2 "
                />
              </div>
            </div>
          </div>
          <div className=" flex mb-20">
            <div className="w-full h-[400px] flex relative">
              {/* {displayCompany.map((c, i) => (
              <div
                key={i}
                className="relative mr-9"
                onMouseEnter={() => setHoveredFavoriteIndex(i)}
                onMouseLeave={() => setHoveredFavoriteIndex(null)}
              >
                <CompanyCard company={c} />
                <div
                  className={`
                              absolute top-3 -left-16 mt-2 z-50 transition-all duration-900
                              ${
                                hoveredFavoriteIndex === i
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 -translate-y-2 pointer-events-none"
                              }
                            `}
                >
                  <InfoCard company={c} />
                </div>
              </div>
            ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobListPage;
