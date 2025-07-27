import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobListPage from "./JobListPage";
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
} from "../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faHeart,
  faArrowLeft,
  faArrowRight,
  faAngleRight,
  faSackDollar,
  faLocationDot,
  faWebAwesome,
} from "@fortawesome/free-solid-svg-icons";
import nen1 from "../assets/nen4.png";
import nen2 from "../assets/nen2.jpg";
import nen3 from "../assets/nen.jpg";
import nen4 from "../assets/nen5.jpeg";
import { Select, notification } from "antd";
import { LOCATION_LIST } from "../config/utils";
import queryString from "query-string";
import { sfIn } from "spring-filter-query-builder";

const { Option } = Select;

const HotJobs = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1000,
    className: "myCustomCarousel",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { showHeader = true } = props;
  const [displayJob, setDisplayJob] = useState(null);
  const [displayCompanyLikest, setDisplayCompanyLikest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");
  const navigate = useNavigate();
  const [searchParamsUrl, setSearchParamsUrl] = useSearchParams();
  const [jobList, setJobList] = useState([]);
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

  const location = useLocation();

  useEffect(() => {
    fetchJob();
    fetchCompanyLikest();
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
      setJobList(res.data.result);
      setDisplayJob(res.data.result?.[0] || null);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const fetchCompanyLikest = async () => {
    setIsLoading(true);
    const res = await callFetchCompanyLikest();
    if (res && res.data) {
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
  const selectedBackground = backgrounds[selectedIndex % backgrounds.length];

  return (
    <div className=" overflow-x-hidden">
      {showHeader && <Header />}
      <div
        className="search_input3 text-white bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${selectedBackground})`,
          minHeight: "50vh",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="ml-12">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <p key="loading">Đang tải thông tin việc làm...</p>
            ) : displayJob ? (
              <motion.div
                key={displayJob.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-lg bg-transparent"
              >
                <div className="rounded-lg bg-transparent">
                  <div className="text-[90px] font-bold text-white-600">
                    {displayJob.name}
                  </div>
                  <p>
                    <span className="text-[20px] text-orange-300 font-thin text-white-600">
                      {displayJob.company.name}
                    </span>
                  </p>

                  <p>
                    {Array.isArray(displayJob.skills) &&
                      displayJob.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
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
                    <p className="text-white">
                      <span className="text-sm font-thin">
                        <FontAwesomeIcon icon={faSackDollar} />{" "}
                        {(displayJob.salary + "").replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}{" "}
                        đ
                      </span>
                    </p>
                    <p className="text-white text-sm font-thin ml-3">
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
                          backgroundImage: `url(${backgrounds[index]})`,
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
      <JobListPage showHeader={false} />
    </div>
  );
};

export default HotJobs;
