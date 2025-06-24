import { useNavigate } from "react-router-dom";
import MailIcon from "../assets/emailicon.png";
import PasswordIcon from "../assets/padlockicon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import ProfileIcon from "../assets/profile 1.png";
import PhoneIcon from "../assets/phone.png";
import { message, notification } from "antd";
import { callRegister } from "../config/api";
import { GoogleLogin } from "@react-oauth/google";

function CandidateSingUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Mật khẩu không khớp, vui lòng nhập lại!");
      // notification.error({
      //   message: "Mật khẩu không trùng khớp",
      //   duration: 5,
      // });
      return;
    }
    console.log(email, password, name, age, rePassword, address);
    // navigate("/");
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (password !== rePassword) {
      alert("Mật khẩu không khớp, vui lòng nhập lại!");
      setIsSubmit(false);
      // notification.error({
      //   message: "Mật khẩu không trùng khớp",
      //   duration: 5,
      // });
      return;
    }
    const gender = "MALE";
    const res = await callRegister(
      name,
      email,
      password,
      +age,
      gender,
      address
    );
    console.log("Response from server:", res);
    setIsSubmit(false);
    if (res?.data?.id) {
      // message.success("Đăng ký tài khoản thành công!");
      navigate("/signin");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse.credential; // Lấy Google ID Token
    console.log("Google Token:", googleToken);

    // Gửi token đến server để xác minh
    setIsSubmit(true);
    const res = await callLoginGoogle(googleToken);
    setIsSubmit(false);
    console.log("Response from server:", res.data?.user);

    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(setUserLoginInfo(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      window.location.href = callback ? callback : "/";
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: data.message || "Không thể đăng nhập bằng Google",
        duration: 5,
      });
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className="page_container">
        <div className="form_container">
          <form onSubmit={onFinish}>
            <div className="input_group">
              <img src={ProfileIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="name_input"
                placeholder="Nhập họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input_group">
              <img src={MailIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="email_input"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input_group">
              <img src={PhoneIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="phoneNumber_input"
                placeholder="Nhập tuổi của bạn"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="input_group">
              <img src={PhoneIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="address_input"
                placeholder="Nhập địa chỉ "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="input_group">
              <img src={PasswordIcon} alt="" className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="repassword_input"
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
                placeholder="Nhập lại mật khẩu"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <span className="toggle_icon" onClick={togglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button className="button_login" type="submit">
              ĐĂNG KÝ
            </button>
            {/* Nút Đăng nhập với Google */}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                notification.error({
                  message: "Đăng nhập bằng Google thất bại",
                  duration: 5,
                });
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
}
export default CandidateSingUpForm;
