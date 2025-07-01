import React, { useState } from "react";
import { Col, Modal, Row, Upload, message, Spin } from "antd";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProForm } from "@ant-design/pro-components";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ReviewCVModal = (props) => {
  const {
    isReviewCVModalOpen,
    setIsReviewCVModalOpen,
    jobDetail,
    onReviewSuccess,
  } = props;
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const navigate = useNavigate();
  // Lưu file gốc sau khi upload
  const [fileCV, setFileCV] = useState(null);
  // Lưu kết quả phân tích CV
  const [analysisResult, setAnalysisResult] = useState(null);
  // State để quản lý loading trong quá trình gọi API
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Tùy chỉnh request upload để lưu file vào state fileCV
  const propsUpload = {
    maxCount: 1,
    multiple: false,
    accept: "application/pdf,application/msword, .doc, .docx, .pdf",
    async customRequest({ file, onSuccess }) {
      setFileCV(file);
      if (onSuccess) onSuccess("ok");
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} upload thành công`);
      } else if (info.file.status === "error") {
        message.error("Có lỗi khi upload file.");
      }
    },
  };

  const handleAnalyzeCV = async () => {
    if (!fileCV) {
      message.error("Vui lòng upload CV!");
      return;
    }
    // Tạo FormData để đóng gói file cv và mô tả công việc
    const formData = new FormData();
    formData.append("file", fileCV);
    formData.append("job_description", jobDetail?.description || "");

    setIsAnalyzing(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/analyze-cv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Debug: in các key, value có trong formData
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      console.log("Phân tích CV:", response.data);
      message.success("Phân tích CV thành công!");
      // Lưu kết quả phân tích để hiển thị ra ngoài
      setAnalysisResult(response.data);
    } catch (error) {
      console.error("Error analyzing CV:", error);
      message.error("Có lỗi xảy ra khi phân tích CV.");
    }
    setIsAnalyzing(false);
  };

  const handleOkButton = async () => {
    if (!isAuthenticated) {
      setIsReviewCVModalOpen(false);
      navigate(`/signin?callback=${window.location.href}`);
    } else {
      await handleAnalyzeCV();
      if (onReviewSuccess) onReviewSuccess();
      setIsReviewCVModalOpen(false);
    }
  };

  return (
    <Modal
      width={800}
      open={isReviewCVModalOpen}
      onCancel={() => setIsReviewCVModalOpen(false)}
      cancelButtonProps={{ style: { display: "none" } }}
      okText={isAuthenticated ? "Review CV" : "Đăng Nhập Nhanh"}
      onOk={handleOkButton}
      destroyOnClose={true}
    >
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <div>
            <h5>
              Bạn đang Review CV công việc <b>{jobDetail?.name} </b> tại{" "}
              <b>{jobDetail?.company?.name}</b>
            </h5>
          </div>
        </Col>
        <Col span={24}>
          <ProForm.Item
            label={"Upload file CV"}
            rules={[{ required: true, message: "Vui lòng upload file!" }]}
          >
            <Upload {...propsUpload}>
              <Button icon={<UploadOutlined />}>
                Tải lên CV của bạn (Hỗ trợ *.doc, *.docx, *.pdf, dưới 5MB)
              </Button>
            </Upload>
          </ProForm.Item>
        </Col>
        <Col span={24}>
          {isAnalyzing ? (
            <div style={{ textAlign: "center" }}>
              <Spin tip="Đang phân tích CV..." />
            </div>
          ) : (
            analysisResult && (
              <div>
                <h4>Kết quả phân tích CV:</h4>
                {analysisResult.analysis
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      style={{ marginBottom: "1rem", lineHeight: 1.6 }}
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            )
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default ReviewCVModal;
