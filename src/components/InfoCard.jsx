import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
function InfoCard({ company }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-white/100 p-4 shadow-lg rounded w-[300px] h-[350px] relative ">
      {/* Logo và nội dung */}
      <img src={company.logo} alt="logo" className="w-12 mb-2" />
      <p className="font-bold">{company.title}</p>
      <p className="text-sm text-gray-600 line-clamp-6">
        {company.description}
      </p>
      <p className="text-sm text-gray-600 line-clamp-4 font-semibold flex">
        <FaUserPlus className="mr-3 mt-1" /> {company.follower}
        <span className="ml-1 font-normal">người theo dõi</span>
      </p>
      {/* Button thích */}
      <div className="flex">
        <button className="absolute bg-[#1c9eaf] bottom-4 left w-23 h-11 flex flex-col items-center justify-center border rounded text-white text-sm focus:outline-none">
          <span className="text-xs">Xem chi tiết</span>
        </button>
        <button
          onClick={toggleLike}
          className="absolute bottom-4 right-4  w-26 h-11 flex  items-center justify-center border rounded text-[#1C9EAF] text-xs focus:outline-none"
          title={liked ? "Bỏ thích" : "Thích"}
        >
          {liked ? (
            <FaHeart className="text-xm" />
          ) : (
            <FaRegHeart className="text-xm" />
          )}
          <span className="text-sm ml-2">Thích</span>
        </button>
      </div>
    </div>
  );
}

export default InfoCard;
