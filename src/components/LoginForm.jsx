import { useNavigate } from "react-router-dom";
import MailIcon from "../assets/emailicon.png";
import PasswordIcon from "../assets/padlockicon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleSignUp = (e) => {
    navigate("/");
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className="page_container">
        <div className="form_container">
          <form onSubmit={handleLogin}>
            <div className="input_group">
              <img src={MailIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="email_input"
                placeholder="Nhập email"
              />
            </div>
            <div className="input_group">
              <img src={PasswordIcon} alt="" className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password_input"
                placeholder="Nhập mật khẩu"
              />
              <span className="toggle_icon" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <a className="forgotpass_nav" onClick={handleSignUp}>
              Quên mật khẩu?
            </a>
            <button className="button_login" type="submit">
              ĐĂNG NHẬP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
