import { getBookingData } from '@/lib/api/bookingData';
import { getAllDoctorsProfile } from '@/lib/api/doctors';
import { getAllReviews } from '@/lib/api/reviews';
import { getAllUsers } from '@/lib/api/users';
import React from 'react';
import AdminDashboardOverview from '@/components/Dashboard/admin/AdminDashboardOverview';

const AdminPage = async () => {
    const [reviews, doctors, allTransactions, allUsers] = await Promise.all([
        getAllReviews(),
        getAllDoctorsProfile(),
        getBookingData(),
        getAllUsers(),
    ]);

    const totalUsers = allUsers.length || 0;
    const uniquePatients = new Set();
    let totalRevenue = 0;

    allTransactions.forEach((transaction) => {
        if (transaction.patientId) {
            uniquePatients.add(transaction.patientId);
        }
        if (transaction.paymentStatus === 'Paid' && transaction.doctorFee) {
            totalRevenue += Number(transaction.doctorFee);
        }
    });

    const totalPatients = uniquePatients.size;
    const totalDoctors = doctors.length;
    const totalAppointments = allTransactions.length;
    const totalTransactionsCount = allTransactions.filter(
        (t) => t.paymentStatus === 'Paid'
    ).length;

    // Doctor Performance calculation
    const doctorRatingsMap = {};
    reviews.forEach((review) => {
        if (!doctorRatingsMap[review.doctorId]) {
            doctorRatingsMap[review.doctorId] = {
                doctorName: review.doctorName,
                totalRating: 0,
                reviewCount: 0,
            };
        }
        doctorRatingsMap[review.doctorId].totalRating += review.rating;
        doctorRatingsMap[review.doctorId].reviewCount += 1;
    });

    const doctorPerformance = Object.values(doctorRatingsMap).map((doc) => ({
        doctorName: doc.doctorName,
        averageRating: parseFloat((doc.totalRating / doc.reviewCount).toFixed(1)),
    }));

    // Calculate Revenue Chart Data
    const monthlyRevenue = {};
    allTransactions.forEach((transaction) => {
        if (transaction.paymentStatus === 'Paid' && transaction.doctorFee && transaction.createdAt) {
            const date = new Date(transaction.createdAt);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;

            if (!monthlyRevenue[key]) {
                monthlyRevenue[key] = { month, year, revenue: 0, timestamp: date.getTime() };
            }
            monthlyRevenue[key].revenue += Number(transaction.doctorFee);
        }
    });

    let revenueChartData = Object.values(monthlyRevenue)
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(item => ({ month: item.month, revenue: item.revenue }));

    // If no data or less than 2 months, provide some fallback or handle it
    if (revenueChartData.length === 0) {
        revenueChartData = [{ month: 'Current', revenue: totalRevenue }];
    }

    // Revenue Growth logic
    let revenueGrowth = 0;
    if (revenueChartData.length >= 2) {
        const lastMonth = revenueChartData[revenueChartData.length - 1].revenue;
        const prevMonth = revenueChartData[revenueChartData.length - 2].revenue;
        if (prevMonth > 0) {
            revenueGrowth = ((lastMonth - prevMonth) / prevMonth) * 100;
        }
    }

    return (
        <AdminDashboardOverview
            totalPatients={totalPatients}
            totalDoctors={totalDoctors}
            totalAppointments={totalAppointments}
            totalUsers={totalUsers}
            totalRevenue={totalRevenue}
            totalTransactions={totalTransactionsCount}
            doctorPerformance={doctorPerformance}
            revenueChartData={revenueChartData}
            revenueGrowth={parseFloat(revenueGrowth.toFixed(1))}
        />
    );
};

export default AdminPage;