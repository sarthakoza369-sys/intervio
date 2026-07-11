import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });
  
  let navigate = useNavigate();

  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // NOTE: Swap this URL out for your actual local / production intervio endpoint later!
      const response = await fetch("https://intervio-gba4.onrender.com/api/auth/createUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', json.authToken);
        showAlert("Account created successfully", "success");
        navigate('/home');
      } else {
        alert(json.error || "Something went wrong on the server.");
        return;
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      alert("Could not connect to the server.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-center items-center relative overflow-hidden font-sans px-4">
      
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Glassmorphic Signup Box Container */}
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative z-10 my-8">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-2">
            Create an Account
          </h2>
          <p className="text-sm text-slate-400">
            Join Intervio to start realistic AI interview mock panels.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={credentials.name} 
              onChange={onChange}
              placeholder="John Doe"
              className="w-full h-11 bg-slate-950/60 border border-slate-800 rounded-xl px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={credentials.email} 
              onChange={onChange}
              placeholder="name@company.com"
              className="w-full h-11 bg-slate-950/60 border border-slate-800 rounded-xl px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={credentials.password} 
              onChange={onChange}
              placeholder="••••••••"
              minLength={5}
              className="w-full h-11 bg-slate-950/60 border border-slate-800 rounded-xl px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="cpassword" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <input 
              type="password" 
              name="cpassword" 
              id="cpassword" 
              value={credentials.cpassword} 
              onChange={onChange}
              placeholder="••••••••"
              minLength={5}
              className="w-full h-11 bg-slate-950/60 border border-slate-800 rounded-xl px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
              required
            />
          </div>

          {/* Fancy Submit Button */}
          <button 
            type="submit" 
            className="group relative w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-medium tracking-wide flex items-center justify-center transition-all duration-300 hover:opacity-95 shadow-lg shadow-indigo-500/25 active:scale-[0.99] pt-1"
          >
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            Get Started
          </button>

        </form>

        {/* Back Link Option */}
        <div className="mt-6 pt-5 border-t border-slate-800/60 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 font-medium hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;