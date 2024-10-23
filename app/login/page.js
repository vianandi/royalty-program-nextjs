"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result.ok) {
      router.push('/dashboard');
    } else {
      console.error('Login failed:', result.error);
      // Add logic to display error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="backdrop-filter backdrop-blur-lg rounded-[15px] p-8 bg-white bg-opacity-30 shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2C3E50]">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-3 border rounded-lg text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-3 border rounded-lg text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#1ABC9C] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#3498DB] transition duration-300 ease-in-out w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-white mt-6">
          Dont have an account? <a href="/register" className="text-[#65ebfd] hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}