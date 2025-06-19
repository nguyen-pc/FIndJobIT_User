interface CompanyCardProps {
  name: string;
  title: string;
  date: string;
}

const CompanyCard = ({ name, title, date }: CompanyCardProps) => {
  return (
    <div className="card company-card">
      <div style={{ fontSize: '2em', color: '#1C9EAF' }}>FPT IS</div> {/* Placeholder logo */}
      <h3>{name}</h3>
      <p>{title}</p>
      <p>{date}</p>
    </div>
  );
};

export default CompanyCard;