import { useNavigate } from "react-router-dom";
import CandidateSignUpForm from "../components/CandidateSignUpForm";
import { useState } from "react";
import RecruiterSignUpForm from "../components/RecruiterSignUpForm";
import GoogleIcon from "../assets/google.png";

function SignUp() {
  const [role, setRole] = useState("candidate");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    navigate("/signin");
  };
  const handleGoogle = (e) => {
    navigate("/");
  };
  return (
    <div className="singup_container">
      <div className="login_wrapper">
        <div className="left_col">
          <h2 className="title_login">ĐĂNG KÝ</h2>
          <div className="role_login">
            <div
              className={`role_item ${role === "candidate" ? "active" : ""}`}
              onClick={() => setRole("candidate")}
            >
              Ứng viên
            </div>
            <div
              className={`role_item ${role === "recruiter" ? "active" : ""}`}
              onClick={() => setRole("recruiter")}
            >
              Nhà tuyển dụng
            </div>
          </div>
          {role === "candidate" ? (
            <CandidateSignUpForm />
          ) : (
            <RecruiterSignUpForm />
          )}

          {/* <div className="input_group">
            <img src={GoogleIcon} alt="" className="input_icon googleicon" />
            <div className="google" onClick={handleGoogle}>
              Tiếp tục với Google
            </div>
          </div> */}
          <div className="google2">
            Bạn đã có tài khoản?{" "}
            <a className="signup_nav" onClick={handleSignIn}>
              Đăng nhập ngay
            </a>
          </div>
        </div>

        <div className="right_col">
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
  );
}

export default SignUp;
