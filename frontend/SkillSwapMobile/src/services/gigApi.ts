import apiClient, { fetchApi } from './api';
import { SAMPLE_GIGS, Gig } from '../constants/sampleData';

export const gigApi = {
  // GET /api/gigs - returns list of gigs, falls back to SAMPLE_GIGS if backend offline
  async getGigs(category?: string): Promise<{ data: Gig[]; fromServer: boolean }> {
    try {
      const url = category && category !== 'All'
        ? `/gigs?category=${encodeURIComponent(category)}`
        : '/gigs';
      const response = await apiClient.get(url);
      if (Array.isArray(response.data) && response.data.length > 0) {
        return { data: response.data, fromServer: true };
      }
      return { data: response.data || SAMPLE_GIGS, fromServer: true };
    } catch (error) {
      console.warn('API error fetching gigs, using academic sample fallback:', error);
      let filtered = SAMPLE_GIGS;
      if (category && category !== 'All') {
        filtered = SAMPLE_GIGS.filter(
          (g) => g.category.toLowerCase() === category.toLowerCase()
        );
      }
      return { data: filtered, fromServer: false };
    }
  },

  // GET /api/gigs/:id - demonstrate using native Fetch API
  async getGigById(id: string): Promise<Gig> {
    try {
      return await fetchApi<Gig>(`/gigs/${id}`);
    } catch {
      const found = SAMPLE_GIGS.find((g) => g.id === id || (g as any)._id === id);
      if (found) return found;
      return SAMPLE_GIGS[0];
    }
  },

  // POST /api/gigs
  async createGig(gigData: Partial<Gig>): Promise<Gig> {
    const response = await apiClient.post('/gigs', gigData);
    return response.data;
  },

  // PUT /api/gigs/:id
  async updateGig(id: string, updates: Partial<Gig>): Promise<Gig> {
    const response = await apiClient.put(`/gigs/${id}`, updates);
    return response.data;
  },

  // DELETE /api/gigs/:id
  async deleteGig(id: string): Promise<void> {
    await apiClient.delete(`/gigs/${id}`);
  },
};

export default gigApi;
