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
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f8ff] to-[#eaf0ff]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Your Company Name
          </h1>
          <p className="text-gray-500 mt-1">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>

        <div className="mb-8">
          <Label className="text-gray-700 font-medium">Company Name</Label>
          <Input
            type="text"
            className="my-2 bg-white shadow-sm border border-gray-300 focus-visible:ring-[#6A38C2]"
            placeholder="JobHunt, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 border-gray-300 hover:bg-gray-100 transition"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#0072E0] text-white px-6 py-2 hover:scale-105 transition"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
