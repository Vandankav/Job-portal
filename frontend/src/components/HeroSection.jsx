import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center font-inter bg-gradient-to-b from-white via-[#f5f8ff] to-[#eaf0ff] py-20 px-4">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <span className="mx-auto px-5 py-2 rounded-full bg-[#E6F0FA] text-[#0072E0] text-sm font-semibold tracking-wide shadow-sm">
          🔥 Your Gateway to Career Success
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-800">
          Search, Apply & <br /> Land Your{" "}
          <span className="text-[#0072E0]">Dream Job</span> Today
        </h1>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Discover top job opportunities tailored for you. Whether you're a
          fresher or an expert, JobGenie brings the best roles to your
          fingertips.
        </p>

        <div className="flex w-full sm:w-[70%] md:w-[60%] shadow-lg border border-gray-300 pl-5 pr-2 py-1.5 rounded-full items-center gap-3 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find jobs by title, company, or skill..."
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full px-4 py-2 bg-[#0072E0] hover:bg-[#005bb5] transition text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
