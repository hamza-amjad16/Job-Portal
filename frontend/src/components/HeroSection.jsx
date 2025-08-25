import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#3858c2]">Dream Jobs</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Discover your next opportunity with ease. Our job portal connects talented professionals with top employers across various industries. Start your career journey today!
        </p>

        <div className="flex w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full px-2 text-sm sm:text-base"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#3858c2] px-4 py-2"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
