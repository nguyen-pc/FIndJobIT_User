const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="logo">NextDev</div>
        <div className="nav-links">
          <a href="#ung-vien" className="nav-link">Ứng viên</a>
          <a href="#nha-tuyen-dung" className="nav-link">Nhà tuyển dụng</a>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">🌐</span>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">🎥</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">🔗</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © CÔNG TY CỔ PHẦN NEXTDEV</p>
      </div>
    </footer>
  );
};

export default Footer;