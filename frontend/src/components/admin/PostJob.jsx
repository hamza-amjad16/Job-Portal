import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setAllAdminJobs } from "@/redux/jobSlice";


function PostJob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    componyId: "",
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {componies} = useSelector((store) => store.compony)
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const SelectChangeHandler = (value) => {
    const selectedCompany = componies.find((compony) => compony.name.toLowerCase() === value)
    setInput({...input, componyId: selectedCompany._id})
  }

  const submitHandler = async(e) => {
    e.preventDefault()
    console.log(input);
    try {
      setLoading(false)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      if(res.data.success){
        dispatch(setAllAdminJobs())
        toast.success(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }

  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Salary</Label>
            <Input
              type="number"
              name="salary"
              value={input.salary}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Experience (Years)</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Position</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={changeEventHandler}
            />
          </div>
        {
          componies.length > 0 && (
      <Select onValueChange={SelectChangeHandler} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            componies?.map((compony) => {
              return (
                <SelectItem value={compony?.name.toLowerCase()} key={compony._id}>{compony?.name}</SelectItem>
              )
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
          )
        }
        </div>
         {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}


        {
          componies.length === 0 && <p className="text-xs text-red-600 font-bold text-center my-3 ">*Please register company first before posting job</p>
        }
         </form>
      </div>
    </div>
  );
}

export default PostJob;
