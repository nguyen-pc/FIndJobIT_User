import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CompanyCard from "../components/CompanyCard"; // Import CompanyCard

import InfoCard from "../components/InfoCard"; // Import InfoCard nếu bạn muốn hover effect
import CardJob from "../components/card/CardJob";
import CardCompany from "../components/card/CardCompany";
import HotJobs from "../pages/HotJobs";
import JobListPage from "./JobListPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  callFetchJob,
  callFetchCompanyLikest,
  callFetchAllSkill,
} from "../config/api"; // Import callFetchAllSkill và các API khác
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faAngleRight, // Thêm faAngleRight cho nút "Xem thêm"
} from "@fortawesome/free-solid-svg-icons";

// Import các thành phần Ant Design và utils cần thiết cho thanh tìm kiếm
import { Select, notification } from "antd";
import { LOCATION_LIST } from "../config/utils";
import queryString from "query-string";
import { sfIn } from "spring-filter-query-builder";

const { Option } = Select; // Destructure Option từ Select

const HomePage = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true, // ← Bật tự động chạy
    autoplaySpeed: 1000, // ← Thời gian giữa mỗi lần chuyển (ms)
    className: "myCustomCarousel",
  };
  const { showPagination = false } = props;

  const [displayJob, setDisplayJob] = useState(null);
  const [displayCompanyLikest, setDisplayCompanyLikest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");
  const navigate = useNavigate();
  const [searchParamsUrl, setSearchParamsUrl] = useSearchParams(); // Đổi tên để tránh xung đột nếu có

  // === THÊM DÒNG NÀY ĐỂ KHẮC PHỤC LỖI ===
  const [hoveredFavoriteIndex, setHoveredFavoriteIndex] = useState(null);
  // ======================================

  // === THÊM CÁC STATE VÀ LOGIC TỪ HEADER SANG ĐÂY ===
  const optionsLocation = LOCATION_LIST;
  const [optionsSkills, setOptionsSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchParams, setSearchParams] = useState({
    name: "",
    salary: "",
    level: [],
    current: 1, // Đây là current cho việc search, không phải cho pagination của job
    pageSize: 15, // Đây là pageSize cho việc search, không phải cho pagination của job
  });

  // Fetch danh sách skill từ backend (chuyển từ Header)
  useEffect(() => {
    const fetchSkill = async () => {
      let query = `page=1&size=100&sort=createdAt,desc`;
      const res = await callFetchAllSkill(query);
      if (res && res.data) {
        const arr =
          res.data.result?.map((item) => ({
            label: item.name,
            value: item.id + "",
          })) || [];
        setOptionsSkills(arr);
      }
    };
    fetchSkill();
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, name: e.target.value });
  };

  const buildQuery = (params, sort, filter) => {
    const clone = { ...params };
    let parts = [];
    if (clone.name) parts.push(`name ~ '${clone.name}'`);
    if (clone.salary) parts.push(`salary ~ '${clone.salary}'`);
    if (clone.level && clone.level.length > 0) {
      parts.push(sfIn("level", clone.level));
    }

    clone.filter = parts.join(" and ");
    if (!clone.filter) delete clone.filter;

    clone.page = clone.current;
    clone.size = clone.pageSize;
    delete clone.current;
    delete clone.pageSize;
    delete clone.name;
    delete clone.salary;
    delete clone.level;
    let temp = queryString.stringify(clone);

    let sortBy = "";
    const fields = ["name", "salary", "createdAt", "updatedAt"];
    if (sort) {
      for (const field of fields) {
        if (sort[field]) {
          sortBy = `sort=${field},${sort[field] === "ascend" ? "asc" : "desc"}`;
          break;
        }
      }
    }

    if (!sortBy) {
      temp = `${temp}&sort=updatedAt,desc`;
    } else {
      temp = `${temp}&${sortBy}`;
    }
    // console.log("Base query:", temp); // Giữ console.log để debug nếu cần
    return temp;
  };

  const handleSearch = () => {
    const baseQuery = buildQuery(searchParams, {}, null);
    let extraQuery = "";
    if (selectedLocation.length) {
      extraQuery += `&location=${selectedLocation.join(",")}`;
    }
    if (selectedSkills.length) {
      extraQuery += `&skills=${selectedSkills.join(",")}`;
    }
    const finalQuery = baseQuery + extraQuery;

    if (!finalQuery) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Vui lòng chọn tiêu chí để search",
      });
      return;
    }
    navigate(`/search_job?${finalQuery}`);
  };

  const handleClearFilters = () => {
    setSelectedLocation([]);
    setSelectedSkills([]);
    setSearchParams({
      name: "",
      salary: "",
      level: [],
      current: 1,
      pageSize: 15,
    });
  };
  // === KẾT THÚC THÊM CÁC STATE VÀ LOGIC TỪ HEADER ===

  const location = useLocation(); // Giữ location vì nó vẫn được dùng trong useEffect fetchJob

  useEffect(() => {
    fetchJob();
    fetchCompanyLikest(); // Gọi API để lấy danh sách công ty được yêu thích
  }, [current, pageSize, filter, sortQuery, location]);

  const fetchJob = async () => {
    setIsLoading(true);
    let query = `page=${current}&size=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    const res = await callFetchJob(query);
    console.log("res job", res);
    if (res && res.data) {
      setDisplayJob(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const fetchCompanyLikest = async () => {
    setIsLoading(true);
    const res = await callFetchCompanyLikest();
    console.log("res likest company", res);
    if (res && res.data) {
      // Chỉ lấy 4 công ty đầu tiên nếu có nhiều hơn
      setDisplayCompanyLikest(res.data.slice(0, 4));
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

  const totalJobPages = Math.ceil(total / pageSize);

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
    <div className="homepage-wrapper  overflow-x-hidden">
      <Header />
      <div className="search_input ">
        <div className="search-section my-12 px-4">
          <div className="text-3xl md:text-4xl font-bold text-center text-white  mb-8">
            Tìm kiếm công việc mơ ước của bạn
          </div>

          <div className=" p-6 rounded-xl shadow-lg max-w-screen-lg mx-auto">
            <div className=" flex flex-wrap gap-4 justify-between">
              {/* Ô nhập nội dung tìm kiếm */}
              <input
                type="text"
                placeholder="Tìm kiếm theo công việc, công ty..."
                value={searchParams.name}
                onChange={handleSearchChange}
                className="flex-1 bg-white ml-3 min-w-[720px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C9EAF]"
              />
              {/* Nút Tìm kiếm */}
              <button
                className="bg-[#1C9EAF] rounded text-white px-4 py-2 rounded-lg hover:bg-[#1C9EAF]/90 focus:outline-none focus:ring-2 focus:ring-[#1C9EAF] flex items-center justify-center gap-2"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Tìm kiếm
              </button>
              {/* Lọc địa điểm */}
              <div className="min-w-[250px] flex-1">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Địa điểm"
                  style={{ width: "100%" }}
                  value={selectedLocation}
                  onChange={(value) => setSelectedLocation(value)}
                  className="custom-select"
                >
                  {optionsLocation.map((loc) => (
                    <Option key={loc.value} value={loc.value}>
                      {loc.label}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Lọc kỹ năng */}
              <div className="min-w-[200px] flex-1">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Kỹ năng"
                  style={{ width: "100%" }}
                  value={selectedSkills}
                  onChange={(value) => setSelectedSkills(value)}
                  className="custom-select"
                >
                  {optionsSkills.map((skill) => (
                    <Option key={skill.value} value={skill.value}>
                      {skill.label}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Nút Xóa bộ lọc */}
              <button
                className=" rounded bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleClearFilters}
              >
                Xóa lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="main-content">
        {/* ======== THANH TÌM KIẾM ======== */}

        {/* slide */}
        <div className="mt-10  ml-10" style={{ background: "" }}>
          <p className="text-2xl font-semibold " style={{ color: "#1C9EAF" }}>
            NHÀ TUYỂN DỤNG NỔI BẬT
          </p>{" "}
          <Slider {...settings}>
            {displayCompanyLikest.map((c, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => setHoveredFavoriteIndex(i)}
                onMouseLeave={() => setHoveredFavoriteIndex(null)}
              >
                <CardCompany company={c} />
              </div>
            ))}
          </Slider>
        </div>
        {/* -------- Featured Companies (đã chỉnh sửa để không cuộn ngang) -------- */}
        <div className="HotCompany" style={{ padding: "0px" }}>
          {" "}
          {/* Bỏ ml-20 o */}
          <div className="mt-10 flex flex-col md:flex-row items-center md:justify-start ml-10">
            {" "}
            {/* Thêm ml-10 và căn chỉnh */}
            <p className="text-2xl font-semibold " style={{ color: "#1C9EAF" }}>
              CÔNG TY ĐƯỢC YÊU THÍCH
            </p>
            <div className="rounded-full border md:w-auto h-[30px] pl-2.5 ml-[10px] mt-2 md:mt-0">
              {" "}
              {/* Thêm mt-2 md:mt-0 cho responsive */}
              <div
                className="width-30 cursor-pointer hover:text-[#1C9EAF] duration-300"
                onClick={() => navigate("/companies")}
              >
                <span className=" text-xs mr-2 ">Xem thêm</span>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-xs mr-2 "
                />
              </div>
            </div>
          </div>
          <div className="mb-20 ml-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
              {displayCompanyLikest.map((c, i) => (
                <div
                  key={i}
                  className="relative" // Bỏ mr-9
                  onMouseEnter={() => setHoveredFavoriteIndex(i)}
                  onMouseLeave={() => setHoveredFavoriteIndex(null)}
                >
                  <CompanyCard company={c} />
                  <div
                    className={`absolute top-3 -left-16 mt-2 z-50 transition-all duration-900
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
              ))}
            </div>
          </div>
        </div>

        {/* -------- Featured Jobs -------- */}
        <div className="ml-12">
          <p className="text-2xl font-semibold " style={{ color: "#1C9EAF" }}>
            Việc làm nổi bật
          </p>
          <CardJob displayJob={displayJob} isLoading={isLoading} />
          {total > pageSize && (
            <div className="pagination">
              {current > 1 ? (
                <span
                  onClick={() =>
                    handleOnchangePage({ current: current - 1, pageSize })
                  }
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
              ) : (
                <span className="disabled">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
              )}

              {current < totalJobPages ? (
                <span
                  onClick={() =>
                    handleOnchangePage({ current: current + 1, pageSize })
                  }
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              ) : (
                <span className="disabled">
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              )}
            </div>
          )}
        </div>
      </main>
      <div className="search_input">
        <HotJobs showHeader={false} />
      </div>
      <div className="">
        <JobListPage showHeader={false} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
