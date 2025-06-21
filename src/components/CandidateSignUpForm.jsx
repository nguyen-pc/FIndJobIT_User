import { useNavigate } from "react-router-dom";
import MailIcon from "../assets/emailicon.png";
import PasswordIcon from "../assets/padlockicon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import ProfileIcon from "../assets/profile 1.png";
import PhoneIcon from "../assets/phone.png";

function CandidateSingUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className="page_container">
        <div className="form_container">
          <form onSubmit={handleSignUp}>
            <div className="input_group">
              <img src={ProfileIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="name_input"
                placeholder="Nhập họ tên"
              />
            </div>
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
              <img src={PhoneIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="phoneNumber_input"
                placeholder="Nhập số điện thoại"
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
            <div className="input_group">
              <img src={PasswordIcon} alt="" className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password_input"
                placeholder="Nhập lại mật khẩu"
              />
              <span className="toggle_icon" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="button_login" type="submit">
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default CandidateSingUpForm;
