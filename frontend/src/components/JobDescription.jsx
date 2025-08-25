import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

function JobDescription() {
  const param = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?.id
    ) || false;
  const [isApplied, setisApplied] = useState(isInitiallyApplied);
  const jobId = param.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const response = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setisApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setisApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log("fetch Single Jobs error", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {singleJob?.position} position
            </Badge>
            <Badge variant="ghost" className="text-[#F83002] font-bold">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#7209b7] font-bold">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg w-full sm:w-auto ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium my-4 py-4">
        Job Description
      </h1>

      <div className="my-4 space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">
          Role:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold">
          Location:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold">
          Description:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold">
          Experience:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.experience}
          </span>
        </h1>
        <h1 className="font-bold">
          Salary:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.salary}
          </span>
        </h1>
        <h1 className="font-bold">
          Total Applicants:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold">
          Posted Date:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
