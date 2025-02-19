import React, { useState } from "react";
import { Eye, EyeClosed, Key, Mail, MessageCircle } from "lucide-react";
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


function LoginPage() {
  const navigate = useNavigate();
  const { isLoggingIn, setLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate Form
  const validate = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoggingIn(true); // Start loading
      try {
        const response = await axiosInstance.post("/auth/login", formData);
        console.log("Login Successful:", response.data);        
        navigate("/");
      } catch (error) {
        console.error("Login Error:", error);        
      } finally {
        setLoggingIn(false); // Stop loading                
      }
    }
  };

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-4rem)]">
      {/* Left side */}
      <div className="h-full w-full flex justify-center items-center flex-col space-y-2">
        <MessageCircle size={64} className=" mx-2 p-3 bg-black/20 rounded-md" />
        <h1 className="font-semibold text-[2rem]">Chatty</h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-2">
          {/* Email */}
          <label className="input input-bordered flex items-center gap-2 min-w-[20rem]">
            <Mail />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="grow"
              placeholder="Email"
            />
          </label>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2 min-w-[20rem]">
            <Key />
            <input
              type={isPasswordHidden ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="grow"
              placeholder="Password"
            />
            {isPasswordHidden ? (
              <EyeClosed onClick={() => setIsPasswordHidden(false)} className="cursor-pointer" />
            ) : (
              <Eye onClick={() => setIsPasswordHidden(true)} className="cursor-pointer" />
            )}
          </label>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-active btn-primary min-w-[20rem]"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Right side */}
      <div className="h-full w-full flex justify-center items-center flex-col space-y-2">
        <div className="grid grid-rows-3 grid-cols-3 gap-2">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`h-32 w-32 bg-black/50 rounded-md ${index % 2 === 0 ? "animate-pulse" : ""}`}
            ></div>
          ))}
        </div>
        <h2 className="text-[1.2rem] my-4 uppercase tracking-wide font-semibold">
          Welcome Back to Chatty!
        </h2>
      </div>
    </div>
  );
}

export default LoginPage;
