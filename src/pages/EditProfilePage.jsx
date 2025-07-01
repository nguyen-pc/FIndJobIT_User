import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const navigate = useNavigate();

  // Khởi tạo trạng thái với dữ liệu người dùng mẫu
  // Trong ứng dụng thực tế, bạn sẽ tải dữ liệu này từ API hoặc context/redux store
  const [editedUser, setEditedUser] = useState({
    name: 'Nguyễn Chí Thiện',
    role: 'BACK-END DEVELOPER • 2 năm kinh nghiệm',
    address: 'TP. Cần Thơ, Quận Ninh Kiều',
    email: 'nthien2805@gmail.com',
    dob: '28/05/2004',
    phone: '0963998260',
    linkedin: 'linkedin.com/in/nthien2805',
    github: 'github.com/nthien2805',
    website: 'www.nthienportfolio.com',
    summary: 'Cung cấp thông tin chi tiết về việc học tập, kinh nghiệm làm việc, và các dự án đã từng tham gia. Đam mê phát triển phần mềm backend và từng hợp tác tại FPT Software.',
    skills: ['SQL', 'Tester', 'Automation Tester', 'JavaScript', 'Node.js', 'Python', 'Git'],
    capabilities: ['Làm việc nhóm', 'Giao tiếp', 'Quản lý thời gian', 'Kỹ năng giải quyết vấn đề'],
    experience: [
      { title: 'Back-end Developer tại FPT Software', date: '02/2025 - Hiện tại', note: 'Phát triển API RESTful, tối ưu hóa backend với Node.js và SQL.' },
      { title: 'Intern Developer tại ABC Corp', date: '06/2024 - 12/2024', note: 'Hỗ trợ xây dựng ứng dụng web, học quy trình Agile.' },
    ],
    education: [
      { degree: 'Kỹ sư Công nghệ Thông tin', institution: 'Đại học Cần Thơ', date: '09/2022 - 06/2025', note: 'GPA: 3.5/4.0, hoàn thành khóa luận.' },
      { degree: 'Chứng chỉ Trung cấp CNTT', institution: 'Trung tâm Đào tạo Tin học TP.HCM', date: '06/2021 - 05/2022', note: 'Chuyên sâu lập trình cơ bản.' },
    ],
    projects: [
      { title: 'Hệ thống quản lý nhân sự', date: '03/2025 - 05/2025', note: 'Xây dựng API với Node.js, triển khai trên AWS.' },
      { title: 'Ứng dụng quản lý công việc', date: '01/2025 - 02/2025', note: 'Phát triển với React và Express, triển khai trên Heroku.' },
    ],
    certificates: [
      { name: 'Chứng chỉ AWS Certified Developer', date: '04/2025', issuer: 'Amazon Web Services', note: 'Triển khai ứng dụng trên AWS.' },
      { name: 'Chứng chỉ JavaScript', date: '08/2024', issuer: 'FreeCodeCamp', note: 'Hoàn thành khóa học nâng cao.' },
    ],
    languages: [
      { name: 'Tiếng Việt', level: 'Mẹ đẻ', note: 'Thành thạo giao tiếp và công việc.' },
      { name: 'Tiếng Anh', level: 'Trung cấp (B2)', note: 'IELTS 6.0, đọc tài liệu kỹ thuật.' },
      { name: 'Tiếng Nhật', level: 'Sơ cấp (N5)', note: 'Đang học giao tiếp cơ bản.' },
    ],
    // Thêm các trường bổ sung nếu có
    hobbies: 'Đọc sách, lập trình, chơi game',
  });

  // Xử lý thay đổi input cho các trường đơn lẻ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Xử lý thay đổi cho các mảng đối tượng (kinh nghiệm, học vấn, dự án, chứng chỉ, ngôn ngữ)
  const handleArrayChange = (section, index, field, value) => {
    setEditedUser(prevUser => {
      const newArray = [...prevUser[section]];
      newArray[index] = {
        ...newArray[index],
        [field]: value
      };
      return {
        ...prevUser,
        [section]: newArray
      };
    });
  };

  // Thêm một mục mới vào mảng
  const handleAddItem = (section, newItemStructure) => {
    setEditedUser(prevUser => ({
      ...prevUser,
      [section]: [...prevUser[section], newItemStructure]
    }));
  };

  // Xóa một mục khỏi mảng
  const handleRemoveItem = (section, index) => {
    setEditedUser(prevUser => ({
      ...prevUser,
      [section]: prevUser[section].filter((_, i) => i !== index)
    }));
  };

  // Xử lý thay đổi cho kỹ năng và kỹ năng mềm (đây là mảng chuỗi đơn giản)
  const handleSkillCapabilityChange = (section, value) => {
    setEditedUser(prevUser => ({
      ...prevUser,
      [section]: value.split(',').map(item => item.trim()).filter(item => item !== '') // Chuyển chuỗi thành mảng, loại bỏ khoảng trắng và chuỗi rỗng
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ở đây, bạn sẽ gửi editedUser đến backend hoặc cập nhật context/redux store
    console.log('Dữ liệu người dùng đã cập nhật:', editedUser);
    alert('Hồ sơ đã được cập nhật thành công!');
    navigate('/profile'); // Quay lại trang hồ sơ sau khi lưu
  };

  const handleCancel = () => {
    navigate('/profile'); // Quay lại trang hồ sơ mà không lưu
  };

  return (
    <div className="edit-profile-wrapper">
      <header className="header-edit-profile">
        <div className="header-top">
          <button className="back-button" onClick={handleCancel}>← Quay lại</button>
          <h1 className="edit-profile-title">Chỉnh sửa Hồ sơ</h1>
          <button className="save-button" type="submit" form="edit-profile-form">Lưu hồ sơ</button>
        </div>
      </header>

      <main className="edit-profile-content">
        <form id="edit-profile-form" onSubmit={handleSubmit} className="edit-profile-form">
          {/* Thông Tin Chung */}
          <section className="edit-section">
            <h2 className="edit-section-title">Thông Tin Chung</h2>
            <div className="form-group">
              <label htmlFor="name">Tên:</label>
              <input type="text" id="name" name="name" value={editedUser.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="role">Vai trò:</label>
              <input type="text" id="role" name="role" value={editedUser.role} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Địa chỉ:</label>
              <input type="text" id="address" name="address" value={editedUser.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={editedUser.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Ngày sinh:</label>
              <input type="text" id="dob" name="dob" value={editedUser.dob} onChange={handleChange} placeholder="DD/MM/YYYY" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">SĐT:</label>
              <input type="tel" id="phone" name="phone" value={editedUser.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn:</label>
              <input type="url" id="linkedin" name="linkedin" value={editedUser.linkedin} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="github">GitHub:</label>
              <input type="url" id="github" name="github" value={editedUser.github} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website:</label>
              <input type="url" id="website" name="website" value={editedUser.website} onChange={handleChange} />
            </div>
          </section>

          {/* Tóm tắt */}
          <section className="edit-section">
            <h2 className="edit-section-title">Tóm tắt</h2>
            <div className="form-group">
              <label htmlFor="summary">Tóm tắt:</label>
              <textarea id="summary" name="summary" value={editedUser.summary} onChange={handleChange} rows="5"></textarea>
            </div>
          </section>

          {/* Kỹ năng */}
          <section className="edit-section">
            <h2 className="edit-section-title">Kỹ năng</h2>
            <div className="form-group">
              <label htmlFor="skills">Kỹ năng (cách nhau bởi dấu phẩy):</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={editedUser.skills.join(', ')}
                onChange={(e) => handleSkillCapabilityChange('skills', e.target.value)}
                placeholder="SQL, Tester, JavaScript"
              />
            </div>
          </section>

          {/* Kỹ năng mềm */}
          <section className="edit-section">
            <h2 className="edit-section-title">Kỹ năng mềm</h2>
            <div className="form-group">
              <label htmlFor="capabilities">Kỹ năng mềm (cách nhau bởi dấu phẩy):</label>
              <input
                type="text"
                id="capabilities"
                name="capabilities"
                value={editedUser.capabilities.join(', ')}
                onChange={(e) => handleSkillCapabilityChange('capabilities', e.target.value)}
                placeholder="Làm việc nhóm, Giao tiếp"
              />
            </div>
          </section>

          {/* Kinh Nghiệm Làm Việc */}
          <section className="edit-section">
            <h2 className="edit-section-title">Kinh Nghiệm Làm Việc</h2>
            {editedUser.experience.map((exp, index) => (
              <div key={index} className="array-item-group">
                <h3>Kinh nghiệm #{index + 1}</h3>
                <div className="form-group">
                  <label>Chức danh:</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Thời gian:</label>
                  <input
                    type="text"
                    value={exp.date}
                    onChange={(e) => handleArrayChange('experience', index, 'date', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ghi chú:</label>
                  <textarea
                    value={exp.note}
                    onChange={(e) => handleArrayChange('experience', index, 'note', e.target.value)}
                    rows="2"
                  ></textarea>
                </div>
                <button type="button" className="remove-item-button" onClick={() => handleRemoveItem('experience', index)}>Xóa kinh nghiệm</button>
              </div>
            ))}
            <button
              type="button"
              className="add-item-button"
              onClick={() => handleAddItem('experience', { title: '', date: '', note: '' })}
            >
              + Thêm kinh nghiệm
            </button>
          </section>

          {/* Học Vấn */}
          <section className="edit-section">
            <h2 className="edit-section-title">Học Vấn</h2>
            {editedUser.education.map((edu, index) => (
              <div key={index} className="array-item-group">
                <h3>Học vấn #{index + 1}</h3>
                <div className="form-group">
                  <label>Bằng cấp:</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Tổ chức:</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Thời gian:</label>
                  <input
                    type="text"
                    value={edu.date}
                    onChange={(e) => handleArrayChange('education', index, 'date', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ghi chú:</label>
                  <textarea
                    value={edu.note}
                    onChange={(e) => handleArrayChange('education', index, 'note', e.target.value)}
                    rows="2"
                  ></textarea>
                </div>
                <button type="button" className="remove-item-button" onClick={() => handleRemoveItem('education', index)}>Xóa học vấn</button>
              </div>
            ))}
            <button
              type="button"
              className="add-item-button"
              onClick={() => handleAddItem('education', { degree: '', institution: '', date: '', note: '' })}
            >
              + Thêm học vấn
            </button>
          </section>

          {/* Dự án */}
          <section className="edit-section">
            <h2 className="edit-section-title">Dự án</h2>
            {editedUser.projects.map((proj, index) => (
              <div key={index} className="array-item-group">
                <h3>Dự án #{index + 1}</h3>
                <div className="form-group">
                  <label>Tên dự án:</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Thời gian:</label>
                  <input
                    type="text"
                    value={proj.date}
                    onChange={(e) => handleArrayChange('projects', index, 'date', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mô tả:</label>
                  <textarea
                    value={proj.note}
                    onChange={(e) => handleArrayChange('projects', index, 'note', e.target.value)}
                    rows="2"
                  ></textarea>
                </div>
                <button type="button" className="remove-item-button" onClick={() => handleRemoveItem('projects', index)}>Xóa dự án</button>
              </div>
            ))}
            <button
              type="button"
              className="add-item-button"
              onClick={() => handleAddItem('projects', { title: '', date: '', note: '' })}
            >
              + Thêm dự án
            </button>
          </section>

          {/* Chứng chỉ */}
          <section className="edit-section">
            <h2 className="edit-section-title">Chứng chỉ</h2>
            {editedUser.certificates.map((cert, index) => (
              <div key={index} className="array-item-group">
                <h3>Chứng chỉ #{index + 1}</h3>
                <div className="form-group">
                  <label>Tên chứng chỉ:</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleArrayChange('certificates', index, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ngày cấp:</label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => handleArrayChange('certificates', index, 'date', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Đơn vị cấp:</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleArrayChange('certificates', index, 'issuer', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ghi chú:</label>
                  <textarea
                    value={cert.note}
                    onChange={(e) => handleArrayChange('certificates', index, 'note', e.target.value)}
                    rows="2"
                  ></textarea>
                </div>
                <button type="button" className="remove-item-button" onClick={() => handleRemoveItem('certificates', index)}>Xóa chứng chỉ</button>
              </div>
            ))}
            <button
              type="button"
              className="add-item-button"
              onClick={() => handleAddItem('certificates', { name: '', date: '', issuer: '', note: '' })}
            >
              + Thêm chứng chỉ
            </button>
          </section>

          {/* Ngôn ngữ */}
          <section className="edit-section">
            <h2 className="edit-section-title">Ngôn ngữ</h2>
            {editedUser.languages.map((lang, index) => (
              <div key={index} className="array-item-group">
                <h3>Ngôn ngữ #{index + 1}</h3>
                <div className="form-group">
                  <label>Tên ngôn ngữ:</label>
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Cấp độ:</label>
                  <input
                    type="text"
                    value={lang.level}
                    onChange={(e) => handleArrayChange('languages', index, 'level', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ghi chú:</label>
                  <textarea
                    value={lang.note}
                    onChange={(e) => handleArrayChange('languages', index, 'note', e.target.value)}
                    rows="2"
                  ></textarea>
                </div>
                <button type="button" className="remove-item-button" onClick={() => handleRemoveItem('languages', index)}>Xóa ngôn ngữ</button>
              </div>
            ))}
            <button
              type="button"
              className="add-item-button"
              onClick={() => handleAddItem('languages', { name: '', level: '', note: '' })}
            >
              + Thêm ngôn ngữ
            </button>
          </section>

          {/* Sở thích (nếu có) */}
          <section className="edit-section">
            <h2 className="edit-section-title">Sở thích</h2>
            <div className="form-group">
              <label htmlFor="hobbies">Sở thích:</label>
              <input type="text" id="hobbies" name="hobbies" value={editedUser.hobbies} onChange={handleChange} />
            </div>
          </section>

          <div className="edit-profile-actions-bottom">
            <button type="button" className="cancel-button" onClick={handleCancel}>Hủy</button>
            <button type="submit" className="save-button">Lưu tất cả thay đổi</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfilePage;