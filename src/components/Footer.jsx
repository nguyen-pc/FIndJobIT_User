// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import images from "../assets/bo-cong-thuong.png"; // Ensure this path is correct

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and contact */}
        <div>
          <Link to="/" className="logo text-2xl font-bold text-red-500 ml-[30px]">
            NextDev
          </Link>
          <p className="mt-2 text-sm ">
            Trường Đại học Cần Thơ, Khu II, Phường An Bình, Quận Ninh Kiều,
            TP.Cần Thơ
            <br />
          </p>
          <p className="mt-2 text-sm">
            Liên hệ: 0888 1555 00 - contact@nextdev.vn
          </p>
          <p className="mt-2 text-sm font-semibold">Chứng nhận bởi</p>
          <img
            src={images}
            alt="Đã đăng ký bộ công thương"
            className="mt-2 w-32 ml-2"
          />
        </div>

        {/* Về NextDev */}
        <div className="text-left">
          <h3 className="font-semibold mb-2 ml-[30px]">Về NextDev</h3>
          <ul className="space-y-1 text-sm list-none">
            <li>
              <Link
                to="/about"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Liên hệ
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Thỏa thuận sử dụng
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Cơ hội việc làm
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Quy định bảo mật
              </Link>
            </li>
            <li>
              <Link
                to="/regulation"
                className=" a no-underline text-gray-700 hover:text-gray-900"
              >
                Quy chế hoạt động
              </Link>
            </li>
            <li>
              <Link
                to="/complaints"
                className=" a no-underline text-gray-700 hover:text-gray-900"
              >
                Giải quyết khiếu nại
              </Link>
            </li>
          </ul>
        </div>

        {/* Ứng viên */}
        <div className="text-left">
          <h3 className="font-semibold mb-2 ml-[30px]">Ứng viên</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                to="/gross-net"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Tính lương Gross - Net
              </Link>
            </li>
            <li>
              <Link
                to="/create-cv"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Tạo CV
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Tìm kiếm công việc IT
              </Link>
            </li>
            <li>
              <Link
                to="/personality-test"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Trắc nghiệm tính cách
              </Link>
            </li>
          </ul>
        </div>

        {/* Nhà tuyển dụng */}
        <div className="text-left">
          <h3 className="font-semibold mb-2 ml-[30px]">Nhà tuyển dụng</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                to="/post-job"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Đăng việc làm IT
              </Link>
            </li>
            <li>
              <Link
                to="/search-talent"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Tìm kiếm nhân tài
              </Link>
            </li>
            <li>
              <Link
                to="/market-report"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Báo cáo thị trường IT
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="a no-underline text-gray-700 hover:text-gray-900"
              >
                Tạo tài khoản
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm mt-6">
        <div>
          Copyright © CÔNG TY CỔ PHẦN NEXTDEV / ĐKKD: 031 303 2338 - Cấp ngày:
          13/7/2025
        </div>
        <div className="flex space-x-3 justify-center mt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="no-underline"
          >
            <FaFacebookF className="text-xl hover:text-blue-600" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="no-underline"
          >
            <FaLinkedinIn className="text-xl hover:text-blue-700" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="no-underline"
          >
            <FaYoutube className="text-xl hover:text-red-600" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
