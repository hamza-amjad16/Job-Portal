import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";

const skills = ["Html", "Css", "JavaScript"];

function Profile() {
  const isHaveResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://tse1.mm.bing.net/th/id/OIP.36fCycmxr3gzbABn5gmJjgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. In,
                fugiat.
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>hamza@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>+92 3336778564</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2">
            {skills.length != 0 ? (
              skills.map((items, index) => <Badge key={index}>{items}</Badge>)
            ) : (
              <span>Skills Not Applicable</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isHaveResume ? (
            <a
              className="text-blue-500 w-full hover:underline cursor-pointer"
              target="blank"
              href="https://youtube.com"
            >
              Resume.pdf
            </a>
          ) : (
            <span>Resume Not Applicable</span>
          )}
        </div>
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl ">
        <h1 className="font-bold text-lg my-5">All applied Jobs</h1>
        <AppliedJobsTable />
      </div>
    </div>
  );
}

export default Profile;
