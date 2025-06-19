interface JobCardProps {
  title: string;
  location: string;
  skills: string[];
}

const JobCard = ({ title, location, skills }: JobCardProps) => {
  return (
    <div className="card job-card">
      <div style={{ fontSize: '2em', color: '#1C9EAF' }}>FPT IS</div> {/* Placeholder logo */}
      <h3>{title}</h3>
      <p>{location}</p>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobCard;