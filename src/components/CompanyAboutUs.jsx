import React from "react";
import { Card, Button } from "antd";

import parse from "html-react-parser";

const CompanyAboutUs = ({ title, description, bulletPoints, onSeeMore }) => {
  return (
    <Card
      className="aboutus-card"
      title={<span>{title}</span>}
      bordered={false}
    >
      <p> {parse(description ?? "")}</p>
      {/* <ul>
        {bulletPoints.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
      <Button type="link" onClick={onSeeMore}>
        Xem thêm <span style={{ fontSize: "14px" }}>▼</span>
      </Button>
    </Card>
  );
};

export default CompanyAboutUs;
