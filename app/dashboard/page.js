'use client'; 

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Transactions from '../transaction/page';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [vouchers, setVouchers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchVouchers = async () => {
        try {
          const response = await fetch(`/api/auth/vouchers?userId=${session.user.id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch vouchers: ${response.statusText}`);
          }
          const data = await response.json();
          console.log('Fetched vouchers:', data); 
          setVouchers(data);
        } catch (error) {
          console.error('Error fetching vouchers:', error);
          setError(error.message);
        }
      };

      fetchVouchers();
    }
  }, [session, status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>You need to be authenticated to view this page.</p>;
  }

  return (
    <div className="p-6 my-voucher">
      <h1 className="text-3xl font-bold mb-4 text-[#ffffff]">My Vouchers</h1>
      <div className='flex items-start gap-5'>
        <div className="flex-1 max-w-[110vh]">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 mb-6">
              {vouchers.length > 0 ? (
                vouchers.map((voucher, index) => (
                  <div key={index} className="backdrop-filter backdrop-blur-lg rounded-[30px] p-4 shadow-sm bg-white bg-opacity-40">
                    <p className="font-bold">Code: {voucher.code}</p>
                    <p>Amount: {voucher.amount} IDR</p>
                    <p>Expires At: {new Date(voucher.expiresAt).toLocaleDateString()}</p>
                    <p>Status: <span className={voucher.isRedeemed ? 'text-red-500' : 'text-green-500'}>{voucher.isRedeemed ? 'Redeemed' : 'Unused'}</span></p>
                  </div>
                ))
              ) : (
                <p>No vouchers available.</p>
              )}
            </div>
          )}
        </div>
        <div className="flex-1">
          <Transactions />
        </div>
      </div>
    </div>
  );
}