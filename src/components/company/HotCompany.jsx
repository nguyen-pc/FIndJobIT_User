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
    <div className="HotCompany ml-20">
      <div className="mt-10 flex">
        <p className="text-2xl font-semibold" style={{ color: "#1C9EAF" }}>
          CÔNG TY ĐƯỢC NỔI BẬT
        </p>
        <div className="rounded-full border md:w-auto h-[30px] pl-2.5 ml-[10px]">
          <div
            className="width-30 cursor-pointer hover:text-[#1C9EAF] duration-300"
            onClick={() => navigate("/")}
          >
            <span className=" text-xs mr-2">Xem thêm</span>
            <FontAwesomeIcon icon={faAngleRight} className="text-xs mr-2" />
          </div>
        </div>
      </div>

      <div className="w-full h-[400px] flex relative mb-20">
        {displayCompany.map((c, i) => (
          <div
            key={i}
            className="relative mr-9"
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
  );
}

export default HotCompany;
