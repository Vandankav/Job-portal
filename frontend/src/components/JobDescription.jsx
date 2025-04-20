import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-blue-700 font-semibold">
              {singleJob?.postion} Positions
            </Badge>
            <Badge variant="secondary" className="text-red-600 font-semibold">
              {singleJob?.jobType}
            </Badge>
            <Badge
              variant="secondary"
              className="text-purple-700 font-semibold"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-md px-6 py-2 text-white transition ${
            isApplied
              ? "bg-black text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Description Section */}
      <div className="mt-8 border-t pt-6 space-y-4 text-gray-800">
        <h2 className="text-xl font-semibold text-black">Job Description</h2>
        <p>
          <strong>Role:</strong>{" "}
          <span className="ml-2 text-gray-700">{singleJob?.title}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <span className="ml-2 text-gray-700">{singleJob?.location}</span>
        </p>
        <p>
          <strong>Description:</strong>{" "}
          <span className="ml-2 text-gray-700">{singleJob?.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          <span className="ml-2 text-gray-700">
            {singleJob?.experienceLevel} yrs
          </span>
        </p>
        <p>
          <strong>Salary:</strong>{" "}
          <span className="ml-2 text-gray-700">{singleJob?.salary} LPA</span>
        </p>
        <p>
          <strong>Total Applicants:</strong>{" "}
          <span className="ml-2 text-gray-700">
            {singleJob?.applications?.length || 0}
          </span>
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          <span className="ml-2 text-gray-700">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>

        {/* Requirements Section */}
        {singleJob?.requirements?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-black mb-2">
              Requirements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {singleJob.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
