'use client';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cellphone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration failed:', errorText);
        return;
      }

      const result = await response.json();
      console.log('User registered successfully:', result);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="backdrop-filter backdrop-blur-lg rounded-[15px] p-8 bg-white bg-opacity-30 shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2C3E50]">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-3 border rounded-lg text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cellphone">
              Cellphone
            </label>
            <input
              className="w-full p-3 border rounded-lg text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="cellphone"
              name="cellphone"
              placeholder="Enter your cellphone number"
              value={formData.cellphone}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#1ABC9C] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#3498DB] transition duration-300 ease-in-out w-full"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-white mt-6">
          Already have an account? <a href="/login" className="text-[#65ebfd] hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
