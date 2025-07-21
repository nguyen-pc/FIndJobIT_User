import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import RecruiterForm from "../components/RecruiterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
function AboutUs() {
  const [role, setRole] = useState("candidate");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    navigate("/signup");
  };
  const handleGoogle = (e) => {
    navigate("/");
  };
  return (
    <>
      <Header></Header>
      <div className="h-100 overflow-y-hidden">
        <div className="login_wrapper overflow-y-hidden">
          <div className="left_col overflow-y-hidden">
            <div className="max-w-4xl mx-auto">
              <div className="text-4xl text-[#1c9eaf] font-bold text-center ">
                Về Chúng Tôi
              </div>
              <p className=" italic text-lg font-thin w-100  text-center p-3  leading-relaxed mb-4">
                Chào mừng bạn đến với{" "}
                <strong className="text-[#1c9eaf]">NextDev</strong> – nền tảng
                hỗ trợ sinh viên và lập trình viên ngành IT trong việc tìm kiếm
                cơ hội việc làm phù hợp.
              </p>

              <div className="text-2xl ml-10 font-semibold mt-6 mb-2 text-[#1c9eaf]">
                Sứ mệnh của chúng tôi
              </div>
              <p className="mb-4 it text-gray-500 italic font-thin ml-10">
                Kết nối sinh viên, lập trình viên và nhà tuyển dụng công nghệ
                thông tin tại Việt Nam thông qua trải nghiệm web hiện đại, dễ sử
                dụng và minh bạch.
              </p>

              <div className="text-2xl ml-10 font-semibold mt-6 mb-2 text-[#1c9eaf]">
                Đội ngũ phát triển
              </div>
              <p className="mb-2 it text-gray-500 italic font-thin ml-10">
                <div>Nguyễn Hoàng Thanh Nguyên – B2203516</div>
                <div>Nguyễn Chí Thiên – B2203530</div>
                <div>Châu Quốc Pháp – B2203521</div>
              </p>

              <div className="text-2xl ml-10 font-semibold mt-6 mb-2 text-[#1c9eaf]">
                Liên hệ
              </div>
              <p className="ml-10  text-[#1c9eaf] flex ">
                <FontAwesomeIcon className="mt-1 " icon={faEnvelope} />
                <div className="ml-3">nextdev@gmail.com </div>
              </p>
              <p className="ml-10  text-[#1c9eaf] flex ">
                <FontAwesomeIcon className="mt-1 " icon={faPhone} />
                <div className="ml-3">0963999260 </div>
              </p>
            </div>
          </div>

          <div className="right_col overflow-y-hidden">
            <div className="slogan">
              <div className="slogan_title" onClick={() => navigate("/")}>
                NextDev
              </div>
              <div className="slogan_description">
                ”Đồng hành cùng sinh viên IT chinh phục sự nghiệp"
              </div>
            </div>
            <img
              className="img_login img-fluid"
              src="./public/pexels-ifreestock-572487.jpg"
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default AboutUs;
