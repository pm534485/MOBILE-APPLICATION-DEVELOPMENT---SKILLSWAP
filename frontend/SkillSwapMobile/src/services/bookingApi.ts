import apiClient, { fetchApi } from './api';

export interface Booking {
  _id?: string;
  id?: string;
  gig: any;
  user: any;
  status: 'pending' | 'active' | 'completed';
  createdAt?: string;
}

export const bookingApi = {
  // POST /api/bookings
  async createBooking(gigId: string, userId: string): Promise<Booking> {
    const response = await apiClient.post('/bookings', { gigId, userId });
    return response.data;
  },

  // GET /api/bookings/user/:userId - demonstrate fetchApi
  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      return await fetchApi<Booking[]>(`/bookings/user/${userId}`);
    } catch {
      return [];
    }
  },

  // PUT /api/bookings/:id
  async updateBookingStatus(id: string, status: string): Promise<Booking> {
    const response = await apiClient.put(`/bookings/${id}`, { status });
    return response.data;
  },

  // DELETE /api/bookings/:id
  async deleteBooking(id: string): Promise<void> {
    await apiClient.delete(`/bookings/${id}`);
  },
};

export default bookingApi;
