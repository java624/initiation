import React from 'react';
import { useAuth } from '@/features/auth';
import { StudentHome } from '../StudentHome/StudentHome';
import { StaffDashboard } from '../StaffDashboard/StaffDashboard';
import { MainDashboardProps } from './MainDashboard.types';

export const MainDashboard = ({ onSignOut }: MainDashboardProps) => {
  const { user } = useAuth();
  const role = user?.role ?? 'student';

  if (role === 'student') {
    return <StudentHome onSignOut={onSignOut} />;
  }

  return <StaffDashboard onSignOut={onSignOut} />;
};