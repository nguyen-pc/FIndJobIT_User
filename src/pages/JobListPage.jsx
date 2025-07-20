import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { callFetchJob, callFetchJobLatest, recommendJob } from "../config/api";
import { Card } from "antd";
import CardJob from "../components/card/CardJob";
import { useAppSelector } from "../redux/hooks";
import JobCardRecommend from "../components/JobCardRecommend";
import Footer from "../components/Footer";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const JobListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  //Lấy công việc mới nhất
  const [displayJob, setDisplayJob] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");

  //Lấy công việc phổ biến
  const [displayJobPopular, setDisplayJobPopular] = useState(null);
  const [currentPopular, setCurrenPopular] = useState(1);
  const [pageSizePopular, setPageSizePopular] = useState(4);
  const [totalPopular, setTotalPopular] = useState(0);
  const [filterPopular, setFilterPopular] = useState("");

  // Lấy công việc phù hợp
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  const [jobRecommend, setJobRecommend] = React.useState(null);

  useEffect(() => {
    fetchJob();
  }, [current, pageSize, filter, sortQuery, location]);

  useEffect(() => {
    fetchJobPopular();
  }, [currentPopular, pageSizePopular, filterPopular, sortQuery, location]);

  useEffect(() => {
    fetchJobRecommend();
  }, []);

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

  const fetchJobRecommend = async () => {
    try {
      const response = await recommendJob();
      console.log("Recommended Jobs:", response.data.recommendations);
      setJobRecommend(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommended jobs:", error);
    }
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
      <button
        key={num}
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === num
            ? "bg-[#1C9EAF] text-white"
            : "hover:bg-gray-200 text-gray-700"
        }`}
        onClick={() => onChange({ current: num, pageSize })}
      >
        {num}
      </button>
    ));
  };

  return (
    <>
      <Header />
      <div>
        {/* Công việc mới nhất */}
        <div className="HotCompany ml-20 " style={{ padding: "0px " }}>
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
                  icon={faChevronRight}
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
              <div className="pagination flex justify-center mt-4 items-center gap-1">
                {/* Nút trang trước */}
                <button
                  className={`px-2 py-1  ${
                    current > 1 ? "" : "text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    current > 1 &&
                    handleOnchangePage({ current: current - 1, pageSize })
                  }
                  disabled={current <= 1}
                >
                  <span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </span>
                </button>

                {/* Hiển thị số trang */}
                {renderPageNumbers(totalJobPages, current, handleOnchangePage)}

                {/* Nút trang sau */}
                <button
                  className={`px-2 py-1 ${
                    current < totalJobPages
                      ? ""
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    current < totalJobPages &&
                    handleOnchangePage({ current: current + 1, pageSize })
                  }
                  disabled={current >= totalJobPages}
                >
                  <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </button>
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
                <span>
                  <FontAwesomeIcon icon={faChevronRight} className="" />
                </span>
              </div>
            </div>
          </div>
          <div className="flex-grow  max-w-[1300px] my-2  mx-auto w-full  ">
            <div className="">
              <CardJob displayJob={displayJobPopular} isLoading={isLoading} />
            </div>
            {totalPopular > pageSizePopular && (
              <div className="pagination flex justify-center mt-4 items-center gap-1">
                {/* Nút trang trước */}
                <button
                  className={`px-2 py-1 ${
                    currentPopular > 1 ? "" : "text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    currentPopular > 1 &&
                    handleOnchangePagePopular({
                      currentPopular: currentPopular - 1,
                      pageSizePopular,
                    })
                  }
                  disabled={currentPopular <= 1}
                >
                  <span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </span>
                </button>

                {/* Hiển thị số trang */}
                {Array.from(
                  { length: totalJobPagesPopular },
                  (_, i) => i + 1
                ).map((num) => (
                  <button
                    key={num}
                    className={`mx-1 px-3 py-1 border rounded ${
                      currentPopular === num
                        ? "bg-[#1C9EAF] text-white"
                        : " text-gray-700"
                    }`}
                    onClick={() =>
                      handleOnchangePagePopular({
                        currentPopular: num,
                        pageSizePopular,
                      })
                    }
                  >
                    {num}
                  </button>
                ))}

                {/* Nút trang sau */}
                <button
                  className={`px-2 py-1  rounded ${
                    currentPopular < totalJobPagesPopular
                      ? ""
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    currentPopular < totalJobPagesPopular &&
                    handleOnchangePagePopular({
                      currentPopular: currentPopular + 1,
                      pageSizePopular,
                    })
                  }
                  disabled={currentPopular >= totalJobPagesPopular}
                >
                  <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </button>
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
                  icon={faChevronRight}
                  className="text-xs mr-2 "
                />
              </div>
            </div>
          </div>
          <div className="flex-grow  max-w-[1300px] my-2  mx-auto w-full  ">
            <div className="">
              <JobCardRecommend jobs={jobRecommend} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobListPage;
