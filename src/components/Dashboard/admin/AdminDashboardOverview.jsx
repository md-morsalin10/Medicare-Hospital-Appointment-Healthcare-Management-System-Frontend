'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CalendarCheck,
  Stethoscope,
  Wallet,
  ReceiptText,
  TrendingUp,
  Star,
  Activity,
  UserCheck,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Tooltip for Revenue Area Chart
const PremiumRevenueTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="bg-slate-950/90 backdrop-blur-xl border border-emerald-500/30 p-4 rounded-2xl shadow-2xl text-white min-w-[170px] transition-all transform -translate-y-2">
        <div className="flex items-center justify-between gap-3 mb-2 border-b border-slate-800/80 pb-2">
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
            {label} REVENUE
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-white tracking-tight">
            ${Number(val).toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold">USD</span>
        </div>
      </div>
    );
  }
  return null;
};

// Tooltip for Doctor Performance Bar Chart
const PremiumDoctorTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/90 backdrop-blur-xl border border-indigo-500/30 p-3.5 rounded-2xl shadow-2xl text-white min-w-[160px]">
        <p className="text-xs font-bold text-slate-300 mb-2 truncate max-w-[180px]">
          {data.doctorName}
        </p>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Score</span>
            <p className="text-base font-black text-white">
              {data.averageRating} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Tooltip for User Distribution Pie Chart
const UserDistributionTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-700/80 p-3 rounded-xl shadow-xl text-white text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.payload.color }} />
          <span className="font-semibold text-slate-300">{data.name}:</span>
          <span className="font-black text-white">{data.value.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

const AdminDashboardOverview = ({
  totalPatients = 0,
  totalDoctors = 0,
  totalAppointments = 0,
  totalUsers = 0,
  totalRevenue = 0,
  totalTransactions = 0,
  doctorPerformance = [],
  revenueChartData = [],
  revenueGrowth = 0,
}) => {
  // Pie Chart Data for User Demographics
  const userData = useMemo(() => [
    { name: 'Patients', value: totalPatients, color: '#6366f1' },
    { name: 'Doctors', value: totalDoctors, color: '#10b981' },
  ], [totalPatients, totalDoctors]);

  // Percentages Calculation
  const patientPercentage = totalUsers > 0 ? Math.round((totalPatients / totalUsers) * 100) : 0;
  const doctorPercentage = totalUsers > 0 ? Math.round((totalDoctors / totalUsers) * 100) : 0;

  const formattedRevenueData = useMemo(() => {
    if (!revenueChartData || revenueChartData.length === 0) return [];
    if (revenueChartData.length === 1) {
      return [
        { month: 'Start', revenue: 0 },
        revenueChartData[0]
      ];
    }
    return revenueChartData;
  }, [revenueChartData]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 p-2 sm:p-4 pb-12"
    >
      {/* Hero Banner */}
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Activity className="w-3.5 h-3.5" /> Admin Control Center
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Dashboard Overview</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Monitor real-time system metrics, doctor ratings, revenue growth, and transactions.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-lg min-w-[240px]">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Total Revenue</p>
              <h2 className="text-2xl font-black text-white">${totalRevenue?.toLocaleString()}</h2>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Cards Section with Equal Height Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

        {/* 1. Total Users + Donut Chart Highlight Card */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                User Demographics
              </span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                {totalUsers.toLocaleString()} <span className="text-xs font-semibold text-slate-400">Total Users</span>
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 my-2">
            <div className="w-28 h-28 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<UserDistributionTooltip />} />
                  <Pie
                    data={userData}
                    innerRadius={28}
                    outerRadius={42}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {userData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400">Ratio</span>
              </div>
            </div>

            <div className="flex-1 space-y-2.5 pl-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="font-semibold text-slate-600">Patients</span>
                </div>
                <span className="font-bold text-slate-900">{totalPatients.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-600">Doctors</span>
                </div>
                <span className="font-bold text-slate-900">{totalDoctors.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other 4 Cards (Enhanced to Fill Height) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Card 2: Total Patients */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Patients</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{totalPatients.toLocaleString()}</h3>
                <p className="text-xs font-semibold text-indigo-600">Unique Bookers</p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Added: Mini Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-medium text-slate-500">
                <span>Share of Users</span>
                <span className="font-bold text-indigo-600">{patientPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${patientPercentage}%` }} />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Total Doctors */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Doctors</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{totalDoctors.toLocaleString()}</h3>
                <p className="text-xs font-semibold text-emerald-600">Verified Staff</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>

            {/* Added: Mini Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-medium text-slate-500">
                <span>Active Ratio</span>
                <span className="font-bold text-emerald-600">{doctorPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${doctorPercentage}%` }} />
              </div>
            </div>
          </motion.div>

          {/* Card 4: Appointments */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Appointments</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{totalAppointments.toLocaleString()}</h3>
                <p className="text-xs font-semibold text-amber-600">Total Bookings</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>

            {/* Added: Activity Badge */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">Status</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                <Clock className="w-3 h-3" /> Active Flow
              </span>
            </div>
          </motion.div>

          {/* Card 5: Transactions */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Transactions</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{totalTransactions.toLocaleString()}</h3>
                <p className="text-xs font-semibold text-violet-600 flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Successful
                </p>
              </div>
              <div className="p-3 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 group-hover:scale-110 transition-transform">
                <ReceiptText className="w-5 h-5" />
              </div>
            </div>

            {/* Added: Success Rate Indicator */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">System Rate</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <CheckCircle2 className="w-3 h-3" /> 100% Success
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* REVENUE AREA CHART */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Revenue Trajectory</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Monthly earnings progression</p>
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${revenueGrowth >= 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-200/60' : 'bg-red-50 text-red-600 border-red-200/60'}`}>
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}% growth</span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedRevenueData} margin={{ top: 20, right: 25, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="emeraldVibeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                    <stop offset="50%" stopColor="#10b981" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>

                  <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                  tickFormatter={(val) => `$${val}`}
                />

                <Tooltip content={<PremiumRevenueTooltip />} />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#emeraldVibeGradient)"
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  activeDot={{
                    r: 8,
                    fill: '#10b981',
                    stroke: '#ffffff',
                    strokeWidth: 4,
                    filter: 'url(#glowEffect)',
                  }}
                  dot={{
                    r: 5,
                    fill: '#10b981',
                    stroke: '#ffffff',
                    strokeWidth: 2.5,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* DOCTOR PERFORMANCE BAR CHART */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Doctor Performance</h3>
              <p className="text-xs text-slate-500">Average rating score (Max 5.0)</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-3 py-1.5 rounded-full">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Top Rated</span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorPerformance} margin={{ top: 15, right: 10, left: -20, bottom: 25 }}>
                <defs>
                  <linearGradient id="doctorBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="doctorName"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  angle={-25}
                  textAnchor="end"
                  dy={12}
                  tickFormatter={(name) => {
                    const cleanName = name.replace(/^Dr\.?\s+/i, '');
                    return cleanName.length > 9 ? `${cleanName.substring(0, 9)}...` : cleanName;
                  }}
                />
                <YAxis axisLine={false} tickLine={false} domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<PremiumDoctorTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.6)', radius: 10 }} />
                <Bar
                  dataKey="averageRating"
                  radius={[10, 10, 0, 0]}
                  barSize={28}
                  isAnimationActive={true}
                  animationDuration={1400}
                  animationEasing="ease-out"
                >
                  {doctorPerformance?.map((_, index) => (
                    <Cell key={`cell-${index}`} fill="url(#doctorBarGradient)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default AdminDashboardOverview;