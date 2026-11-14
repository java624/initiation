import { useCallback } from 'react';
import { useSessionStore } from '@/store';
import { authApi } from '../services/auth.api';
import { SignInInput, SignUpInput } from '../schemas/auth.schema';
import { UserRole } from '../types';

export const useAuth = () => {
  const {
    user,
    accessToken,
    isInitialized,
    isSubmitting,
    isAuthenticated,
    setSession,
    setRole,
    clearSession,
    setInitialized,
    setSubmitting,
  } = useSessionStore();

  const restoreSession = useCallback(async () => {
    try {
      const { user: restoredUser, token } = await authApi.getCurrentSession();
      if (restoredUser && token) {
        setSession(restoredUser, token);
      } else {
        clearSession();
      }
    } catch {
      clearSession();
    } finally {
      setInitialized(true);
    }
  }, [setSession, clearSession, setInitialized]);

  const signIn = useCallback(
    async (input: SignInInput) => {
      setSubmitting(true);
      try {
        const { user: signedInUser, token } = await authApi.signIn(input);
        setSession(signedInUser, token);
        return signedInUser;
      } finally {
        setSubmitting(false);
      }
    },
    [setSession, setSubmitting],
  );

  const signUp = useCallback(
    async (input: SignUpInput) => {
      setSubmitting(true);
      try {
        const { user: signedUpUser, token } = await authApi.signUp(input);
        if (token) {
          setSession(signedUpUser, token);
        }
        return signedUpUser;
      } finally {
        setSubmitting(false);
      }
    },
    [setSession, setSubmitting],
  );

  const demoLogin = useCallback(
    (role: UserRole) => {
      setSubmitting(true);
      try {
        const { user: demoUser, token } = authApi.demoLogin(role);
        setSession(demoUser, token);
        return demoUser;
      } finally {
        setSubmitting(false);
      }
    },
    [setSession, setSubmitting],
  );

  const switchRole = useCallback(
    (role: UserRole) => {
      setRole(role);
    },
    [setRole],
  );

  const signOut = useCallback(async () => {
    try {
      await authApi.signOut();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  return {
    user,
    accessToken,
    isInitialized,
    isSubmitting,
    isLoading: !isInitialized || isSubmitting,
    isAuthenticated,
    signIn,
    signUp,
    demoLogin,
    switchRole,
    signOut,
    restoreSession,
  };
};
