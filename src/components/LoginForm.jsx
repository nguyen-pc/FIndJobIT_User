import { Button, Divider, Form, Input, message, notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import MailIcon from "../assets/emailicon.png";
import PasswordIcon from "../assets/padlockicon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { callLogin, callLoginGoogle } from "../config/api";
import { useDispatch } from "react-redux";
import { setUserLoginInfo } from "../redux/slice/accountSlide";
import { GoogleLogin } from "@react-oauth/google";
function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  useEffect(() => {
    //đã login => redirect to '/'
    if (isAuthenticated) {
      // navigate('/');
      window.location.href = "/";
    }
  }, []);

  const onFinish = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    // Sử dụng state email và password đã được cập nhật từ input
    const res = await callLogin(email, password);

    setIsSubmit(false);
    console.log("Response from server:", res.data?.user);

    if (res?.data) {
      // Lưu access token vào localStorage
      localStorage.setItem("access_token", res.data.access_token);
      // Cập nhật thông tin user qua Redux
      dispatch(setUserLoginInfo(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      window.location.href = callback ? callback : "/";
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

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   navigate("/");
  // };
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
          <form onSubmit={onFinish}>
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
            <div
              className="forgotpass_nav"
              onClick={() => navigate("/forgotpassword")}
            >
              Quên mật khẩu?
            </div>
            <button className="button_login" type="submit">
              ĐĂNG NHẬP
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
export default LoginForm;
