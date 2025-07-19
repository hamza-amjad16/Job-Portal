import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import {setSingleCompony} from "@/redux/componySlice"

function CreateCompany() {
    const [CompanyName , setCompanyName] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registerNewCompany = async() => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {CompanyName}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if(res?.data?.success){
                dispatch(setSingleCompony(res.data.compony))
                toast.success(res.data.message)
                const companyId = res?.data?.compony?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log("Register New Company Error" , error);
            
        }
    }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto ">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Compony Name</h1>
          <p className="text-gray-500 ">
            What could you like to give your company name? you can change this
            later
          </p>
        </div>
        <Label>Compony Name</Label>
        <Input
          type="text"
          className="my-3"
          placeholder=" e.g JobHunt, Microsoft"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button onClick={() => navigate("/admin/companies")} variant="outline">Cancel</Button>
          <Button onClick={registerNewCompany} className="bg-[#3858c2] hover:bg-[#3858c2bd]">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
