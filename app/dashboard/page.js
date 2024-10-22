'use client';  // needed for client-side components

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Transactions from '../transaction/page';

export default function Dashboard() {
  const { data: session } = useSession();
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    if (session) {
      const fetchVouchers = async () => {
        try {
          const response = await fetch(`/api/vouchers?userId=${session.user.id}`);
          const data = await response.json();
          console.log('Fetched vouchers:', data); // Debugging log
          setVouchers(data);
        } catch (error) {
          console.error('Error fetching vouchers:', error);
        }
      };

      fetchVouchers();
    }
  }, [session]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 my-voucher">
      <h1 className="text-3xl font-bold mb-4">My Vouchers</h1>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {vouchers.length > 0 ? (
          vouchers.map((voucher, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <p className="font-bold">Code: {voucher.code}</p>
              <p>Amount: {voucher.amount} IDR</p>
              <p>Expiry Date: {new Date(voucher.expiresAt).toLocaleDateString()}</p>
              <p>Status: <span className={voucher.isRedeemed ? 'text-red-500' : 'text-green-500'}>{voucher.isRedeemed ? 'Redeemed' : 'Unused'}</span></p>
            </div>
          ))
        ) : (
          <p>No vouchers available.</p>
        )}
      </div>

      <Transactions />
    </div>
  );
}