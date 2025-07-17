import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppSelector } from "../redux/hooks";
import { fetchJobFollowed } from "../config/api";
import CardJob from "../components/card/CardJob";
import CardJobFollow from "../components/card/CardJobFollow";

const JobFollow = () => {
  const [displayJob, setDisplayJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  useEffect(() => {
    fetchFollowedJobs();
  }, [user]);

  const fetchFollowedJobs = async () => {
    try {
      const res = await fetchJobFollowed(user.id);
      console.log(res);
      if (res && res.data) {
        setDisplayJob(res.data);
        console.log("Followed Jobs:", res.data.data);
      } else {
        setDisplayJob([]);
      }
    } catch (error) {
      console.error("Error fetching followed jobs:", error);
    }
  };

  return (
    <div className="job-follow-page">
      <Header /> {/* Bỏ comment dòng này */}
      <main className="job-follow-content">
        <div className="page-header-placeholder">
          <h4 className="text-2xl font-semibold text-center pt-2 mt-10 text-white">
            Danh sách công việc đã lưu
          </h4>
          <nav className="text-center text-white mt-2">
            Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
            ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
          </nav>
        </div>
        <div className="">
          <CardJobFollow
            displayJob={displayJob}
            userId={user.id}
            onUnfollow={(jobId) => {
              setDisplayJob(displayJob.filter((job) => job.id !== jobId));
            }}
          />
        </div>
      </main>
      <Footer /> {/* Bỏ comment dòng này */}
    </div>
  );
};

export default JobFollow;
