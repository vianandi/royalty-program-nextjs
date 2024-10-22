"use client";

import { useState } from 'react';

export default function Transactions() {
  const [formData, setFormData] = useState({
    userId: '',
    tenantName: '',
    amount: '',
    transactionId: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Transaction created successfully:', result);
      // Add logic to display success message
    } else {
      console.error('Transaction creation failed:', result.message);
      // Add logic to display error message
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Submit Transaction</h1>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tenantName">
            Tenant Name
          </label>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="tenantName"
            name="tenantName"
            placeholder="Enter tenant name"
            value={formData.tenantName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionId">
            Transaction ID
          </label>
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="transactionId"
            name="transactionId"
            placeholder="Enter transaction ID"
            value={formData.transactionId}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}