import "tailwindcss";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { convertSlug } from "../config/utils";
function CompanyCard({ company }) {
  const navigate = useNavigate();
  const handleViewDetailCompanyJob = (name, id) => {
    if (name) {
      const slug = convertSlug(name);
      navigate(`/company/${slug}?id=${id}`);
    }
  };
  return (
    <div className="mt-10 mb-10 w-full sm:w-[200px] md:w-[200px] lg:w-[250px] bg-white rounded shadow-md h-[320px] transition-all duration-300 hover:shadow-lg  cursor-pointer">
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
            company?.banner
          }`}
          className="w-full h-32 object-cover rounded-t"
          alt="background"
        />
        <div className="absolute top-10 left-4 bg-white p-2 rounded shadow-md">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
              company?.logo
            }`}
            alt="logo"
            className="w-12 sm:w-14"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="text-base font-semibold mb-2">{company.name}</div>
        <div className="text-sm text-gray-600 line-clamp-3">
          {parse(company.description ?? "")}
        </div>
        <div className="border-1 rounded text-center mt-3 text-[#1C9EAF] h-8 pt-1 text-sm w-30 ml-1 hover:bg-[#1C9EAF] hover:text-white duration-300">
          <button
            onClick={() =>
              handleViewDetailCompanyJob(company?.name, company?.id)
            }
            className=""
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
