import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job() {
  const navigate = useNavigate()
  const jobId = "ascsdadaadsa"
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
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
          <h1 className="font-medium text-lg">Compony Name</h1>
          <p className="text-sm text-gray-500">Pakistan</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit . Quas sequi,
          ipsa alias velit at officiis non voluptates officia culpa dignissimos.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          12 positions{" "}
        </Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">
          part-time{" "}
        </Badge>
        <Badge variant="ghost" className="text-[#7209b7] font-bold">
          24LPA{" "}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${jobId}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7] hover:bg-[#7109b7c0]">Save For Later</Button>
      </div>
    </div>
    
  );
}

export default Job;
