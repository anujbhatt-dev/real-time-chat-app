import React, { useState } from "react";
import { Eye, EyeClosed, Key, Mail, MessageCircle, Text } from "lucide-react";
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


function SignupPage() {
  const navigate = useNavigate();
  const { isSigningUp, setSigningUp } = useAuthStore();
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate Form
  const validate = () => {
    let newErrors = { fullname: "", email: "", password: "" };
    let isValid = true;

    if (formData.fullname.trim().length < 3) {
      newErrors.fullname = "Full name must be at least 3 characters";
      isValid = false;
    }

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
      setSigningUp(true); // Start loading
      try {
        await axiosInstance.post("/auth/signup", formData);        
        navigate("/");
      } catch (error) {
        console.error("Signup Error:", error);        
      } finally {
        setSigningUp(false); // Stop loading
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
          {/* Fullname */}
          <label className="input input-bordered flex items-center gap-2 min-w-[20rem]">
            <Text />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="grow"
              placeholder="Fullname"
            />
          </label>
          {errors.fullname && <p className="text-red-600 text-sm min-w-[20rem]">* {errors.fullname}</p>}

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
          {errors.email && <p className="text-red-600 text-sm min-w-[20rem]">* {errors.email}</p>}

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
          {errors.password && <p className="text-red-600 text-sm min-w-[20rem]">* {errors.password}</p>}

          {/* Signup Button */}
          <button
            type="submit"
            className="btn btn-active btn-primary min-w-[20rem]"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>

      {/* Right side */}
      <div className="h-full w-full flex justify-center items-center flex-col space-y-2">
        <div className="grid grid-rows-3 grid-cols-3 gap-2">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`h-32 w-32 bg-black/50 rounded-md ${
                index % 2 === 0 ? "animate-pulse" : ""
              }`}
            ></div>
          ))}
        </div>
        <h2 className="text-[1.2rem] my-4  uppercase tracking-wide font-semibold">
          Welcome to our community of Brilliant Devs
        </h2>
      </div>
    </div>
  );
}

export default SignupPage;
