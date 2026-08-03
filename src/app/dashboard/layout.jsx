import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <aside>
                <DashboardSidebar />
            </aside>
            <div>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;