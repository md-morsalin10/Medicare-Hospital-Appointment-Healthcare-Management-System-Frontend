'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Ban, ShieldCheck, UserCog, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { suspendUser, deleteUser } from '@/lib/api/users';

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);

  const handleSuspendToggle = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      // Optimistic update
      setUsers(users.map(u => 
        (u.id === userId || u._id === userId) ? { ...u, isSuspended: newStatus } : u
      ));
      
      const res = await suspendUser(userId, newStatus);
      if (res.success) {
        toast.success(newStatus ? 'User suspended successfully' : 'User unsuspend successfully');
      } else {
        toast.error(res.message || 'Failed to update user status');
        // Revert on failure
        setUsers(users.map(u => 
          (u.id === userId || u._id === userId) ? { ...u, isSuspended: currentStatus } : u
        ));
      }
    } catch (error) {
      toast.error('An error occurred while updating status');
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to completely delete this user? This action cannot be undone.")) {
      return;
    }
    
    try {
      const res = await deleteUser(userId);
      if (res.success) {
        setUsers(users.filter(u => u.id !== userId && u._id !== userId));
        toast.success('User deleted successfully');
      } else {
        toast.error(res.message || 'Failed to delete user');
      }
    } catch (error) {
      toast.error('An error occurred while deleting user');
      console.error(error);
    }
  };

  return (
    <div className="p-6 md:p-10 font-sans min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <UserCog className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Manage Users
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              View, suspend, or delete users from your platform.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">User Details</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Role</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => {
                  const id = user.id || user._id;
                  const isSuspended = user.isSuspended || false;
                  
                  return (
                    <motion.tr 
                      key={id || i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                            {user.image ? (
                              <img src={user.image} alt="User" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{user.name || 'Unknown User'}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                          {user.role || 'Patient'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isSuspended ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            <Ban className="w-3 h-3" /> Suspended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            <ShieldCheck className="w-3 h-3" /> Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSuspendToggle(id, isSuspended)}
                            className={`p-2 rounded-xl border transition-colors ${
                              isSuspended 
                                ? 'border-emerald-200 text-emerald-600 hover:bg-emerald-50' 
                                : 'border-amber-200 text-amber-600 hover:bg-amber-50'
                            }`}
                            title={isSuspended ? 'Unsuspend User' : 'Suspend User'}
                          >
                            {isSuspended ? <ShieldCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                          </button>
                          
                          <button
                            onClick={() => handleDelete(id)}
                            className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
