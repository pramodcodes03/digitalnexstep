import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Axios instance for API requests
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
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
    if (error.response?.status === 401) {
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

  // Combined home page data
  getHomePage: () => apiClient.get("/home"),

  // Individual endpoints
  getHeroSlides: () => apiClient.get("/hero-slides"),
  getFeatures: () => apiClient.get("/features"),
  getAboutSections: () => apiClient.get("/about-sections"),
  getTeamMembers: () => apiClient.get("/team-members"),
  getTestimonials: () => apiClient.get("/testimonials"),
  getPartners: () => apiClient.get("/partners"),
  getFAQs: (category?: string) =>
    apiClient.get("/faqs", { params: category ? { category } : {} }),
  getGalleryItems: (category?: string) =>
    apiClient.get("/gallery-items", {
      params: category && category !== "all" ? { category } : {},
    }),
  getCourses: (category?: string) =>
    apiClient.get("/courses", {
      params: category && category !== "All" ? { category } : {},
    }),
  getCourse: (id: string | number) => apiClient.get(`/courses/${id}`),
  getProducts: () => apiClient.get("/products"),
  getJobUpdates: () => apiClient.get("/job-updates"),
  getCenters: () => apiClient.get("/centers"),
  getPricing: () => apiClient.get("/pricing"),
  getAchievements: () => apiClient.get("/achievements"),
  getPageSections: (page?: string) =>
    apiClient.get("/page-sections", { params: page ? { page } : {} }),
  getSiteSettings: () => apiClient.get("/site-settings"),

  // Form submissions
  contact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => apiClient.post("/contact", data),

  submitEnquiry: (data: {
    product_name: string;
    center_name?: string;
    email: string;
    mobile: string;
    state?: string;
    city?: string;
    pincode?: string;
    remark?: string;
  }) => apiClient.post("/enquiries", data),

  submitFranchise: (data: Record<string, unknown>) =>
    apiClient.post("/franchise-registrations", data),

  subscribe: (email: string) => apiClient.post("/subscribe", { email }),
};

export default api;
