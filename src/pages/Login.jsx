import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import RecruiterForm from "../components/RecruiterForm";
import GoogleIcon from "../assets/google.png";
function Login() {
  const [role, setRole] = useState("candidate");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    navigate("/signup");
  };
  const handleGoogle = (e) => {
    navigate("/");
  };
  return (
    <div className="signin_container">
      <div className="login_wrapper">
        <div className="left_col">
          <h2 className="title_login">ĐĂNG NHẬP</h2>
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
          {role === "candidate" ? <LoginForm /> : <RecruiterForm />}

          {/* <div className="input_group">
            <img src={GoogleIcon} alt="" className="input_icon googleicon" />
            <div className="google" onClick={handleGoogle}>
              Tiếp tục với Google
            </div>
          </div> */}
          <div className="google2">
            Bạn chưa có tài khoản?{" "}
            <a className="signup_nav" onClick={handleSignUp}>
              Đăng ký ngay
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

export default Login;
