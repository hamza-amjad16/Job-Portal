import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup } from "./ui/radio-group";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-6 my-10 shadow-md"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>
          <div className="my-4">
            <Label className="my-2">Email</Label>
            <Input
              type="email"
              placeholder="e.g hamza@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-4">
            <Label className="my-2">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-4 mt-4">
            <RadioGroup className="flex items-center  w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-6">
              Login
            </Button>
          )}
          <span className="text-sm block text-center">
            Don't have an account?
            <Link to="/signup" className="text-blue-600">
              {" "}
              Register Account
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
