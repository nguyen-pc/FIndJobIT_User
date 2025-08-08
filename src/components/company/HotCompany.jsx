import React, { useEffect, useState } from "react";
import CompanyCard from "../CompanyCard";
import InfoCard from "../InfoCard";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { callFetchCompany } from "../../config/api";

function HotCompany() {
  const [displayCompany, setDisplayCompany] = useState([]);
  const [hoveredFavoriteIndex, setHoveredFavoriteIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    const res0 = await callFetchCompany();
    if (res0?.data?.result) {
      const sliced = res0.data.result.slice(2, 6);
      setDisplayCompany(sliced);
    }
  };

  return (
    <div className="HotCompany px-4 sm:ml-20">
      {/* Tiêu đề */}
      <div className="mt-10 flex items-center flex-wrap gap-2">
        <p className="text-xl sm:text-2xl font-semibold text-[#1C9EAF]">
          CÔNG TY ĐƯỢC NỔI BẬT
        </p>
        <div
          className="rounded-full border h-[30px] px-3 cursor-pointer hover:text-[#1C9EAF] duration-300 text-xs flex items-center"
          onClick={() => navigate("/")}
        >
          <span className="mr-2">Xem thêm</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>

      {/* Danh sách công ty */}
      <div className="w-full mb-10">
        {/* ✅ Mobile: cuộn ngang */}
        <div className="block sm:hidden overflow-x-auto">
          <div className="flex gap-4 w-max pb-2">
            {displayCompany.map((c, i) => (
              <div key={i} className="w-[40vw] flex-shrink-0">
                <CompanyCard company={c} />
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Desktop: dạng lưới có hover InfoCard */}
        <div className="hidden sm:flex flex-wrap gap-6 relative ">
          {displayCompany.map((c, i) => (
            <div
              key={i}
              className="relative mr-6"
              onMouseEnter={() => setHoveredFavoriteIndex(i)}
              onMouseLeave={() => setHoveredFavoriteIndex(null)}
            >
              <CompanyCard company={c} />
              {/* ✅ InfoCard chỉ hiển thị khi hover trên desktop */}
              <div
                className={`absolute top-3 -left-16 mt-2 z-50 transition-all duration-500
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
  );
}

export default HotCompany;
