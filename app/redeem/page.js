"use client";

import { useState } from 'react';

export default function Redeem() {
  const [formData, setFormData] = useState({
    userId: '',
    voucherCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Voucher redeemed successfully:', result);
      // Add logic to display success message
    } else {
      console.error('Voucher redemption failed:', result.message);
      // Add logic to display error message
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Redeem Voucher</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
            User ID
          </label>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="userId"
            name="userId"
            placeholder="Enter your user ID"
            value={formData.userId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="voucherCode">
            Voucher Code
          </label>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="voucherCode"
            name="voucherCode"
            placeholder="Enter voucher code"
            value={formData.voucherCode}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full"
          type="submit"
        >
          Redeem
        </button>
      </form>
    </div>
  );
}