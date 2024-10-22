"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

export default function Transactions() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    userId: '',
    tenantName: '',
    amount: '',
    transactionId: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchTenantName = async () => {
        try {
          const response = await fetch(`/api/auth/user?userId=${session.user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setFormData({
            ...formData,
            userId: session.user.id,
            tenantName: data.name,
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching tenant name:', error);
        }
      };

      fetchTenantName();
    }
  }, [session, status]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(formData.amount) <= 1000000) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Amount must be more than 1,000,000',
      });
      return;
    }

    try {
      const response = await fetch('/api/auth/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Transaction Created',
          text: 'Transaction created successfully',
        });
        console.log('Transaction created successfully:', result);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Transaction Failed',
          text: result.message,
        });
        console.error('Transaction creation failed:', result.message);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: error.message,
      });
      console.error('An error occurred:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#000000]">Submit Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="w-full p-3 border rounded-lg text-[#000000] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-3 border rounded-lg text-[#000000] focus:outline-none focus:ring-2 focus:ring-blue-500"
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