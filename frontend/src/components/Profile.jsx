import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialouge from "./UpdateProfileDialouge";
import { useSelector } from "react-redux";

const isHaveResume = true;

function Profile() {
  const [open , setOpen] = useState(false)
  const {user} = useSelector((store) => store.auth)

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
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
              {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2">
            {user?.profile?.skills != 0 ? (
              user?.profile?.skills.map((items, index) => <Badge key={index}>{items}</Badge>)
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
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalname}
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
      <UpdateProfileDialouge open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
