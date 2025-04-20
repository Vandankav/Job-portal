import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const capitalizeWord = (word = "") =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>List of applicants for this job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium text-gray-800">
                {capitalizeWord(item?.applicant?.fullname)}
              </TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 hover:underline"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-400">NA</span>
                )}
              </TableCell>
              <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                {item?.status === "Accepted" ? (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-green-100 text-green-700">
                    Accepted
                  </span>
                ) : item?.status === "Rejected" ? (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-red-100 text-red-700">
                    Rejected
                  </span>
                ) : (
                  <Popover>
                    <PopoverTrigger className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5 text-gray-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 px-2 py-2">
                      {shortlistingStatus.map((status, idx) => (
                        <div
                          key={idx}
                          onClick={() => statusHandler(status, item?._id)}
                          className="px-2 py-1 text-sm rounded hover:bg-gray-100 cursor-pointer"
                        >
                          {capitalizeWord(status)}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
