import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Axios instance for API requests
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // For Laravel Sanctum
});

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  }
);

/**
 * API endpoints
 */
export const api = {
  // Health check
  health: () => apiClient.get("/health"),

  // Contact form submission
  contact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => apiClient.post("/contact", data),

  // Newsletter subscription
  subscribe: (email: string) => apiClient.post("/subscribe", { email }),

  // Get centers
  getCenters: () => apiClient.get("/centers"),

  // Get features
  getFeatures: () => apiClient.get("/features"),

  // Get pricing plans
  getPricing: () => apiClient.get("/pricing"),

  // Get FAQs
  getFAQs: () => apiClient.get("/faqs"),
};

export default api;
