import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function LatestJobs() {
  useGetAllJobs();
  const { alljobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
        <span className="text-[#3858c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {alljobs && alljobs.length > 0 ? (
          alljobs
            .slice(0, 3)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <span className="text-gray-500">Loading jobs or No Job Available</span>
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
