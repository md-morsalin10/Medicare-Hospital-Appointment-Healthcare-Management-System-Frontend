import TransactionsTable from '@/components/Dashboard/admin/TransactionsTable';
import { getBookingData } from '@/lib/api/bookingData';
import React from 'react';


const AllTransactions = async () => {
    const allTransactions = await getBookingData();

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Title */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        Transaction History
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Track and audit all payments processed through Stripe for patient bookings.
                    </p>
                </div>

                {/* Transactions Table Component */}
                <TransactionsTable initialTransactions={allTransactions || []} />

            </div>
        </div>
    );
};

export default AllTransactions;