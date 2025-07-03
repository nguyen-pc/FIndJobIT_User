import { useNavigate, useSearchParams } from "react-router-dom";
import MailIcon from "../assets/emailicon.png";
import PasswordIcon from "../assets/padlockicon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { callResetPassword } from "../config/api";
function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  //truyền id vào đường dẫn
  /////////////////////////////
  const handleSwitchResetPass = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Mật khẩu không khớp, vui lòng nhập lại!");
      return;
    }
    // console.log("Token:", token, password, rePassword);
    handleResetPassword(token, password);
    navigate("/signin");
  };

  const handleResetPassword = async (token, password) => {
    try {
      await callResetPassword(token, password);
    } catch (error) {
      console.error("Error resetting password:", error);
      // Xử lý lỗi nếu cần thiết, ví dụ: hiển thị thông báo lỗi cho người dùng
    }
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="toggle_icon" onClick={togglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="input_group">
              <img src={PasswordIcon} alt="" className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password_input"
                placeholder="Nhập mật khẩu"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <span className="toggle_icon" onClick={togglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
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
