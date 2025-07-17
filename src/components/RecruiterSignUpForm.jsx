import { useNavigate } from "react-router-dom";
import MailIcon from "../assets/emailicon.png";
import PasswordIcon from "../assets/padlockicon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import ProfileIcon from "../assets/profile 1.png";
import PhoneIcon from "../assets/phone.png";

import CompanyIcon from "../assets/enterprise.png";
import TaxIcon from "../assets/tax.png";
import { callRegister, callRegisterRecruiter } from "../config/api";
import { notification } from "antd";
function RecruiterSignUpForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (password !== rePassword) {
      alert("Mật khẩu không khớp, vui lòng nhập lại!");
      setIsSubmit(false);
      notification.error({
        message: "Mật khẩu không trùng khớp",
        duration: 5,
      });
      return;
    }
    console.log(companyName, taxCode, email, password, name, phoneNumber);
    const res = await callRegisterRecruiter(
      name,
      email,
      password,
      phoneNumber,
      taxCode,
      companyName
    );
    console.log("Response from server:", res);
    setIsSubmit(false);
    if (res?.data?.id) {
      message.success("Đăng ký tài khoản thành công!");
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
                placeholder="Nhập họ tên người đại diện"
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
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
            <div className="input_group">
              <img src={PasswordIcon} alt="" className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="pre_password_input"
                placeholder="Nhập lại mật khẩu"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <span className="toggle_icon" onClick={togglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="input_group">
              <img src={CompanyIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="company_input"
                placeholder="Nhập tên công ty"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="input_group">
              <img src={TaxIcon} alt="" className="input_icon" />
              <input
                type="text"
                name=""
                id="taxCode_input"
                placeholder="Nhập mã số thuế"
                value={taxCode}
                onChange={(e) => setTaxCode(e.target.value)}
              />
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
export default RecruiterSignUpForm;
