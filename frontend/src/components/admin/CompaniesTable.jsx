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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const { componies, searchComponyByText } = useSelector((store) => store.compony);
  const [filterCompany, setFilterCompany] = useState(componies)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany = componies.length >= 0 && componies.filter((company) => {
      if(!searchComponyByText){
        return true
      }

      return company?.name.toLowerCase().includes(searchComponyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  },[componies, searchComponyByText])
  
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
            filterCompany?.map((compony) => (
               <tr key={compony._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={compony.logo}
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
                        <div onClick={() => navigate(`/admin/companies/${compony._id}`)} className="flex items-center gap-2 cursor-pointer w-fit">
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
