import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const capitalizeWord = (word = "") =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Applied Jobs
      </h2>

      {allAppliedJobs.length <= 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          You haven’t applied to any job yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-sm text-gray-500 mb-2">
              Track Your Applications
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-gray-700">Date</TableHead>
                <TableHead className="text-gray-700">Job Role</TableHead>
                <TableHead className="text-gray-700">Company</TableHead>
                <TableHead className="text-right text-gray-700">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppliedJobs.map((appliedJob) => (
                <TableRow
                  key={appliedJob._id}
                  className="hover:bg-blue-50 transition-all duration-150"
                >
                  <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="font-medium text-gray-800">
                    {appliedJob.job?.title}
                  </TableCell>
                  <TableCell>{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appliedJob?.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : appliedJob?.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {capitalizeWord(appliedJob.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AppliedJobTable;
