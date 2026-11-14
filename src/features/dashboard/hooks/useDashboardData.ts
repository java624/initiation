import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/features/auth';
import {
  dashboardApi,
  StudentDashboardData,
  TeacherDashboardData,
  AdminDashboardData,
} from '../services/dashboard.api';

export const useDashboardData = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const role = user?.role ?? 'student';

  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [studentData, setStudentData] = useState<StudentDashboardData | null>(null);
  const [teacherData, setTeacherData] = useState<TeacherDashboardData | null>(null);
  const [adminData, setAdminData] = useState<AdminDashboardData | null>(null);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      if (role === 'teacher') {
        const data = await dashboardApi.getTeacherData(userId);
        setTeacherData(data);
      } else if (role === 'admin') {
        const data = await dashboardApi.getAdminData();
        setAdminData(data);
      } else {
        const data = await dashboardApi.getStudentData(userId);
        setStudentData(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, role]);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!userId) return;
      try {
        if (role === 'teacher') {
          const data = await dashboardApi.getTeacherData(userId);
          if (isMounted) setTeacherData(data);
        } else if (role === 'admin') {
          const data = await dashboardApi.getAdminData();
          if (isMounted) setAdminData(data);
        } else {
          const data = await dashboardApi.getStudentData(userId);
          if (isMounted) setStudentData(data);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [userId, role]);

  return {
    isLoading,
    studentData,
    teacherData,
    adminData,
    refetch: loadData,
  };
};
