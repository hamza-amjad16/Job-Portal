import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

function Jobs() {
  useGetAllJobs();
  const { alljobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(alljobs);

  useEffect(() => {
    const query = searchedQuery?.toLowerCase().trim();

    if (!Array.isArray(alljobs) || alljobs.length === 0) {
      setFilterJobs([]);
      return;
    }

    if (!query) {
      setFilterJobs(alljobs);
      return;
    }

    const filtered = alljobs.filter((job) => {
      const title = job.title?.toLowerCase().trim() || "";
      const location = job.location?.toLowerCase().trim() || "";

      return title.includes(query) || location.includes(query);
    });

    setFilterJobs(filtered);
  }, [alljobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/4">
            <FilterCard />
          </div>
          {filterJobs.length === 0 ? (
            <div className="text-center text-lg text-gray-500 mt-10 w-full">
              No jobs available
            </div>
          ) : (
            <div className="flex-1 h-auto md:h-[88vh] pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
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
