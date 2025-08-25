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
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isHaveResume = true;

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-lg sm:text-xl">{user?.fullname}</h1>
              <p className="text-gray-600 text-sm sm:text-base">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="self-end sm:self-auto"
            variant="outline"
          >
            <Pen className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        <div className="my-5 space-y-3">
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <Contact className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="font-semibold text-base sm:text-lg">Skills</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills.map((items, index) => (
                <Badge key={index} className="text-sm sm:text-base">
                  {items}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">Skills Not Applicable</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isHaveResume ? (
            <a
              className="text-blue-600 text-sm sm:text-base hover:underline cursor-pointer break-words"
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalname}
            </a>
          ) : (
            <span className="text-gray-500 text-sm">Resume Not Applicable</span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-4 sm:p-6">
        <h1 className="font-bold text-lg sm:text-xl my-4 sm:my-5">All Applied Jobs</h1>
        <AppliedJobsTable />
      </div>

      <UpdateProfileDialouge open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
