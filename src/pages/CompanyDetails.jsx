import CompanyBanner from "../components/CompanyBanner";
import CompanyAboutUs from "../components/CompanyAboutUs";
import CompanyContact from "../components/CompanyContact";
import JobListCard from "../components/CompanyListCard";
import logo from "../assets/logofpt.png";
import location from "../assets/location.png";
function Company() {
  const description = `Công ty Cổ phần Viễn thông FPT (tên gọi tắt là FPT Telecom) hiện là một trong những nhà cung cấp dịch vụ viễn thông và Internet hàng đầu khu vực.`;

  const bulletPoints = [
    "Đã có mặt tại 59 tỉnh thành",
    "289 văn phòng giao dịch",
    "Thường xuyên đổi mới công nghệ",
    "Tạo giá trị bền vững",
  ];

  const handleSeeMore = () => {
    console.log("Xem thêm clicked");
  };
  return (
    <div>
      <CompanyBanner></CompanyBanner>
      <div className="company-info-row">
        <CompanyAboutUs
          title="Về chúng tôi"
          description={description}
          bulletPoints={bulletPoints}
          onSeeMore={handleSeeMore}
        />
        <CompanyContact
          title="Thông tin liên hệ"
          address="Chợ Mới, An Giang"
          mapImage={location}
        />
      </div>
      <JobListCard
        title="Tuyển dụng"
        jobs={[
          {
            logo: `${logo}`,
            title: "1 Nhân viên kỹ thuật viễn thông",
            tags: ["5G", "Tester", "Automation Tester"],
          },
          {
            logo: `${logo}`,
            title: "2 Nhân viên kỹ thuật viễn thông",
            tags: ["5G", "Tester", "Automation Tester"],
          },
          {
            logo: `${logo}`,
            title: "3 Nhân viên kỹ thuật viễn thông",
            tags: ["5G", "Tester", "Automation Tester"],
          },
        ]}
      />
    </div>
  );
}

export default Company;
