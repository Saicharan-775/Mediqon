import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to add the auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const api = {
  // Matches GET /appointments/my
  getBookings: async () => {
    try {
      const response = await axiosInstance.get('/appointments/my');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  // Matches GET /doctors
  getDoctors: async () => {
    try {
      const response = await axiosInstance.get('/doctors');
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  // Matches POST /appointments/book
  bookAppointment: async (bookingData) => {
    try {
      // Backend expects: { patientId, doctorId, hospitalId, appointmentDate }
      // Auth patientId is handled by JWT session in NestJS, but the service expects it in params for Vapi
      // For web UI, we only need to send { doctorId, hospitalId, appointmentDate } if the controller extracts patientId from @Req()
      // Wait, let's check AppointmentController's book method
      /* 
        async book(@Body() body: BookAppointmentDto) {
          return this.appointmentService.bookAppointment(body);
        }
      */
      // BookAppointmentDto needs patientId. So we must provide it.
      const response = await axiosInstance.post('/appointments/book', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  },

  // Matches PATCH /appointments/:id/status
  cancelAppointment: async (appointmentId) => {
    try {
      const response = await axiosInstance.patch(`/appointments/${appointmentId}/status`, { status: "CANCELLED" });
      return response.data;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  },

  // Backend still uses specialized logic in Vapi for availability
  // For the UI, we'll keep a mock but could call /vapi/check-availability if it was public
  getAvailability: async (doctorId, date) => {
    try {
      // Endpoint is GET /doctors/:id/availability?date=YYYY-MM-DD
      const response = await axiosInstance.get(`/doctors/${doctorId}/availability`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching availability:', error);
      throw error;
    }
  }
};

export default axiosInstance;
