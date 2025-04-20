import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[500px] rounded-xl border border-gray-200 shadow-md"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Update Profile
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={submitHandler}>
            <div className="space-y-4 py-4">
              {/* Each row uses flex with fixed-width label */}
              {[
                {
                  id: "name",
                  label: "Name:",
                  value: input.fullname,
                  type: "text",
                },
                {
                  id: "email",
                  label: "Email:",
                  value: input.email,
                  type: "email",
                },
                {
                  id: "number",
                  label: "Number:",
                  value: input.phoneNumber,
                  type: "text",
                },
                { id: "bio", label: "Bio:", value: input.bio, type: "text" },
                {
                  id: "skills",
                  label: "Skills:",
                  value: input.skills,
                  type: "text",
                },
              ].map(({ id, label, value, type }) => (
                <div key={id} className="flex items-center">
                  <Label
                    htmlFor={id}
                    className="w-24 text-sm font-medium text-gray-700"
                  >
                    {label}
                  </Label>
                  <Input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={changeEventHandler}
                    className="flex-1 bg-gray-50"
                  />
                </div>
              ))}

              {/* Resume upload */}
              <div className="flex items-center">
                <Label
                  htmlFor="file"
                  className="w-24 text-sm font-medium text-gray-700"
                >
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="flex-1 bg-gray-50"
                />
              </div>
            </div>

            {/* Footer Button */}
            <DialogFooter className="flex justify-center mt-4">
              {loading ? (
                <Button className="w-full max-w-xs">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full mr-12 max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
