import React, { createContext, useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';
import { Gig } from '../constants/sampleData';

export interface UserProfile {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  department: string;
  year?: string;
  avatar?: string;
  rating?: number;
  skills?: string[];
  gigsCompleted?: number;
  gigsPosted?: number;
}

export interface SkillSwapContextType {
  user: UserProfile | null;
  token: string | null;
  selectedGig: Gig | null;
  isLoadingSession: boolean;
  setSelectedGig: (gig: Gig | null) => void;
  login: (userData: UserProfile, sessionToken: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const DEFAULT_USER: UserProfile = {
  id: 'u_default',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu',
  department: 'MCA Computer Applications',
  year: '2nd Year',
  avatar: 'AS',
  rating: 4.9,
  skills: ['React Native', 'Node.js', 'UI/UX Design', 'MongoDB'],
  gigsCompleted: 14,
  gigsPosted: 3,
};

const SkillSwapContext = createContext<SkillSwapContextType | undefined>(undefined);

export const SkillSwapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [token, setToken] = useState<string | null>(null);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await storage.getToken();
        const storedUser = await storage.getUser();
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        } else {
          // Initialize with default demonstrative MCA user if none saved
          setUser(DEFAULT_USER);
        }
      } catch (e) {
        console.warn('Session load error', e);
      } finally {
        setIsLoadingSession(false);
      }
    };
    loadSession();
  }, []);

  const login = async (userData: UserProfile, sessionToken: string) => {
    setUser(userData);
    setToken(sessionToken);
    await storage.setUser(userData);
    await storage.setToken(sessionToken);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setSelectedGig(null);
    await storage.clearSession();
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    await storage.setUser(updated);
  };

  return (
    <SkillSwapContext.Provider
      value={{
        user,
        token,
        selectedGig,
        isLoadingSession,
        setSelectedGig,
        login,
        logout,
        updateUserProfile,
      }}>
      {children}
    </SkillSwapContext.Provider>
  );
};

export const useSkillSwap = () => {
  const context = useContext(SkillSwapContext);
  if (!context) {
    throw new Error('useSkillSwap must be used within a SkillSwapProvider');
  }
  return context;
};

export default SkillSwapContext;
