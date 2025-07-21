import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const { allAdminJobs, searchTextByJob } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchTextByJob) {
          return true;
        }

        return (
          job?.title.toLowerCase().includes(searchTextByJob.toLowerCase()) ||
          job?.compony?.name
            .toLowerCase()
            .includes(searchTextByJob.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchTextByJob]);

  return (
    <div>
      <Table>
        <TableCaption>List of Your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Roll</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr key={job._id}>
              <TableCell>{job?.compony?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 ">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
