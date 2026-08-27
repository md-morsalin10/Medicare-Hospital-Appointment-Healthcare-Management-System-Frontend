'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Activity, 
  DollarSign, 
  FileText, 
  Clock, 
  Star,
  Pill
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, delay, isCurrency = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {isCurrency && '$'}{value}
          </h3>
        </div>
        <div className="h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </motion.div>
  );
};

export default function PatientDashboardClient({
  bookingData,
  reviewsData,
  prescriptionsData,
  userData
}) {
  const safeBookings = Array.isArray(bookingData) ? bookingData : [];
  const safeReviews = Array.isArray(reviewsData) ? reviewsData : [];
  const safePrescriptions = Array.isArray(prescriptionsData) ? prescriptionsData : [];

  // Calculate Total Spent
  const totalSpent = useMemo(() => {
    return safeBookings
      .filter(b => b.paymentStatus === 'Paid')
      .reduce((acc, b) => acc + (b.doctorFee || 0), 0);
  }, [safeBookings]);

  // Active Prescriptions (simplified logic: created in last 30 days)
  const activePrescriptions = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return safePrescriptions.filter(p => new Date(p.createdAt) >= thirtyDaysAgo).length;
  }, [safePrescriptions]);

  // Upcoming Appointments
  const upcomingAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return safeBookings.filter(b => b.appointmentDate >= today && b.status !== 'Cancelled').length;
  }, [safeBookings]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Hello, {userData?.name || 'Patient'}
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Welcome to your health dashboard. Here is your recent activity.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Spent" 
          value={totalSpent} 
          icon={DollarSign} 
          delay={0.1} 
          isCurrency={true}
        />
        <StatCard 
          title="Upcoming Appointments" 
          value={upcomingAppointments} 
          icon={Calendar} 
          delay={0.2} 
        />
        <StatCard 
          title="Active Prescriptions" 
          value={activePrescriptions} 
          icon={FileText} 
          delay={0.3} 
        />
        <StatCard 
          title="Reviews Given" 
          value={safeReviews.length} 
          icon={Star} 
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Appointments</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px]">
            {safeBookings.length > 0 ? (
              safeBookings.slice().reverse().map((booking, i) => (
                <div 
                  key={booking._id || i}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={booking.doctorImage || 'https://cdn-icons-png.flaticon.com/512/9193/9193824.png'} 
                      alt={booking.doctorName || 'Doctor'}
                      className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{booking.doctorName || 'Doctor'}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {booking.appointmentDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {booking.appointmentTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">${booking.doctorFee || 0}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${booking.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {booking.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-10">
                No appointments booked yet.
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Prescriptions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Prescriptions</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px]">
            {safePrescriptions.length > 0 ? (
              safePrescriptions.slice().reverse().map((prescription, i) => (
                <div 
                  key={prescription._id || i}
                  className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{prescription.doctorName || 'Doctor'}</h4>
                      <p className="text-xs text-gray-500 mt-1">Diagnosis: {prescription.diagnosis || 'N/A'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Pill className="w-5 h-5" />
                    </div>
                  </div>
                  {prescription.medicines && prescription.medicines.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {prescription.medicines.map((med, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="font-medium text-gray-800 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            {med.name}
                          </span>
                          <span className="text-gray-500 text-xs">{med.dosage} - {med.frequency}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-10">
                No prescriptions received yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
