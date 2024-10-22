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
        // Add logic to display error message
        return;
      }
  
      const result = await response.json();
      console.log('User registered successfully:', result);
      // Add logic to redirect user or display success message
    } catch (error) {
      console.error('An error occurred:', error);
      // Add logic to display error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1F1F1F]">Register</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-[#1F1F1F]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-[#000000]"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-[#1F1F1F]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-[#000000]"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-[#1F1F1F]">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-[#000000]"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-[#1F1F1F]">Cellphone</label>
          <input
            type="text"
            name="cellphone"
            value={formData.cellphone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-[#000000]"
            placeholder="Enter your cellphone number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}