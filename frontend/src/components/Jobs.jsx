import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";


function Jobs() {
  useGetAllJobs()
  const {alljobs} = useSelector((store) => store.job)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {alljobs.length < 0 ? (
            <span>Job not Found</span>
          ) : (
            <div className="flex-1 h-[88vh]  pb-5">
              <div className="grid grid-cols-3 gap-4 ">
                {
                alljobs.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Jobs;
