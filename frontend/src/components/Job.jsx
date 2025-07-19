import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({job}) {
  const navigate = useNavigate()

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
     const days =  Math.floor(timeDifference / (1000 * 24 * 60 * 60))
     return days === 0 ? "Today" : `${days} days ago`
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
        {daysAgoFunction(job?.createdAt)}
          </p>
        <Button variant="outline" className="rounded-full " size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src="https://tse1.mm.bing.net/th/id/OIP.36fCycmxr3gzbABn5gmJjgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" />
          </Avatar>
        </Button>
        <div>
        <h1 className='font-medium text-lg'>{job?.compony?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
          <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
          <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
       <div className='flex items-center gap-2 mt-4'>
                  <Badge variant="ghost" className="text-blue-700 font-bold">{job?.position} </Badge>
                  <Badge variant="ghost" className="text-[#F83002] font-bold">{job?.jobType} </Badge>
                  <Badge variant="ghost" className="text-[#7209b7] font-bold">{job?.salary} </Badge>
              </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7] hover:bg-[#7109b7c0]">Save For Later</Button>
      </div>
    </div>
    
  );
}

export default Job;
