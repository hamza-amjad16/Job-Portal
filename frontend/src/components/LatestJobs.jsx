import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function LatestJobs() {
  useGetAllJobs()
  const {alljobs} = useSelector((store) => store.job)
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold ">
        {" "}
        <span className="text-[#3858c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
      {
        alljobs.length <= 0 ? <span>No Job Avalaible</span> 
        : alljobs.slice(0,6).map((job) => <LatestJobCards  key={job._id} job={job} />)
      }
      </div>
    </div>
  );
}

export default LatestJobs;
