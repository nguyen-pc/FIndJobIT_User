import { useNavigate } from "react-router-dom";
import MailIcon from "../assets/emailicon.png";
import PasswordIcon from "../assets/padlockicon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //truyền id vào đường dẫn
  /////////////////////////////
  const handleSwitchResetPass = (e) => {
    e.preventDefault();
    navigate("/resetpassword");
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className="page_container">
        <div className="form_container">
          <form onSubmit={handleSwitchResetPass}>
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
                placeholder="Nhập mật khẩu"
              />
              <span className="toggle_icon" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              className="button_login"
              type="submit"
              onClick={handleSwitchResetPass}
            >
              Tạo lại mật khẩu
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default ResetPasswordForm;
