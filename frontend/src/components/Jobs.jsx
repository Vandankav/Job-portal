import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    const { location, title, salary } = searchedQuery || {};
    const filteredJobs = allJobs.filter((job) => {
      const matchLocation = !location || job.location === location;
      const matchTitle = !title || job.title === title;
      const matchSalary =
        !salary ||
        (salary === "10LPA to 20LPA" && job.salary >= 10 && job.salary <= 20) ||
        (salary === "20LPA to 40LPA" && job.salary > 20 && job.salary <= 40) ||
        (salary === "40LPA and above" && job.salary > 40);

      return matchLocation && matchTitle && matchSalary;
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="overflow-x-hidden">
      {" "}
      {/* hide horizontal scrollbar */}
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 pb-10">
        {" "}
        {/* added bottom padding */}
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 min-h-[88vh] mr-5">
              {" "}
              {/* increased bottom padding */}
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
