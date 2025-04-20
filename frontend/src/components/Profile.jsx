import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Format full name with capital initials
  const formattedName = user?.fullname
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-5">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-md space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-2">
              <AvatarImage
                src={user?.profile?.profilePhoto || ""}
                alt={formattedName}
              />
              <AvatarFallback>
                {formattedName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {formattedName}
              </h1>
              <p className="text-sm text-gray-600">
                {user?.profile?.bio || "No bio added."}
              </p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-blue-500" />
            <span>{user?.email}</span>
            {/* </div>
          <div className="flex items-center gap-3"> */}
            <Contact className="text-blue-500" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800 cursor-default"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">No skills listed.</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Resume</h2>
          {isResume && user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm text-gray-500">No resume uploaded.</span>
          )}
        </div>
      </div>
      {/* Applied Jobs Section */}
      {/* <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-5">
        <h2 className="font-bold text-lg mb-4">Applied Jobs</h2> */}
      <AppliedJobTable />
      {/* </div> */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
