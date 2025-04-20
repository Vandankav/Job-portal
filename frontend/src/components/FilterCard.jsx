import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    key: "title",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    key: "salary",
    array: ["10LPA to 20LPA", "20LPA to 40LPA", "40LPA and above"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    location: "",
    title: "",
    salary: "",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(filters));
  }, [filters]);

  return (
    <div className="w-full bg-white py-3 px-7 rounded-md overflow-x-hidden">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-3" />
      {filterData.map((filter) => (
        <div key={filter.key} className="mb-5">
          <h1 className="font-bold text-lg">{filter.filterType}</h1>
          {filter.array.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 my-2">
              <input
                type="radio"
                name={filter.key}
                value={item}
                checked={filters[filter.key] === item}
                onChange={(e) => handleChange(filter.key, e.target.value)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
