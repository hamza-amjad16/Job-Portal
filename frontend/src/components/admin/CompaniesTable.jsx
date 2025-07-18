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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";

function CompaniesTable() {
  const { componies } = useSelector((store) => store.compony);
  console.log("All Componies",componies);
  
  return (
    <div>
      <Table>
        <TableCaption>List of Your recent Registred Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            componies?.map((compony) => (
               <tr key={compony._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src="https://tse1.mm.bing.net/th/id/OIP.36fCycmxr3gzbABn5gmJjgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                        alt="Company Logo"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{compony.name}</TableCell>
                  <TableCell>{compony.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 ">
                        <div className="flex items-center gap-2 cursor-pointer w-fit">
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
               </tr>
              ))
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
