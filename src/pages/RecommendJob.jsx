import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import Header from "../components/Header";
import { recommendJob } from "../config/api";
import JobCardRecommend from "../components/JobCardRecommend";

const RecommendJob = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  const [jobRecommend, setJobRecommend] = React.useState(null);
  useEffect(() => {
    fetchJobRecommend();
  }, []);
  const fetchJobRecommend = async () => {
    try {
      const response = await recommendJob();
      console.log("Recommended Jobs:", response.data.recommendations);
      setJobRecommend(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommended jobs:", error);
    }
  };

  return (
    <div>
      <Header />
      <JobCardRecommend jobs={jobRecommend} />
    </div>
  );
};

export default RecommendJob;
