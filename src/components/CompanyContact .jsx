import React from "react";
import { Card } from "antd"; // Assuming you want to wrap this in an Ant Design Card as well
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const CompanyContact = ({ title, address }) => {
  // Correctly encode the address for the Google Maps embed URL
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  return (
    <Card
      // Responsive width: full width on small screens, max-width on larger screens
      className="w-full md:max-w-[400px] shadow-lg"
      title={<span className="text-lg md:text-xl font-semibold">{title}</span>}
      bordered={false}
    >
      <div className="flex flex-col gap-4">
        {/* Address section */}
        <div className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-[#1C9EAF] mt-1 flex-shrink-0"
          />
          <span>{address}</span>
        </div>

        {/* Google Map iframe */}
        <div className="w-full rounded-lg overflow-hidden shadow-md">
          <iframe
            className="w-full"
            title="Company Location Map"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={embedUrl}
            allowFullScreen
            loading="lazy" // Optimize loading for performance
            referrerPolicy="no-referrer-when-downgrade" // Recommended for embeds
          />
        </div>

        {/* Optional: Button to view on Google Maps */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-fit mx-auto px-4 py-2 bg-[#1C9EAF] text-white rounded-md hover:bg-[#167D8D] transition-colors duration-300 text-sm md:text-base"
        >
          Xem trên Google Maps
        </a>
      </div>
    </Card>
  );
};

export default CompanyContact;
