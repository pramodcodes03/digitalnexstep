import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://nextstep.ditrpindia.org/api";

const TENANT_API_BASE_URL =
  process.env.NEXT_PUBLIC_TENANT_API_URL || "https://hdi.ditrpindia.org/api";

export const tenantApiClient = axios.create({
  baseURL: TENANT_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

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
  getAwardImages: () => apiClient.get("/award-images"),

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

  // Student verification — calls TENANT_API_BASE_URL directly (configurable via NEXT_PUBLIC_TENANT_API_URL)
  verifyStudent: (certificateNumber: string) =>
    tenantApiClient.get(`/student-verification/${encodeURIComponent(certificateNumber)}`),

  // ATC (franchise) verification
  verifyAtc: (atcCode: string) =>
    tenantApiClient.get(`/atc-verification/${encodeURIComponent(atcCode)}`),

  // Franchise registration (all calls go to tenant API)
  franchiseFormData: () =>
    tenantApiClient.get('/franchise-registration/form-data'),
  franchiseSendOtp: (email: string) =>
    tenantApiClient.post('/franchise-registration/send-otp', { email }),
  franchiseVerifyOtp: (email: string, otp: string) =>
    tenantApiClient.post('/franchise-registration/verify-otp', { email, otp }),
  franchiseSubmit: (data: Record<string, unknown>) =>
    tenantApiClient.post('/franchise-registration/store', data, { timeout: 30000 }),

  // Tenant courses — direct to hdi.ditrpindia.org (same pattern as verification & franchise)
  getTenantCourses: (category_id?: number) =>
    tenantApiClient.get('/all-courses', { params: category_id ? { category_id } : {} }),
  getTenantCourse: (id: string | number) =>
    tenantApiClient.get(`/course_details/${id}`),
  getTenantEnquiryDropdowns: (course_id: number) =>
    tenantApiClient.post('/enquiry/dropdowns', { course_id }),
  submitTenantEnquiry: (data: Record<string, unknown>) =>
    tenantApiClient.post('/enquiry/store', data),
};

export default api;
