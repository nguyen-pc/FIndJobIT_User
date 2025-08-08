import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CompanyCard from "../components/CompanyCard"; // Import CompanyCard
import InfoCard from "../components/InfoCard"; // Import InfoCard for hover effect
import CardJob from "../components/card/CardJob"; // Make sure this is still needed or remove if unused
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  callFetchJob,
  callFetchCompanyLikest,
  callFetchAllSkill,
} from "../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight, // Used for "Xem thêm" button
} from "@fortawesome/free-solid-svg-icons";

// Import Ant Design components and utils
import { Select, notification, Input } from "antd"; // Import Input from Ant Design
import { LOCATION_LIST } from "../config/utils";
import queryString from "query-string";
import { sfIn } from "spring-filter-query-builder";
import HotJobHome from "../pages/HotJobHome"; // Make sure this component is correctly implemented and used
import HotJobs from "./HotJobs";
const { Option } = Select;

const HomePage = () => {
  // Slider settings for "Nhà tuyển dụng nổi bật"
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1, // Change to 1 for smoother transitions
    autoplay: true,
    autoplaySpeed: 3000, // Adjusted autoplay speed for better user experience
    arrows: true, // Keep arrows for navigation
    responsive: [
      {
        breakpoint: 1200, // lg
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on small screens for better touch experience
        },
      },
    ],
  };

  const [displayJob, setDisplayJob] = useState(null);
  const [displayCompanyLikest, setDisplayCompanyLikest] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Consider using for loading states in general

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4); // For general job fetching (if applicable)
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");
  const navigate = useNavigate();
  const location = useLocation(); // For reacting to URL changes

  // State for hover effect on "Công ty được yêu thích" section
  const [hoveredFavoriteIndex, setHoveredFavoriteIndex] = useState(null);

  // States and logic for the search bar (transferred from Header)
  const optionsLocation = LOCATION_LIST;
  const [optionsSkills, setOptionsSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchParams, setSearchParams] = useState({
    name: "",
    salary: "",
    level: [],
    current: 1,
    pageSize: 15,
  });

  // Fetch skill list from backend
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

  // Function to build query string for search
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
        message: "Lỗi tìm kiếm",
        description: "Vui lòng nhập từ khóa hoặc chọn tiêu chí để tìm kiếm.",
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

  // Fetch jobs (if any section on homepage displays them directly)
  useEffect(() => {
    fetchJob();
    fetchCompanyLikest(); // Fetch liked companies
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
    if (res && res.data) {
      setDisplayJob(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const fetchCompanyLikest = async () => {
    setIsLoading(true);
    const res = await callFetchCompanyLikest();
    if (res && res.data) {
      // Slice to display only 4 companies for the "yêu thích" section
      setDisplayCompanyLikest(res.data.slice(0, 4));
    }
    setIsLoading(false);
  };

  // Pagination for general jobs (if any)
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
    // Only render pagination if needed
    if (totalPages <= 1) return null;

    return Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <span
        key={num}
        className={currentPage === num ? "active" : ""} // Consider converting to Tailwind classes
        onClick={() => onChange({ current: num, pageSize })}
      >
        {num}
      </span>
    ));
  };

  return (
    <div className="overflow-x-hidden homepage-wrapper bg-gray-50 min-h-screen">
      <Header />

      {/* ======== SEARCH SECTION ======== */}
      <div className="search_input">
        <div className="search-section  py-12 px-4 shadow-inner">
          <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-center mb-8 drop-shadow-md">
            Tìm kiếm công việc mơ ước của bạn
          </div>

          <div className="bg-white-opacity-30 p-6 md:p-8 rounded-xl shadow-xl max-w-screen-lg mx-auto border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch md:items-end">
              {/* Search Input */}
              <div className="flex-grow">
                <label htmlFor="job-search" className="sr-only">
                  Tìm kiếm theo công việc, công ty...
                </label>
                <Input
                  id="job-search"
                  type="text"
                  placeholder="Tìm kiếm theo công việc, công ty..."
                  value={searchParams.name}
                  onChange={handleSearchChange}
                  className="w-full p-[0.6rem]! border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C9EAF] focus:border-transparent text-base "
                />
              </div>

              {/* Location Filter */}
              <div className="w-full md:w-auto md:min-w-[200px]">
                <label htmlFor="location-filter" className="sr-only">
                  Địa điểm
                </label>
                <Select
                  id="location-filter"
                  mode="multiple"
                  allowClear
                  placeholder="Địa điểm"
                  style={{ width: "100%" }}
                  value={selectedLocation}
                  onChange={(value) => setSelectedLocation(value)}
                  className="custom-select-antd h-[44px]" // Ensure height matches input
                >
                  {optionsLocation.map((loc) => (
                    <Option key={loc.value} value={loc.value}>
                      {loc.label}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Skills Filter */}
              <div className="w-full md:w-auto md:min-w-[200px]">
                <label htmlFor="skills-filter" className="sr-only">
                  Kỹ năng
                </label>
                <Select
                  id="skills-filter"
                  mode="multiple"
                  allowClear
                  placeholder="Kỹ năng"
                  style={{ width: "100%" }}
                  value={selectedSkills}
                  onChange={(value) => setSelectedSkills(value)}
                  className="custom-select-antd h-[44px]" // Ensure height matches input
                >
                  {optionsSkills.map((skill) => (
                    <Option key={skill.value} value={skill.value}>
                      {skill.label}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Search Button */}
              <button
                className="w-full md:w-auto bg-[#1C9EAF] text-white px-6 py-3 rounded hover:bg-[#167D8D] focus:outline-none focus:ring-2 focus:ring-[#1C9EAF] focus:ring-opacity-50 flex items-center justify-center gap-2 text-base font-semibold transition-colors duration-300"
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

              {/* Clear Filters Button */}
              <button
                className="w-full md:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-base font-semibold transition-colors duration-300"
                onClick={handleClearFilters}
              >
                Xóa lọc
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="main-content px-4 py-8 md:px-10 lg:px-20">
        {/* ======== FEATURED RECRUITERS SLIDER ======== */}
        <section className="mt-10 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C9EAF] mb-6 text-center md:text-left">
            NHÀ TUYỂN DỤNG NỔI BẬT
          </h2>
          <Slider {...sliderSettings}>
            {displayCompanyLikest.length > 0 ? (
              displayCompanyLikest.map((c, i) => (
                <div key={i} className="px-2">
                  {" "}
                  {/* Added padding for slider items */}
                  <CompanyCard company={c} />{" "}
                  {/* Use CompanyCard directly here */}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                Không có nhà tuyển dụng nổi bật nào để hiển thị.
              </div>
            )}
          </Slider>
        </section>

        {/* ======== MOST LIKED COMPANIES GRID ======== */}
        <section className="mt-10 mb-16">
          {/* <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C9EAF] mb-3 md:mb-0 text-center md:text-left justify-center">
              CÔNG TY ĐƯỢC YÊU THÍCH
            </h2>
            <div
              className="inline-flex items-center rounded-full border border-gray-300 h-[38px] px-4 cursor-pointer text-sm text-gray-700 hover:text-[#1C9EAF] hover:border-[#1C9EAF] transition-colors duration-300"
              onClick={() => navigate("/company_list")}
            >
              <span className="mr-2">Xem thêm</span>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div> */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C9EAF] mb-6 text-center md:text-left">
            DANH SÁCH CÔNG TY ĐƯỢC YÊU THÍCH
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {displayCompanyLikest.length > 0 ? (
              displayCompanyLikest.map((c, i) => (
                <div
                  key={i}
                  className="relative group" // Added group class for hover
                  onMouseEnter={() => setHoveredFavoriteIndex(i)}
                  onMouseLeave={() => setHoveredFavoriteIndex(null)}
                >
                  <CompanyCard company={c} />
                  {/* InfoCard appears on hover, hidden on small screens */}
                  <div
                    className={`absolute top-3 left-1/2 -translate-x-1/2 mt-2 w-[300px] z-50 transition-all duration-300 hidden md:block
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
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                Không có công ty nào được yêu thích để hiển thị.
              </div>
            )}
          </div>
        </section>
      </main>
      {/* ======== HOT JOBS SECTION (from HotJobHome component) ======== */}
      <section className="mt-10">
        <HotJobs showHeader={false} />{" "}
        {/* Assuming HotJobHome handles its own title */}
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
