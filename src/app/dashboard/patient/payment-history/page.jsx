import PaymentHistoryList from '@/components/Dashboard/paitent/PaymentHistoryList';
import { getBookingDataByPatientId } from '@/lib/api/bookingData';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';


const PaymentHistory = async () => {
    const user = await getUserSeason();
    const bookingData = await getBookingDataByPatientId({ patientId: user?.id });

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        Payment History
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Review your past transaction records, invoice details, and consultation fees.
                    </p>
                </div>

                {/* Payment History List Component */}
                <PaymentHistoryList payments={bookingData || []} />
            </div>
        </div>
    );
};

export default PaymentHistory;