import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortListedStatus = ["Accepted", "Rejected"];
function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of applied users in your job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((application) => (
              <TableRow key={application._id}>
                <TableCell className="whitespace-nowrap">
                  {application?.applicant?.fullname}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {application?.applicant?.email}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {application?.applicant?.phoneNumber}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {application?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer hover:underline"
                      href={application?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {application?.applicant?.profile?.resumeOriginalname}
                    </a>
                  ) : (
                    <span>Not uploaded resume</span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {application?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListedStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, application?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
