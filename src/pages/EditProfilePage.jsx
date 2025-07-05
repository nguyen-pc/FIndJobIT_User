import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAppSelector } from "../redux/hooks";
import {
  callFetchSkillNoPagination,
  callFetchUserById,
  callUpdateUser,
} from "../config/api";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  // State lưu dữ liệu gốc load từ API
  const [displayUser, setDisplayUser] = useState(null);
  // Danh sách tất cả các skill từ API
  const [skills, setSkills] = useState([]);
  // State dùng cho form chỉnh sửa
  const [editedUser, setEditedUser] = useState({
    id: user.id || "",
    name: "",
    address: "",
    email: "",
    phone: "",
    gender: "",
    skills: [], // Mảng skill lưu dưới dạng {id, name}
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load dữ liệu người dùng từ API và cập nhật cả displayUser & editedUser
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const res = await callFetchUserById(user.id);
      if (res && res.data) {
        setDisplayUser(res.data);
        setEditedUser({
          id: user.id,
          name: res.data.name || "",
          address: res.data.address || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          gender: res.data.gender || "",
          skills: res.data.skills || [],
        });
        console.log("Dữ liệu người dùng đã tải:", res.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu người dùng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load danh sách kỹ năng từ API
  const fetchSkillsData = async () => {
    try {
      const res = await callFetchSkillNoPagination();
      if (res && res.data) {
        setSkills(res.data);
        console.log("Kỹ năng đã tải:", res.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải kỹ năng:", error);
    }
  };

  // Gọi API khi user thay đổi hoặc đăng nhập thành công
  useEffect(() => {
    if (user && isAuthenticated) {
      fetchUserData();
      fetchSkillsData();
    }
  }, [user, isAuthenticated]);

  // Xử lý thay đổi cho các trường input đơn
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ở đây, bạn gửi editedUser đến backend hoặc cập nhật redux store.
    console.log("Dữ liệu người dùng đã cập nhật:", editedUser);
    const res = callUpdateUser(editedUser);
    console.log("Kết quả cập nhật:", res);
    alert("Hồ sơ đã được cập nhật thành công!");
    // navigate("/profile");
  };

  // Xử lý nếu người dùng hủy thay đổi
  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="edit-profile-wrapper p-4 max-w-4xl mx-auto">
      <header className="header-edit-profile mb-4">
        <div className="header-top flex items-center justify-between">
          <button className="back-button text-blue-500" onClick={handleCancel}>
            ← Quay lại
          </button>
          <h1 className="edit-profile-title text-2xl font-bold">
            Chỉnh sửa Hồ sơ
          </h1>
          <button
            type="submit"
            form="edit-profile-form"
            className="save-button bg-[#1C9EAF] text-white px-4 py-2 rounded"
          >
            Lưu hồ sơ
          </button>
        </div>
      </header>

      <main className="edit-profile-content">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form
            id="edit-profile-form"
            onSubmit={handleSubmit}
            className="edit-profile-form space-y-4"
          >
            {/* Thông Tin Chung */}
            <section className="edit-section">
              <h2 className="edit-section-title text-xl font-semibold mb-2">
                Thông Tin Chung
              </h2>
              <div className="form-group flex flex-col mb-2">
                <label htmlFor="name" className="mb-1">
                  Tên:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              </div>
              <div className="form-group flex flex-col mb-2">
                <label htmlFor="address" className="mb-1">
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editedUser.address}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              </div>
              <div className="form-group flex flex-col mb-2">
                <label htmlFor="email" className="mb-1">
                  Email:
                </label>
                <input
                  disabled
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              </div>
              <div className="form-group flex flex-col mb-2">
                <label htmlFor="phone" className="mb-1">
                  SĐT:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              </div>
              <div className="form-group flex flex-col mb-2">
                <label htmlFor="gender" className="mb-1">
                  Giới tính:
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={editedUser.gender}
                  onChange={handleChange}
                  className="p-2 border rounded"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </section>

            {/* Kỹ năng: sử dụng react-select cho lựa chọn nhiều kỹ năng */}
            <section className="edit-section">
              <h2 className="edit-section-title text-xl font-semibold mb-2">
                Kỹ năng
              </h2>
              <div className="form-group flex flex-col mb-2">
                <label htmlFor="skills" className="mb-1">
                  Chọn kỹ năng:
                </label>
                <Select
                  isMulti
                  id="skills"
                  name="skills"
                  options={skills.map((skill) => ({
                    value: skill.id,
                    label: skill.name,
                  }))}
                  value={editedUser.skills.map((skill) => ({
                    value: skill.id,
                    label: skill.name,
                  }))}
                  onChange={(selectedOptions) =>
                    setEditedUser((prevUser) => ({
                      ...prevUser,
                      skills: selectedOptions.map((option) => ({
                        id: option.value, 
                         name: option.label,// Chỉ lấy id, đúng định dạng như yêu cầu.
                      })),
                    }))
                  }
                />
              </div>
            </section>

            <div className="edit-profile-actions-bottom flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="cancel-button bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="save-button bg-[#1C9EAF] text-white px-4 py-2 rounded"
              >
                Lưu tất cả thay đổi
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default EditProfilePage;
