import { useState } from "react";
import CompanyCard from "../components/CompanyCard";
import logo from "../assets/logofpt.png";
import background from "../assets/fpt_banner.png";
import banner from "../assets/background2.png";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Pagination } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import "tailwindcss";

function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;
  const navigate = useNavigate();

  const companies = [
    {
      logo: logo,
      background: background,
      title: "Tập đoàn FPT",
      follower: 220,
      description:
        "Công ty SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSchuyên tư vấn và đào tạo các du học sinh Nhật Bản và Hàn Quốcssssssssssssssssssssssssssskkdksa sdkjaidjasidjsaidsjduhfsdádsadsda dsadsadsadsadsds",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty ABC",
      follower: 220,
      description:
        "Cung cấp dịch vụ phần mềm và giải pháp công nghệ thông tin...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty DEF",
      follower: 220,
      description: "Tập trung vào nghiên cứu và phát triển trí tuệ nhân tạo...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty GHI",
      follower: 220,
      description: "Chuyên về giải pháp điện toán đám mây và big data...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty JKL",
      follower: 220,
      description: "Phát triển ứng dụng di động và game...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty MNO",
      follower: 220,
      description: "Cung cấp dịch vụ an ninh mạng và bảo mật thông tin...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty PQR",
      follower: 220,
      description: "Giải pháp ERP và quản lý doanh nghiệp...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty STU",
      follower: 220,
      description:
        "Phát triển game mobile và ứng dụng giáo dụcsssssssssssssssssssssssss.sssssjjjjjjiijijijijijiádajsdiasjdasjdoiasjdoiasjdkajsdkaskjaskjdkasjdajsdkajsdjsadjsajdasjdkasjdjijijijijjijj..",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty STU2",
      follower: 220,
      description:
        "Phát triển game mobile và ứng dụng giáo dụcsssssssssssssssssssssssss.sssssjjjjjjiijijijijijiádajsdiasjdasjdoiasjdoiasjdkajsdkaskjaskjdkasjdajsdkajsdjsadjsajdasjdkasjdjijijijijjijj..",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty STU3",
      follower: 220,
      description:
        "Phát triển game mobile và ứng dụng giáo dụcsssssssssssssssssssssssss.sssssjjjjjjiijijijijijiádajsdiasjdasjdoiasjdoiasjdkajsdkaskjaskjdkasjdajsdkajsdjsadjsajdasjdkasjdjijijijijjijj..",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty STU4",
      follower: 220,
      description:
        "Phát triển game mobile và ứng dụng giáo dụcsssssssssssssssssssssssss.sssssjjjjjjiijijijijijiádajsdiasjdasjdoiasjdoiasjdkajsdkaskjaskjdkasjdajsdkajsdjsadjsajdasjdkasjdjijijijijjijj..",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty VWX",
      follower: 220,
      description: "Dịch vụ tư vấn chuyển đổi số...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty YZA",
      follower: 220,
      description: "Cung cấp giải pháp IoT thông minh...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty BCD",
      follower: 220,
      description: "Phát triển ứng dụng tài chính...",
    },
    {
      logo: logo,
      background: background,
      title: "Công ty EFG",
      follower: 220,
      description: "Giải pháp blockchain và tiền điện tử...",
    },
  ];

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchQuery(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  const handleWatchMore = (e) => {};
  const filteredCompanies = companies.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

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
      {/* THANH TÌM KIẾM
      <div className="search flex justify-center mt-6 relative">
        <img src={banner} alt="" className="w-3/4" />
        <div className="flex flex-row absolute top-15">
          <Input
            placeholder="Tìm kiếm công ty..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: 300, borderRadius: "8px" }}
          />
          <div className="text-center p-2 ml-6 bg-white w-[130px] h-[40px] rounded-md flex items-center justify-center cursor-pointer">
            Tìm kiếm
          </div>
        </div>
      </div> */}

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
          <div className="HotCompany ml-20 " style={{ padding: "0px " }}>
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
              <div className="w-full h-[400px] flex relative">
                {companies.slice(0, 5).map((c, i) => (
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
          </div>

          {/* CÔNG TY ĐƯỢC YÊU THÍCH */}

          <div className="HotCompany ml-20 o" style={{ padding: "0px " }}>
            <div className="mt-10  flex">
              <p
                className="text-2xl font-semibold "
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
                {companies.slice(6, 11).map((c, i) => (
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
                className="text-center text-2xl font-semibold"
                style={{ color: "#1C9EAF" }}
              >
                CÁC CÔNG TY KHÁC
              </p>
            </div>
            <div className="ml-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {currentCompanies.map((c, i) => (
                  <CompanyCard key={i} company={c} />
                ))}
              </div>
              <div className="pagination-container flex justify-center mt-8 mb-8">
                <Pagination
                  current={currentPage}
                  pageSize={companiesPerPage}
                  total={companies.length}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CompanyList;
