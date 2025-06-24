import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import RecruiterForm from "../components/RecruiterForm";
import GoogleIcon from "../assets/google.png";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useParams } from "react-router-dom";
function ResetPassword() {
  const [role, setRole] = useState("candidate");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    navigate("/signup");
  };
  const handleGoogle = (e) => {
    navigate("/");
  };
  const { email } = useParams();

  return (
    <div className="signin_container">
      <div className="login_wrapper">
        <div className="left_col">
          <div className="slogan2">
            <div className="slogan_title" onClick={() => navigate("/")}>
              NextDev
            </div>
          </div>
          <div className="ForgotPasswordForm1">
            <h2 className="title_login">Tạo lại mật khẩu</h2>
            <div>Email cần reset: {email}</div>
            <ResetPasswordForm />
            <div className="return_to_signin">
              <h5 onClick={() => navigate("/signin")}>Quay lại đăng nhập</h5>
              <h5 onClick={() => navigate("/signup")}>Đăng ký tài khoản mới</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
