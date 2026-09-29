import apiClient from './api';
import { UserProfile } from '../context/SkillSwapContext';

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export const authApi = {
  // POST /api/auth/login
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch {
      // Academic simulated fallback session
      const simulatedToken = `sim_jwt_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      const simulatedUser: UserProfile = {
        id: `u_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        department: 'MCA Computer Applications',
        year: '2nd Year',
        avatar: email.substring(0, 2).toUpperCase(),
        rating: 5.0,
        skills: ['React Native', 'Mobile UI', 'Campus Freelancing'],
        gigsCompleted: 5,
        gigsPosted: 1,
      };
      return { token: simulatedToken, user: simulatedUser };
    }
  },

  // POST /api/auth/register
  async register(data: {
    name: string;
    email: string;
    password: string;
    department: string;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch {
      // Academic simulated fallback session
      const simulatedToken = `sim_jwt_${Date.now()}_reg_${Math.random().toString(36).substring(2)}`;
      const simulatedUser: UserProfile = {
        id: `u_${Date.now()}`,
        name: data.name,
        email: data.email,
        department: data.department,
        year: '1st Year',
        avatar: data.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        rating: 5.0,
        skills: ['New Freelancer'],
        gigsCompleted: 0,
        gigsPosted: 0,
      };
      return { token: simulatedToken, user: simulatedUser };
    }
  },

  // GET /api/profiles/:id
  async getProfile(id: string): Promise<UserProfile> {
    const response = await apiClient.get(`/profiles/${id}`);
    return response.data;
  },

  // PUT /api/profiles/:id
  async updateProfile(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put(`/profiles/${id}`, updates);
    return response.data;
  },
};

export default authApi;
