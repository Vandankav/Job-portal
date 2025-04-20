import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import logo from "./logo_main.png"; // updated logo

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/jobs", label: "Jobs" },
    { path: "/browse", label: "Browse" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="JobGenie Logo" className="h-14 w-auto" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Job<span className="text-[#0072E0]">Genie</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-10">
          <ul className="flex items-center gap-8 text-gray-700 font-medium text-[16px]">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    className="hover:text-[#0072E0] transition"
                    to="/admin/companies"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-[#0072E0] transition"
                    to="/admin/jobs"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              navItems.map((item) => (
                <li key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`transition-all duration-200 ${
                      location.pathname === item.path
                        ? "text-black font-semibold"
                        : "hover:text-[#0072E0]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#0072E0] transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left ${
                      location.pathname === item.path ? "scale-x-100" : ""
                    }`}
                  />
                </li>
              ))
            )}
          </ul>

          {/* Auth Buttons or Avatar */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/signup">
                <Button className="bg-[#0072E0] text-white font-medium rounded-md px-5 py-2 hover:bg-[#005bb5] transition duration-200 shadow-sm">
                  Login
                </Button>
              </Link>
              {/* <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-[#005bb5] transition duration-200 rounded-lg text-white px-5">
                  Sign Up
                </Button>
              </Link> */}
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-1 ring-gray-300 hover:ring-[#0072E0] transition">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 shadow-lg border border-gray-200 rounded-xl p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {user?.fullname?.charAt(0).toUpperCase() +
                          user?.fullname?.slice(1)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-sm text-gray-700">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 hover:text-[#0072E0] transition"
                      >
                        <User2 size={18} />
                        View Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
