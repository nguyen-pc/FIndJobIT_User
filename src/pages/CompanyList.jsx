import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import logo from "../assets/logofpt.png";
import background from "../assets/fpt_banner.png";
import banner from "../assets/background2.png";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Pagination } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";

import "tailwindcss";
import { callFetchCompany, callFetchCompanyLikest } from "../config/api";

function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayCompany, setDisplayCompany] = useState([]);
  const [AllCompany, setAllCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=updatedAt,desc");
  const companiesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompany();
    fetchAllCompany();
  }, [current, pageSize, filter, sortQuery]);

  const fetchCompany = async () => {
    setIsLoading(true);
    const res = await callFetchCompanyLikest();
    console.log("res", res);
    if (res && res.data) {
      setDisplayCompany(res.data);
    }

    setIsLoading(false);
  };

  const fetchAllCompany = async () => {
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
      setAllCompany(res.data.result);
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

  // const handleSearch = () => {
  //   setCurrentPage(1);
  //   setSearchQuery(searchTerm);
  // };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") handleSearch();
  // };
  // const handleWatchMore = (e) => {};
  // const filteredCompanies = companies.filter((c) =>
  //   c.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const indexOfLastCompany = currentPage * companiesPerPage;
  // const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  // const currentCompanies = filteredCompanies.slice(
  //   indexOfFirstCompany,
  //   indexOfLastCompany
  // );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [hoveredHotIndex, setHoveredHotIndex] = useState(null);
  const [hoveredFavoriteIndex, setHoveredFavoriteIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <>
      <Header />

      {/* KẾT QUẢ TÌM KIẾM (chỉ hiển thị nếu searchQuery có nội dung) */}
      {searchQuery ? (
        <div className="SearchResults px-10 mt-10">
          <h2 className="text-xl font-semibold mb-6">
            Kết quả tìm kiếm:{" "}
            <span className="text-blue-500">{searchQuery}</span>
          </h2>
          {currentCompanies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {currentCompanies.map((c, i) => (
                  <CompanyCard key={i} company={c} />
                ))}
              </div>
              {filteredCompanies.length > companiesPerPage && (
                <div className="pagination-container flex justify-center mt-8 mb-8">
                  <Pagination
                    current={currentPage}
                    pageSize={companiesPerPage}
                    total={filteredCompanies.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500">Không tìm thấy công ty nào.</p>
          )}
        </div>
      ) : (
        <>
          {/* CÔNG TY NỔI BẬT */}
          {/* <div className="HotCompany ml-20 " style={{ padding: "0px " }}>
            <div className="mt-10  flex ">
              <p
                className="text-2xl font-semibold "
                style={{ color: "#1C9EAF" }}
              >
                DANH SÁCH CÔNG TY NỔI BẬT
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
              <div className="w-full h-[400px] flex relative ">
                {companies.slice(0, 4).map((c, i) => (
                  <div
                    key={i}
                    className="relative mr-9"
                    onMouseEnter={() => setHoveredHotIndex(i)}
                    onMouseLeave={() => setHoveredHotIndex(null)}
                  >
                    <CompanyCard company={c} />
                    <div
                      className={`
        absolute top-3 -left-16 mt-2 z-50 transition-all duration-900
        ${
          hoveredHotIndex === i
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
          </div> */}

          {/* CÔNG TY ĐƯỢC YÊU THÍCH */}

          <div className="HotCompany ml-20 o" style={{ padding: "0px " }}>
            <div className="mt-10  flex">
              <p
                className="text-2xl font-semibold text-center"
                style={{ color: "#1C9EAF" }}
              >
                DANH SÁCH CÔNG TY ĐƯỢC YÊU THÍCH
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
                {displayCompany.map((c, i) => (
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
                ))}
              </div>
            </div>
          </div>
          {/* CÁC CÔNG TY KHÁC */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-items-center ">
                {AllCompany.map((c, i) => (
                  <CompanyCard key={i} company={c} />
                ))}
              </div>
              <div className="pagination-container flex justify-center mt-8 mb-8">
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
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

export default CompanyList;
