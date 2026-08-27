'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Users, Calendar, Star, Activity, DollarSign, CreditCard } from 'lucide-react';

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
        <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </motion.div>
  );
};

export default function DoctorDashboardClient({
  doctorData,
  schedulesData,
  reviewsData,
  prescriptionsData,
  bookingData
}) {
  const safeSchedules = Array.isArray(schedulesData) ? schedulesData : [];
  const safeReviews = Array.isArray(reviewsData) ? reviewsData : [];
  const safePrescriptions = Array.isArray(prescriptionsData) ? prescriptionsData : [];
  const safeBookings = Array.isArray(bookingData) ? bookingData : [];

  // Get total unique patients from bookings
  const totalPatients = useMemo(() => {
    const patientIds = new Set();
    safeBookings.forEach(b => {
      if (b.patientId) patientIds.add(b.patientId);
    });
    return patientIds.size;
  }, [safeBookings]);

  // Today's appointments (using bookings)
  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = safeBookings.filter(b => b.appointmentDate === today).length;
    return todayBookings;
  }, [safeBookings]);

  // Average Rating
  const averageRating = useMemo(() => {
    if (!safeReviews.length) return "0.0";
    const sum = safeReviews.reduce((acc, rev) => acc + (rev.rating || 0), 0);
    return (sum / safeReviews.length).toFixed(1);
  }, [safeReviews]);

  // Total Earnings from Paid Bookings
  const totalEarnings = useMemo(() => {
    return safeBookings
      .filter(b => b.paymentStatus === 'Paid')
      .reduce((acc, b) => acc + (b.doctorFee || 0), 0);
  }, [safeBookings]);

  // Chart Data: Patients per day based on bookings
  const chartData = useMemo(() => {
    const dateCounts = {};
    
    // Process last 7 days dynamically
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      last7Days.push({ date: dateString, name: dayName });
      dateCounts[dateString] = 0;
    }

    safeBookings.forEach(b => {
      if (b.appointmentDate && dateCounts[b.appointmentDate] !== undefined) {
        dateCounts[b.appointmentDate]++;
      }
    });

    return last7Days.map(day => ({
      name: day.name,
      patients: dateCounts[day.date]
    }));
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
          Welcome back, {doctorData?.name || doctorData?.doctorName || 'Doctor'}
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Here is your dynamic dashboard overview based on your latest records.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Earnings" 
          value={totalEarnings} 
          icon={DollarSign} 
          delay={0.1} 
          isCurrency={true}
        />
        <StatCard 
          title="Total Patients" 
          value={totalPatients} 
          icon={Users} 
          delay={0.2} 
        />
        <StatCard 
          title="Today's Activity" 
          value={todayAppointments} 
          icon={Calendar} 
          delay={0.3} 
        />
        <StatCard 
          title="Avg. Rating" 
          value={averageRating} 
          icon={Activity} 
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Patient Flow Overview (Last 7 Days)</h3>
          <div className="h-[350px] w-full">
            {chartData.some(d => d.patients > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                  <Bar dataKey="patients" fill="#3b82f6" radius={[6, 6, 6, 6]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No patient data available for the last 7 days.
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Transactions / Bookings Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col max-h-[440px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Payments</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {safeBookings.length > 0 ? (
              safeBookings.filter(b => b.paymentStatus === 'Paid').slice().reverse().map((booking, i) => (
                <motion.div 
                  key={booking._id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (i * 0.1) }}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{booking.patientName || 'Patient'}</h4>
                      <p className="text-xs text-gray-500">{booking.appointmentDate} | {booking.appointmentTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">+${booking.doctorFee || 0}</p>
                    <p className="text-xs text-emerald-500 font-medium">Paid</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-10">
                No payment data received yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
