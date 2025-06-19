import { useState } from 'react';

const Header = ({ onNavChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [contractType, setContractType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNavOption, setSelectedNavOption] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery, 'Location:', location, 'Job Type:', jobType, 'Contract Type:', contractType);
    setSearchQuery('');
  };

  const handleClearFilters = () => {
    setLocation('');
    setJobType('');
    setContractType('');
    console.log('Filters cleared');
  };

  const handleNavChangeLocal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedNavOption(value);
    if (value === 'hanoi' || value === 'hcm' || value === 'danang' || value === '') {
      onNavChange(value === '' ? 'listings' : 'candidateProfile');
    }
    console.log('Selected navigation option:', value);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">NextDev</div>
        <div className="filters11">
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Việc làm Hot</option>
            <option value="hanoi">Tester</option>
            <option value="hcm">Design</option>
            <option value="danang">IT</option>
          </select>
          <select value={location} onChange={handleNavChangeLocal}>
            <option value="">Việc làm</option>
            <option value="hanoi">IT</option>
            <option value="hcm">Test</option>
            <option value="danang">Design</option>
          </select>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Công ty</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="freelance">Freelance</option>
          </select>
          <select value={contractType} onChange={(e) => setContractType(e.target.value)}>
            <option value="">Công cụ</option>
            <option value="permanent">Create CV</option>
            <option value="temporary">Conver CV</option>
          </select>
        </div>
        <div className="user-button">Chí Thiên</div>
      </div>
      <div className="header-search">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo kỹ năng, công ty..."
            autoFocus
          />
          <button type="submit">
            <span className="search-icon">🔍</span>
          </button>
        </form>
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          Bộ lọc <span>▼</span>
        </button>
        {showFilters && (
          <div className="filters">
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Địa điểm</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. HCM</option>
              <option value="danang">Đà Nẵng</option>
            </select>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">Loại công việc</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="freelance">Freelance</option>
            </select>
            <select value={contractType} onChange={(e) => setContractType(e.target.value)}>
              <option value="">Loại hợp đồng</option>
              <option value="permanent">Hợp đồng dài hạn</option>
              <option value="temporary">Hợp đồng tạm thời</option>
            </select>
            <button onClick={handleClearFilters}>Xóa bộ lọc</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;