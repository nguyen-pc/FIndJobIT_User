import React from "react";
import { useNavigate } from "react-router-dom";
import { convertSlug } from "../../config/utils";

const CardCompany = ({ company }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = convertSlug(company.name);
    navigate(`/company/${slug}?id=${company.id}`);
  };

  return (
    <div
      className="cursor-pointer p-4 shadow-md rounded-lg bg-white flex flex-col items-center hover:shadow-xl transition m-3"
      onClick={handleClick}
    >
      <img
        className="h-16 w-32 object-contain mb-2"
        src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${
          company.logo
        }`}
        alt={company.name}
      />
      <h3 className="text-center font-semibold text-sm">{company.name}</h3>
    </div>
  );
};

export default CardCompany;
