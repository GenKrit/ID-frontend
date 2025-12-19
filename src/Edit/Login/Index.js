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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 h-full">
          
          {/* Form Section */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sign in to your account and explore a world of possibilities. Your journey begins here.
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="text-gray-900 text-sm font-semibold mb-2 block">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-gray-900 text-sm font-semibold mb-2 block">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                  <p>{error}</p>
                </div>
              )}

              <button
                type="button"
                onClick={login}
                disabled={loading}
                className="w-full py-3 px-4 text-sm font-semibold tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : "Log In"}
              </button>

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={forgotLoading}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {forgotLoading ? "Processing..." : "Forgot Password?"}
                </button>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block relative bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent z-10"></div>
            <img 
              src="https://readymadeui.com/login-image.webp" 
              className="absolute inset-0 w-full h-full object-cover opacity-90" 
              alt="Login visual" 
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Index;
