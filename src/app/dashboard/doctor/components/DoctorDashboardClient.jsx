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
import { Users, Calendar, Star, TrendingUp, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
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
  prescriptionsData
}) {
  const safeSchedules = Array.isArray(schedulesData) ? schedulesData : [];
  const safeReviews = Array.isArray(reviewsData) ? reviewsData : [];
  const safePrescriptions = Array.isArray(prescriptionsData) ? prescriptionsData : [];

  // Get total unique patients from prescriptions
  const totalPatients = useMemo(() => {
    const patientIds = new Set();
    safePrescriptions.forEach(p => {
      if (p.patientId) patientIds.add(p.patientId);
    });
    return patientIds.size;
  }, [safePrescriptions]);

  // Today's appointments (using prescriptions as proxy for completed appointments or schedules for available ones)
  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    // Check schedules available today or prescriptions created today
    const todayPrescriptions = safePrescriptions.filter(p => p.appointmentDate === today).length;
    return todayPrescriptions; // Or however you define a today's appointment from your dynamic data
  }, [safePrescriptions]);

  // Average Rating
  const averageRating = useMemo(() => {
    if (!safeReviews.length) return "0.0";
    const sum = safeReviews.reduce((acc, rev) => acc + (rev.rating || 0), 0);
    return (sum / safeReviews.length).toFixed(1);
  }, [safeReviews]);

  // Chart Data: Patients per day based on prescriptions/appointments
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

    safePrescriptions.forEach(p => {
      if (p.appointmentDate && dateCounts[p.appointmentDate] !== undefined) {
        dateCounts[p.appointmentDate]++;
      }
    });

    return last7Days.map(day => ({
      name: day.name,
      patients: dateCounts[day.date]
    }));
  }, [safePrescriptions]);

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
          title="Total Patients" 
          value={totalPatients} 
          icon={Users} 
          delay={0.1} 
        />
        <StatCard 
          title="Today's Activity" 
          value={todayAppointments} 
          icon={Calendar} 
          delay={0.2} 
        />
        <StatCard 
          title="Reviews Received" 
          value={safeReviews.length} 
          icon={Star} 
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

        {/* Recent Reviews Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col max-h-[440px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Reviews</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {safeReviews.length > 0 ? (
              safeReviews.slice().reverse().map((review, i) => (
                <motion.div 
                  key={review._id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (i * 0.1) }}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img 
                      src={review.patientImage || 'https://cdn-icons-png.flaticon.com/512/9193/9193824.png'} 
                      alt={review.patientName || 'Patient'}
                      className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{review.patientName || 'Anonymous'}</h4>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3 h-3 ${idx < (review.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    "{review.reviewText}"
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-10">
                No reviews received yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
