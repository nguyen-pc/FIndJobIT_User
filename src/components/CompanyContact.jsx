import React from "react";

const CompanyContact = ({ title, address, mapImage, onClickMap }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <div className="contact-card">
      <div className="contact-header">{title}</div>
      <div className="contact-body">
        <div className="contact-address">
          <span className="dot-icon">📍</span> {address}
        </div>
        <img
          src={mapImage}
          alt="Bản đồ"
          className="map-image"
          onClick={() => window.open(mapUrl, "_blank")}
        />
      </div>
    </div>
  );
};

export default CompanyContact;
