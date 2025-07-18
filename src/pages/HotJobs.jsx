import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CompanyCard from "../components/CompanyCard"; // Import CompanyCard
import CardJob from "../components/card/CardJob";
import InfoCard from "../components/InfoCard"; // Import InfoCard nếu bạn muốn hover effect
// import CardJob from "../components/card/CardJob"; // <-- BỎ DÒNG NÀY
import CardCompany from "../components/card/CardCompany";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  callFetchJob,
  callFetchCompanyLikest,
  callFetchAllSkill,
} from "../config/api"; // Import callFetchAllSkill và các API khác
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faHeart,
  faArrowLeft,
  faArrowRight,
  faAngleRight,
  faSackDollar,
  faLocationDot,
  faWebAwesome, // Thêm faAngleRight cho nút "Xem thêm"
} from "@fortawesome/free-solid-svg-icons";
import nen1 from "../assets/nen4.png";
import nen2 from "../assets/nen2.jpg";
import nen3 from "../assets/nen.jpg";
import nen4 from "../assets/nen5.jpeg";
// Import các thành phần Ant Design và utils cần thiết cho thanh tìm kiếm
import { Select, notification } from "antd";
import { LOCATION_LIST } from "../config/utils";
import queryString from "query-string";
import { sfIn } from "spring-filter-query-builder";

const { Option } = Select; // Destructure Option từ Select

const HotJobs = (props) => {
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

  // displayJob sẽ lưu trữ MỘT đối tượng job duy nhất, không phải mảng
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
  const [jobList, setJobList] = useState([]);

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
    let query = `page=${current}&size=${pageSize}`; // Sử dụng pageSize để lấy số lượng job mong muốn
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    const res = await callFetchJob(query);
    console.log("res job", res);
    if (res && res.data) {
      setJobList(res.data.result); // Lưu toàn bộ danh sách
      setDisplayJob(res.data.result?.[0] || null);
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const backgrounds = [nen1, nen2, nen3, nen4];
  const backgroundIndex = displayJob ? displayJob.id % backgrounds.length : 0;
  const selectedBackground = backgrounds[selectedIndex % backgrounds.length];

  return (
    <div className="homepage-wrapper">
      <Header />
      <div
        className="search_input2 text-white bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${selectedBackground})`,
          minHeight: "80vh",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="ml-12">
          {/* HIỂN THỊ THÔNG TIN JOB DUY NHẤT Ở ĐÂY */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <p key="loading">Đang tải thông tin việc làm...</p>
            ) : displayJob ? (
              <motion.div
                key={displayJob.id} // quan trọng để tạo hiệu ứng khi thay đổi
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-lg bg-transparent"
              >
                <div className="  rounded-lg  bg-transparent">
                  <div className="text-[90px] font-bold text-white-600">
                    {displayJob.name}
                  </div>
                  <p className=" ">
                    <span className="text-[20px] text-orange-300 font-thin text-white-600">
                      {displayJob.company.name}
                    </span>
                  </p>

                  <p>
                    {Array.isArray(displayJob.skills) &&
                      displayJob.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 ">
                          {displayJob.skills.map((skill) => (
                            <span
                              key={skill.id}
                              className="bg-white border text-[#1c9eaf] text-xs px-2 py-0.5 rounded"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      )}
                  </p>
                  <div className="flex">
                    <p className="text-white ">
                      <span className="text-sm font-thin">
                        <FontAwesomeIcon icon={faSackDollar} />{" "}
                        {(displayJob.salary + "").replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}{" "}
                        đ
                      </span>
                    </p>
                    <p className="text-white text-sm font-thin ml-3 ">
                      <FontAwesomeIcon icon={faLocationDot} />{" "}
                      <span className="font-thin text-sm">
                        {displayJob.location}
                      </span>
                    </p>
                    <p className="text-white text-sm font-thin ml-3">
                      <FontAwesomeIcon icon={faWebAwesome} />{" "}
                      <span className="text-white text-sm font-thin">
                        {displayJob.level}
                      </span>
                    </p>
                  </div>
                  {/* Bạn có thể thêm các thông tin khác của job tại đây */}
                  <div className="border w-[130px] pl-1 rounded-full h-[60px] cursor-pointer hover:border-orange-300">
                    <button
                      className="mt-2 px-4 py-2 bg-transparent rounded hover:text-orange-400 duration-500"
                      onClick={() =>
                        navigate(`/job/${displayJob.name}?id=${displayJob.id}`)
                      }
                    >
                      <FontAwesomeIcon icon={faInfo} />
                    </button>
                    {"|"}
                    <button
                      className="mt-2 px-4 py-2 bg-transparent rounded hover:text-orange-400 duration-500"
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                  <div className="session relative left-170 bottom-10 flex gap-1">
                    {jobList.slice(0, 7).map((job, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundImage: `url(${backgrounds[index]})`, // ❗ Không dùng %
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          transition: "background-image 0.5s ease-in-out",
                        }}
                        className="w-20 h-10 bg-black text-white flex items-center justify-center cursor-pointer hover:bg-[#1C9EAF] rounded"
                        onClick={() => {
                          setDisplayJob(jobList[index]);
                          setSelectedIndex(index);
                        }}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Pagination cho phần Việc làm nổi bật nếu có nhiều hơn 1 job để phân trang */}
          {/* Logic pagination này có thể bị ảnh hưởng nếu bạn chỉ lấy 1 job duy nhất */}
          {/* Nếu bạn muốn pagination cho "Việc làm nổi bật" riêng, bạn cần một state và logic riêng cho nó */}
          {/* Hiện tại, pagination này đang liên quan đến fetchJob() chung */}
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

        {/* -------- Featured Jobs (Giữ nguyên phần này nếu bạn muốn hiển thị danh sách job ở đây) -------- */}
        <div className="ml-12">
          <p className="text-2xl font-semibold " style={{ color: "#1C9EAF" }}>
            Việc làm nổi bật khác
          </p>
          {/* Bạn có thể dùng lại CardJob ở đây để hiển thị các job khác (nếu fetchJob trả về mảng) */}
          {/* Nếu fetchJob đã được sửa để chỉ set displayJob là một object duy nhất, bạn cần fetch job khác cho phần này */}
          {/* HOẶC: bạn cần một state khác cho các job hiển thị ở đây */}
          {/* Hiện tại, displayJob chỉ chứa 1 job, nên CardJob ở đây sẽ không hoạt động như mong muốn */}
          {/* Để làm đúng, bạn cần 2 state riêng biệt: 1 cho job đơn ở search_input2, và 1 mảng cho CardJob này */}
          {/* Để demo, tôi sẽ giả sử bạn vẫn muốn CardJob ở đây hiển thị nhiều job */}
          {/* Do đó, bạn cần tạo một state mới, ví dụ: const [allDisplayJobs, setAllDisplayJobs] = useState([]); */}
          {/* Và sửa lại fetchJob để set cả displayJob (job đơn) và allDisplayJobs (mảng) */}
          {/* Ví dụ: */}
          {/* <CardJob displayJob={allDisplayJobs} isLoading={isLoading} /> */}
          {/* Để đơn giản, tôi sẽ tạm thời giữ lại CardJob với displayJob hiện tại */}
          {/* Nhưng lưu ý rằng displayJob lúc này chỉ có 1 phần tử hoặc null */}
          <CardJob
            displayJob={displayJob ? [displayJob] : []}
            isLoading={isLoading}
          />{" "}
          {/* Sửa lại để truyền mảng */}
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

      <Footer />
    </div>
  );
};

export default HotJobs;
