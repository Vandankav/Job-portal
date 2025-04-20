import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f8ff] to-[#eaf0ff]">
      <Navbar />
      <div className="flex justify-center py-10 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md border border-gray-200"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Post Job</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Description", name: "description", type: "text" },
              { label: "Requirements", name: "requirements", type: "text" },
              { label: "Salary", name: "salary", type: "text" },
              { label: "Location", name: "location", type: "text" },
              { label: "Job Type", name: "jobType", type: "text" },
              { label: "Experience Level", name: "experience", type: "text" },
              { label: "No. of Positions", name: "position", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <Label>{field.label}</Label>
                <Input
                  name={field.name}
                  type={field.type}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-1 focus-visible:ring-blue-500 mt-1"
                />
              </div>
            ))}

            {companies.length > 0 && (
              <div className="md:col-span-2">
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Post Job"
            )}
          </Button>

          {companies.length === 0 && (
            <p className="text-sm text-red-600 font-medium text-center mt-4">
              * Please register a company before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
