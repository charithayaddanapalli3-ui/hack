import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getCurrentUser: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
  requestPasswordReset: (email) =>
    apiClient.post('/auth/request-password-reset', { email }),
  resetPassword: (data) => apiClient.post('/auth/reset-password', data),
};

// Vendor APIs
export const vendorAPI = {
  getAll: (params) => apiClient.get('/vendors', { params }),
  getById: (id) => apiClient.get(`/vendors/${id}`),
  create: (data) => apiClient.post('/vendors', data),
  getMyProfile: () => apiClient.get('/vendors/me/profile'),
  update: (data) => apiClient.put('/vendors/profile', data),
  verify: (vendorId, status) =>
    apiClient.put(`/vendors/verify/${vendorId}`, { status }),
  getPending: () => apiClient.get('/vendors/pending'),
  updateTrustScore: (vendorId, score) =>
    apiClient.put(`/vendors/trust-score/${vendorId}`, { score }),
  addToGallery: (imageUrl) =>
    apiClient.post('/vendors/gallery', { imageUrl }),
};

// Search & Recommendations
export const searchAPI = {
  search: (data) => apiClient.post('/search/search', data),
  getRecommendations: (data) => apiClient.post('/search/recommendations', data),
  getTrending: (data) => apiClient.post('/search/trending', data),
  getCategories: (data) => apiClient.post('/search/categories', data),
};

// Review APIs
export const reviewAPI = {
  addReview: (data) => apiClient.post('/reviews', data),
  getVendorReviews: (vendorId, params) =>
    apiClient.get(`/reviews/vendor/${vendorId}`, { params }),
  getUserReviews: () => apiClient.get('/reviews/user/my-reviews'),
  updateReview: (reviewId, data) =>
    apiClient.put(`/reviews/${reviewId}`, data),
  deleteReview: (reviewId) => apiClient.delete(`/reviews/${reviewId}`),
  markHelpful: (reviewId) => apiClient.post(`/reviews/${reviewId}/helpful`),
  addVendorResponse: (reviewId, data) =>
    apiClient.post(`/reviews/${reviewId}/response`, data),
  flagReview: (reviewId, reason) =>
    apiClient.post(`/reviews/${reviewId}/flag`, { reason }),
};

// Booking APIs
export const bookingAPI = {
  create: (data) => apiClient.post('/bookings', data),
  getUserBookings: (params) =>
    apiClient.get('/bookings/user/my-bookings', { params }),
  getVendorBookings: (params) =>
    apiClient.get('/bookings/vendor/my-bookings', { params }),
  getDetails: (bookingId) => apiClient.get(`/bookings/${bookingId}`),
  updateStatus: (bookingId, status) =>
    apiClient.put(`/bookings/${bookingId}/status`, { status }),
  cancel: (bookingId, reason) =>
    apiClient.put(`/bookings/${bookingId}/cancel`, { reason }),
  addNotes: (bookingId, notes) =>
    apiClient.put(`/bookings/${bookingId}/notes`, { notes }),
};

// Complaint APIs
export const complaintAPI = {
  create: (data) => apiClient.post('/complaints', data),
  getUserComplaints: () => apiClient.get('/complaints/user/my-complaints'),
  getVendorComplaints: () => apiClient.get('/complaints/vendor/my-complaints'),
  getAll: (params) => apiClient.get('/complaints', { params }),
  getDetails: (complaintId) => apiClient.get(`/complaints/${complaintId}`),
  updateStatus: (complaintId, data) =>
    apiClient.put(`/complaints/${complaintId}/status`, data),
  escalate: (complaintId) =>
    apiClient.put(`/complaints/${complaintId}/escalate`),
  addNote: (complaintId, note) =>
    apiClient.post(`/complaints/${complaintId}/note`, { note }),
  addVendorResponse: (complaintId, vendorResponse) =>
    apiClient.post(`/complaints/${complaintId}/response`, { vendorResponse }),
};

export default apiClient;
