import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_FETCH_URL ? `${process.env.REACT_APP_FETCH_URL}signin` : "http://localhost:5000/signin";
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(url, { email: email, password });
      if (response.status === 200) {
        const { token } = response.data;        
        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('_id', response.data.user._id);
          navigate('/home', { state: { userData: response.data, token } });
        } else {
          setError("Token not received");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("An error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setForgotLoading(true);
    try {
      navigate('/forgot')
    } catch (error) {
      setError('An error occurred during password reset.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden grid md:grid-cols-2 z-10 transform transition-all duration-500 ease-out hover:shadow-blue-500/20 animate-fade-in-up">
        
        {/* Left Side: Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Enter your credentials to access your personalized dashboard.
            </p>
          </div>

          <form className="space-y-6" autoComplete="off">
            {/* Fake hidden inputs to trick Chrome autofill */}
            <input type="text" style={{display: 'none'}} />
            <input type="password" style={{display: 'none'}} />

            <div className="group">
              <label className="text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 block group-focus-within:text-blue-600 transition-colors">Email Address</label>
              <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="user_email_field_nocache"
                  id="user_email_field_nocache"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 text-gray-800 border-2 border-transparent focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300 outline-none shadow-inner"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="group">
              <label className="text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 block group-focus-within:text-blue-600 transition-colors">Password</label>
              <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="user_password_field_nocache"
                  id="user_password_field_nocache"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 text-gray-800 border-2 border-transparent focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-300 outline-none shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center space-x-2 animate-pulse">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="button"
              onClick={login}
              disabled={loading}
              className="w-full py-4 px-6 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : "Sign In to Account"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={forgotLoading}
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium relative group"
              >
                {forgotLoading ? "Please wait..." : "Forgot your password?"}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Image/Visual */}
        <div className="hidden md:block relative order-1 md:order-2">
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
          <img 
            src="https://readymadeui.com/login-image.webp" 
            className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[3s]" 
            alt="Login Visual" 
          />
          <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
            <h3 className="text-2xl font-bold mb-2">Secure & Seamless</h3>
            <p className="text-blue-100 text-sm opacity-90">Experience the next generation of account management.</p>
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Index;
