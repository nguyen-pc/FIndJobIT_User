import React from "react";

const CompanyContact = ({ title, address, mapImage, onClickMap }) => {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;
  return (
    <div className="w-[400px] bg-white">
      <div className="contact-body">
        <div className="contact-address">
          <span className="dot-icon">📍</span> {address}
        </div>
        <iframe
          className="map-image"
          title="Map"
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          src={embedUrl}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default CompanyContact;
