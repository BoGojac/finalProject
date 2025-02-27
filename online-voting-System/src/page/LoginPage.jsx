// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// export const Login = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({
//     username: "",
//     password: "",
//   });

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//     setErrors((prev) => ({ ...prev, [id]: "" }));
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { username: "", password: "" };

//     if (!formData.username || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
//       newErrors.username = "Please enter a valid email address.";
//       isValid = false;
//     }

//     if (!formData.password || formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long.";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log("Login attempt with:", formData);
//       // Add login logic here (e.g., API call)

//       // Redirect to dashboard (temporary implementation)
//       window.location.href = "/dashboard";
//     }
//   };

//   return (
//     <Dialog>
//       {/* Trigger Button */}
//       <DialogTrigger asChild>
//         <button className="bg-[#6B4AA0] hover:bg-[#5a3b91] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
//           Login
//         </button>
//       </DialogTrigger>

//       {/* Dialog Content */}
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Login</DialogTitle>
//           <DialogDescription>
//             Enter your credentials to access your account
//           </DialogDescription>
//         </DialogHeader>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//           {/* Email Field */}
//           <div className="space-y-2">
//             <label htmlFor="username" className="text-sm font-medium">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               placeholder="Enter your username"
//               value={formData.username}
//               onChange={handleInputChange}
//               aria-label="text"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] ${
//                 errors.username ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.username && (
//               <p className="text-sm text-red-500">{errors.username}</p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="space-y-2">
//             <label htmlFor="password" className="text-sm font-medium">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleInputChange}
//               aria-label="Password"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.password && (
//               <p className="text-sm text-red-500">{errors.password}</p>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex justify-between items-center">
//             <button
//               type="button"
//               className="text-sm text-[#6B4AA0] hover:text-[#5a3b91] p-0"
//             >
//               Forgot password?
//             </button>
//             <button
//               type="submit"
//               className="bg-[#6B4AA0] hover:bg-[#5a3b91] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
//             >
//               Log In
//             </button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Login


import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!formData.username || formData.username.trim() === "") {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Login attempt with:", formData);
      // Add login logic here (e.g., API call)

      // Redirect to dashboard (temporary implementation)
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#455883] to-[#00B5A5]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <a
              href="#forgot-password"
              className="text-sm text-[#6B4AA0] hover:text-[#5a3b91]"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6B4AA0] hover:bg-[#5a3b91] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;