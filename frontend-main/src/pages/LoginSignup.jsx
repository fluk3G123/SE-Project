import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/signup';
    const payload = { email, password };
    
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          navigate(data.redirect);
        } else {
          alert('Signup successful! Please log in.');
          setIsLogin(true);
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FEEDED]">
      <div className="flex max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 p-14 flex items-center justify-center bg-[#b24e50e1]">
          <h1 className="text-5xl font-bold text-gray-800 leading-snug">
            Welcome to<br />
            <span className="text-white">Academic Career Tracker</span>
          </h1>
        </div>
        <div className="w-1/2 p-14">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            {isLogin ? 'Please Sign in to continue' : 'Create an Account'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-gray-700 mb-3">E-mail</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b24e50]" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-3">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b24e50]" 
                required 
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-3">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm your password" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b24e50]" 
                  required 
                />
              </div>
            )}
            <button type="submit" className="w-full bg-[#b24e50e1] text-white p-4 rounded-lg hover:bg-[#aa6263] transition cursor-pointer">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-8">
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
            <span 
              className="text-[#b24e50] font-medium cursor-pointer ml-2" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
