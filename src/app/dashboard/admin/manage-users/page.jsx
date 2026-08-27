import { getAllUsers } from '@/lib/api/users';
import React from 'react';
import ManageUsersClient from './components/ManageUsersClient';

const ManageUsers = async () => {
   const allUsers = await getAllUsers();
   
   return (
       <ManageUsersClient initialUsers={allUsers} />
   );
};

export default ManageUsers;