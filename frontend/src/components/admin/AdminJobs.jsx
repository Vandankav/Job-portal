import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f8ff] to-[#eaf0ff]">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <Input
            className="md:w-80 bg-white border-gray-300 focus-visible:ring-1 focus-visible:ring-blue-500"
            placeholder="Search job or role..."
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#0072E0] text-white hover:scale-105 transition shadow-sm"
          >
            New Job
          </Button>
        </div>

        {/* Jobs Table */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
