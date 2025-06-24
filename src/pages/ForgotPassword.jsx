import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import RecruiterForm from "../components/RecruiterForm";
import GoogleIcon from "../assets/google.png";
import ForgotPasswordForm1 from "../components/ForgotPasswordForm1";
function ForgotPassword() {
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
        <div className="left_col ForgotPasswordForm1">
          <h2 className="title_login">Quên mật khẩu</h2>

          <div className="ForgotPasswordForm1">
            <h5>Nhập địa chỉ email:</h5>
            <ForgotPasswordForm1 />
            <div className="return_to_signin">
              <h5 onClick={() => navigate("/signin")}>Quay lại đăng nhập</h5>
              <h5 onClick={() => navigate("/signup")}>Đăng ký tài khoản mới</h5>
            </div>
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

export default ForgotPassword;
