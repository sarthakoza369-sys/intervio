import React,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials, setCredentials] = useState({email:"", pssword: ""});
    let navigate = useNavigate();

const handleSubmit = async (e)=>{

    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();

    if (response.ok){
        localStorage.setItem('token', json.authToken);
        navigate('/home');
    }
    else{
        alert("Invalid Credentials!!");
        return false;
    }
};

const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
    
  return (
   <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-center items-center relative overflow-hidden font-sans px-4">
      
      {/* Matching Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Card Container */}
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative z-10">
        
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-xs text-slate-500 hover:text-indigo-400 transition-colors mb-6 group"
        >
          <svg className="w-4 h-4 mr-1.5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-2">
            Welcome back
          </h2>
          <p className="text-sm text-slate-400">
            Enter your credentials to access your interview simulator.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email" 
                value={credentials.email}
                id="email"
                name="email"
                onChange={onChange}
                placeholder="name@company.com" 
                className="w-full h-12 bg-slate-950/60 border border-slate-800 rounded-xl px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <input 
                type="password" 
                value={credentials.password}
                id="password"
                name="password"
                placeholder="••••••••" 
                className="w-full h-12 bg-slate-950/60 border border-slate-800 rounded-xl px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="group relative w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-medium tracking-wide flex items-center justify-center transition-all duration-300 hover:opacity-95 shadow-lg shadow-indigo-500/25 active:scale-[0.99] mt-2"
          >
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            Sign In
          </button>

        </form>

        {/* Redirect Footer Link */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-400 font-medium hover:underline">
            Create an account
          </Link>
        </div>

      </div>
      
    </div>
  );
}

export default Login
