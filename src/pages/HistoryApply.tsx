import { Modal, Table, Tabs } from "antd";
import { isMobile } from "react-device-detect";
import type { TabsProps } from "antd";
import { IResume } from "../types/backend";
import { useState, useEffect } from "react";
import { callFetchResumeByUser } from "../config/api";
import type { ColumnsType } from "antd/es/table";
import Header from "../components/Header";
import dayjs from "dayjs";
import Footer from "../components/Footer";

const HistoryApply = () => {
  const [listCV, setListCV] = useState<IResume[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      setIsFetching(true);
      const res = await callFetchResumeByUser();
      if (res && res.data) {
        setListCV(res.data.result as IResume[]);
      }
      setIsFetching(false);
    };
    init();
  }, []);

  const columns: ColumnsType<IResume> = [
    {
      title: "STT",
      key: "index",
      width: 50,
      align: "center",
      render: (text, record, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Công Ty",
      dataIndex: "companyName",
    },
    {
      title: "Tên công việc",
      dataIndex: ["job", "name"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Ngày rải CV",
      dataIndex: "createdAt",
      render(value, record, index) {
        return <>{dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss")}</>;
      },
    },
    {
      title: "",
      dataIndex: "",
      render(value, record, index) {
        return (
          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/storage/resume/${
              record?.url
            }`}
            target="_blank"
          >
            Chi tiết
          </a>
        );
      },
    },
  ];
  return (
    <div className="">
      <Header />
      <div className="main-content">
        <div className="text-3xl text-[#1C9EAF]  text-center mb-4 font-medium  ">
          Lịch sử ứng tuyển
        </div>
        <Table<IResume>
          columns={columns}
          dataSource={listCV}
          loading={isFetching}
          pagination={false}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HistoryApply;
