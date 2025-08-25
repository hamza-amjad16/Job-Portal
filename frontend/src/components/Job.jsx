import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return days === 0 ? "Today" : `${days} days ago`;
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt)}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={job?.companyId?.logo} />
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          {job?.position} position
        </Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-[#7209b7] font-bold">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#7109b7c0] w-full sm:w-auto">
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
