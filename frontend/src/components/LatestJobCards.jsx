import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl shadow-sm hover:shadow-md transition-all bg-white border border-gray-200 cursor-pointer"
    >
      {/* Company Logo and Name */}
      <div className="flex items-center gap-3">
        <img
          src={job?.company?.logo}
          alt={job?.company?.name}
          className="w-10 h-10 object-contain rounded-md border"
        />
        <div>
          <h1 className="font-semibold text-lg text-[#1A1A1A]">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mt-4">
        <h2 className="font-bold text-xl mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-medium bg-blue-50">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-medium bg-red-50">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#6A38C2] font-medium bg-violet-50">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
