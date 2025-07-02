import { useNavigate } from "react-router-dom";
import MailIcon from "../assets/emailicon.png";
import { useState } from "react";
import { callForgotPassword } from "../config/api";

function ForgotPasswordForm1() {
  const [email, setEmail] = useState(""); // lưu email
  const navigate = useNavigate();

  const handleSwitchResetPass = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    handleForgotPassword(e);
    navigate(`/resetpassword`);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await callForgotPassword(email);
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      // Xử lý lỗi nếu cần thiết, ví dụ: hiển thị thông báo lỗi cho người dùng
    }
  };
  return (
    <>
      <div className="page_container">
        <div className="form_container">
          <form onSubmit={handleSwitchResetPass}>
            <div className="input_group">
              <img src={MailIcon} alt="" className="input_icon" />
              <input
                type="text"
                id="email_input"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // cập nhật state
              />
            </div>

            <button className="button_login" type="submit">
              Tạo lại mật khẩu
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordForm1;
