import React from "react";
import Header from "../components/Header";

const JobFollowPage = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  return (
    <>
      <Header />
      <div className="main-content">Việc làm đã lưu</div>
    </>
  );
};

export default JobFollowPage;
