import {
  FiHome,
  FiBook,
  FiBookOpen,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiClipboard,
  FiAward,
  FiPackage,
  FiUserCheck,
  FiSettings,
  FiGlobe,
  FiGrid,
  FiVideo,
  FiFileText,
  FiMessageCircle,
  FiUserPlus,
  FiPrinter,
  FiHelpCircle,
  FiCheckCircle,
  FiBarChart2,
  FiSmartphone,
  FiXCircle,
  FiCalendar,
  FiEdit,
  FiInbox,
  FiBookmark,
  FiFile,
  FiCheckSquare,
  FiImage,
  FiTag,
  FiLayers,
  FiCreditCard,
  FiFolder,
  FiUser,
  FiLock,
  FiBriefcase,
  FiGift,
  FiShield,
  FiMapPin,
  FiBell,
  FiLayout,
} from "react-icons/fi";
import { IconType } from "react-icons";

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  deviceType: "laptop" | "tablet" | "mobile";
  aspectRatio: "16:9" | "4:3" | "9:16" | "1:1";
}

export interface PointItem {
  id: string;
  title: string;
  description: string;
  videos: VideoItem[];
  carouselLayout: "cards" | "filmstrip" | "grid" | "spotlight";
}

export interface SubFeature {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  color: string;
  bgColor: string;
  points: PointItem[];
}

export interface MainFeature {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  gradient: string;
  subFeatures: SubFeature[];
}

// Demo video data (placeholder URLs for demonstration)
const createDemoVideo = (
  id: string,
  title: string,
  deviceType: VideoItem["deviceType"] = "laptop",
  aspectRatio: VideoItem["aspectRatio"] = "16:9"
): VideoItem => ({
  id,
  title,
  url: "",
  thumbnail: "",
  duration: "3:45",
  deviceType,
  aspectRatio,
});

export const featuresData: MainFeature[] = [
  {
    id: "dashboard-analytics",
    title: "Dashboard & Analytics",
    description:
      "Comprehensive overview and real-time insights into your institution's performance with interactive dashboards.",
    icon: FiHome,
    gradient: "from-blue-500 to-cyan-500",
    subFeatures: [
      {
        id: "real-time-dashboard",
        title: "Real-Time Dashboard",
        description:
          "Monitor key metrics including student enrollment, revenue, attendance, and course progress all in one unified view.",
        icon: FiBarChart2,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        points: [
          {
            id: "overview-metrics",
            title: "Overview Metrics",
            description:
              "See total students, active courses, revenue collected, and pending fees at a glance with auto-refreshing widgets.",
            videos: [
              createDemoVideo("dash-1", "Dashboard Overview Tour", "laptop"),
              createDemoVideo("dash-2", "Mobile Dashboard View", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
          {
            id: "interactive-charts",
            title: "Interactive Charts",
            description:
              "Drill down into performance data with interactive bar charts, pie charts, and trend lines that respond to your filters.",
            videos: [
              createDemoVideo("dash-3", "Chart Interactions Demo", "laptop"),
              createDemoVideo("dash-4", "Tablet Chart View", "tablet", "4:3"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "quick-actions",
            title: "Quick Actions Panel",
            description:
              "Perform common tasks directly from the dashboard—add students, create courses, or generate reports in one click.",
            videos: [
              createDemoVideo("dash-5", "Quick Actions Walkthrough", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
        ],
      },
      {
        id: "wallet-management",
        title: "Wallet Management",
        description:
          "Track franchise and student wallets with complete transaction histories and balance management.",
        icon: FiCreditCard,
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        points: [
          {
            id: "franchise-wallet",
            title: "Franchise Wallet",
            description:
              "Monitor franchise wallet balances, credits, debits, and transfer history with detailed transaction logs.",
            videos: [
              createDemoVideo("wallet-1", "Franchise Wallet Overview", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "student-wallet",
            title: "Student Wallet",
            description:
              "Students can view their wallet balance, payment history, and use wallet credits for fee payments.",
            videos: [
              createDemoVideo("wallet-2", "Student Wallet on Mobile", "mobile", "9:16"),
              createDemoVideo("wallet-3", "Wallet Transactions", "laptop"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
    ],
  },
  {
    id: "franchise-management",
    title: "Franchise Management",
    description:
      "End-to-end franchise operations with plan management, franchise listing, request handling, and wallet controls.",
    icon: FiMapPin,
    gradient: "from-violet-500 to-purple-600",
    subFeatures: [
      {
        id: "franchise-plans",
        title: "Franchise Plans",
        description:
          "Create and manage franchise plans with customizable pricing, features, and enrollment limits.",
        icon: FiBriefcase,
        color: "text-violet-600 dark:text-violet-400",
        bgColor: "bg-violet-100 dark:bg-violet-900/30",
        points: [
          {
            id: "plan-creation",
            title: "Plan Creation & Pricing",
            description:
              "Design franchise plans with tiered pricing, feature sets, and student capacity limits.",
            videos: [
              createDemoVideo("fplan-1", "Creating Franchise Plan", "laptop"),
              createDemoVideo("fplan-2", "Plan on Tablet", "tablet", "4:3"),
            ],
            carouselLayout: "grid",
          },
          {
            id: "plan-comparison",
            title: "Plan Comparison View",
            description:
              "Compare plans side-by-side to help franchisees choose the best fit for their needs.",
            videos: [
              createDemoVideo("fplan-3", "Plan Comparison Demo", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
        ],
      },
      {
        id: "franchise-operations",
        title: "Franchise Operations",
        description:
          "Manage your franchise network with detailed listings, request approvals, and performance tracking.",
        icon: FiMapPin,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        points: [
          {
            id: "franchise-listing",
            title: "Franchises Listing",
            description:
              "View all franchises with their status, location, plan details, and performance metrics in a searchable table.",
            videos: [
              createDemoVideo("fops-1", "Franchise List Overview", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "franchise-requests",
            title: "Franchise Requests",
            description:
              "Review and approve/reject franchise applications with built-in document verification and communication tools.",
            videos: [
              createDemoVideo("fops-2", "Processing Franchise Request", "laptop"),
              createDemoVideo("fops-3", "Mobile Request View", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
    ],
  },
  {
    id: "course-management",
    title: "Course Management",
    description:
      "Complete course lifecycle management from creation to content delivery, including grades, subjects, and online classes.",
    icon: FiBook,
    gradient: "from-amber-500 to-orange-500",
    subFeatures: [
      {
        id: "course-setup",
        title: "Course Setup",
        description:
          "Create and organize courses with categories, award categories, subjects, and grading systems.",
        icon: FiGrid,
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-100 dark:bg-amber-900/30",
        points: [
          {
            id: "grade-system",
            title: "Exam Grade System",
            description:
              "Define custom grading scales, grade boundaries, and GPA calculations tailored to your institution's standards.",
            videos: [
              createDemoVideo("cs-1", "Setting Up Grades", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "subjects-languages",
            title: "Subjects & Languages",
            description:
              "Manage subjects and supported languages to offer multi-language course content to diverse student bases.",
            videos: [
              createDemoVideo("cs-2", "Subject Management", "laptop"),
              createDemoVideo("cs-3", "Language Settings", "tablet", "4:3"),
            ],
            carouselLayout: "filmstrip",
          },
          {
            id: "course-categories",
            title: "Course Categories & Awards",
            description:
              "Organize courses into categories and award categories for streamlined navigation and certificate generation.",
            videos: [
              createDemoVideo("cs-4", "Categories Overview", "laptop"),
            ],
            carouselLayout: "grid",
          },
        ],
      },
      {
        id: "course-content",
        title: "Course Content",
        description:
          "Deliver rich course content with videos, notes, reviews, and online live classes.",
        icon: FiVideo,
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        points: [
          {
            id: "course-videos",
            title: "Course Videos",
            description:
              "Upload, organize, and stream course videos with chapter markers, playback speed control, and progress tracking.",
            videos: [
              createDemoVideo("cc-1", "Video Management", "laptop"),
              createDemoVideo("cc-2", "Student Video View", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
          {
            id: "course-notes",
            title: "Course Notes",
            description:
              "Create and distribute digital course notes with rich formatting, attachments, and version control.",
            videos: [
              createDemoVideo("cc-3", "Notes Editor Demo", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "online-classes",
            title: "Online Live Classes",
            description:
              "Schedule and conduct live online classes with video conferencing, screen sharing, and recording capabilities.",
            videos: [
              createDemoVideo("cc-4", "Live Class Setup", "laptop"),
              createDemoVideo("cc-5", "Joining on Tablet", "tablet", "4:3"),
            ],
            carouselLayout: "grid",
          },
          {
            id: "course-reviews",
            title: "Course Reviews",
            description:
              "Collect and manage student reviews and ratings to improve course quality and showcase testimonials.",
            videos: [
              createDemoVideo("cc-6", "Review Management", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
        ],
      },
      {
        id: "batch-management",
        title: "Batch Management",
        description:
          "Organize students into batches with schedules, assignments, and progress tracking.",
        icon: FiUsers,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        points: [
          {
            id: "manage-batches",
            title: "Manage Batches",
            description:
              "Create, edit, and manage student batches with capacity limits, schedules, and instructor assignments.",
            videos: [
              createDemoVideo("batch-1", "Batch Overview", "laptop"),
              createDemoVideo("batch-2", "Creating a Batch", "laptop"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
    ],
  },
  {
    id: "student-management",
    title: "Student Management",
    description:
      "Complete student lifecycle management from enquiry to admission, with support for notifications, ID cards, and more.",
    icon: FiUsers,
    gradient: "from-green-500 to-emerald-500",
    subFeatures: [
      {
        id: "student-records",
        title: "Student Records",
        description:
          "Maintain comprehensive student profiles with academic records, contact information, and enrollment history.",
        icon: FiUserPlus,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        points: [
          {
            id: "student-list",
            title: "Students List",
            description:
              "View and manage all enrolled students with advanced filters for batch, course, status, and enrollment date.",
            videos: [
              createDemoVideo("sr-1", "Student List Overview", "laptop"),
              createDemoVideo("sr-2", "Filtering Students", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "admissions",
            title: "Admissions",
            description:
              "Process new admissions with document collection, fee calculation, batch assignment, and welcome communication.",
            videos: [
              createDemoVideo("sr-3", "Admission Process", "laptop"),
              createDemoVideo("sr-4", "Mobile Admission Form", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
          {
            id: "id-cards",
            title: "Bulk ID Card Print",
            description:
              "Generate and print professional student ID cards in bulk with customizable templates and QR codes.",
            videos: [
              createDemoVideo("sr-5", "ID Card Generation", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
        ],
      },
      {
        id: "student-engagement",
        title: "Student Engagement",
        description:
          "Keep students informed and engaged with notifications, enquiry follow-ups, support, and birthday tracking.",
        icon: FiBell,
        color: "text-teal-600 dark:text-teal-400",
        bgColor: "bg-teal-100 dark:bg-teal-900/30",
        points: [
          {
            id: "notifications",
            title: "Student Notifications",
            description:
              "Send targeted notifications to individuals, batches, or all students via SMS, email, and push notifications.",
            videos: [
              createDemoVideo("se-1", "Sending Notification", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "enquiries",
            title: "Student Enquiries & Follow-Ups",
            description:
              "Track prospective student enquiries from first contact through conversion, with automated follow-up reminders.",
            videos: [
              createDemoVideo("se-2", "Enquiry Management", "laptop"),
              createDemoVideo("se-3", "Follow-Up Tracking", "tablet", "4:3"),
            ],
            carouselLayout: "grid",
          },
          {
            id: "help-support",
            title: "Help & Support",
            description:
              "Provide student support with a ticketing system, FAQs, and direct communication channels.",
            videos: [
              createDemoVideo("se-4", "Support Ticket System", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
          {
            id: "birthday-popups",
            title: "Birthdays & Popups",
            description:
              "Auto-track student birthdays for personalized wishes, and create custom popup announcements for important events.",
            videos: [
              createDemoVideo("se-5", "Birthday List", "mobile", "9:16"),
              createDemoVideo("se-6", "Popup Creation", "laptop"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
    ],
  },
  {
    id: "fee-management",
    title: "Fee & Payment Management",
    description:
      "Complete fee lifecycle from installment planning to payment collection, with wallet integration and detailed histories.",
    icon: FiDollarSign,
    gradient: "from-emerald-500 to-green-600",
    subFeatures: [
      {
        id: "installment-tracking",
        title: "Installment Tracking",
        description:
          "Track upcoming and paid installments with automated reminders and late fee calculations.",
        icon: FiDollarSign,
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        points: [
          {
            id: "upcoming-installments",
            title: "Upcoming Installments",
            description:
              "View all pending installments with due dates, amounts, and student details. Send payment reminders with one click.",
            videos: [
              createDemoVideo("fi-1", "Upcoming Installments View", "laptop"),
              createDemoVideo("fi-2", "Payment Reminders", "mobile", "9:16"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "paid-installments",
            title: "Paid Installments",
            description:
              "Record of all completed payments with receipt generation, payment mode tracking, and reconciliation tools.",
            videos: [
              createDemoVideo("fi-3", "Paid Installments Report", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
          {
            id: "payment-history",
            title: "Payment History",
            description:
              "Complete payment audit trail with date, amount, mode, and status for every transaction in the system.",
            videos: [
              createDemoVideo("fi-4", "Payment History Dashboard", "laptop"),
              createDemoVideo("fi-5", "Transaction Details", "tablet", "4:3"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
    ],
  },
  {
    id: "attendance-management",
    title: "Attendance Management",
    description:
      "Track student attendance with multiple methods including QR codes, manage leaves, holidays, and weekly off days.",
    icon: FiClock,
    gradient: "from-sky-500 to-blue-600",
    subFeatures: [
      {
        id: "attendance-tracking",
        title: "Attendance Tracking",
        description:
          "Multiple ways to mark and monitor attendance with detailed reporting and analytics.",
        icon: FiBarChart2,
        color: "text-sky-600 dark:text-sky-400",
        bgColor: "bg-sky-100 dark:bg-sky-900/30",
        points: [
          {
            id: "attendance-report",
            title: "Attendance Reports",
            description:
              "Generate detailed attendance reports by batch, course, student, or date range with visual charts and export options.",
            videos: [
              createDemoVideo("att-1", "Attendance Reports", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "add-attendance",
            title: "Add Attendance",
            description:
              "Mark attendance manually or through batch upload with options for present, absent, late, and excused statuses.",
            videos: [
              createDemoVideo("att-2", "Manual Attendance", "laptop"),
              createDemoVideo("att-3", "Batch Attendance", "tablet", "4:3"),
            ],
            carouselLayout: "grid",
          },
          {
            id: "qr-attendance",
            title: "QR Code Attendance",
            description:
              "Students scan a QR code from their phones to instantly mark their attendance—fast, touchless, and accurate.",
            videos: [
              createDemoVideo("att-4", "QR Attendance Setup", "laptop"),
              createDemoVideo("att-5", "Student QR Scan", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
      {
        id: "leave-holiday",
        title: "Leave & Holiday Management",
        description:
          "Manage student leaves, public holidays, and weekly off days for accurate attendance calculation.",
        icon: FiCalendar,
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        points: [
          {
            id: "leave-management",
            title: "Leave Management",
            description:
              "Students can apply for leaves with reasons, and admins can approve/reject with a streamlined workflow.",
            videos: [
              createDemoVideo("lh-1", "Leave Application", "mobile", "9:16"),
              createDemoVideo("lh-2", "Admin Leave Review", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
          {
            id: "holidays-weekoff",
            title: "Holidays & Week Off",
            description:
              "Configure public holidays and weekly off days that automatically reflect in attendance calculations.",
            videos: [
              createDemoVideo("lh-3", "Holiday Calendar", "laptop"),
            ],
            carouselLayout: "cards",
          },
        ],
      },
    ],
  },
  {
    id: "exam-management",
    title: "Exam & Assessment",
    description:
      "Full exam lifecycle from hall ticket generation to result publication, supporting mock tests and final exams.",
    icon: FiClipboard,
    gradient: "from-rose-500 to-pink-600",
    subFeatures: [
      {
        id: "exam-setup",
        title: "Exam Setup & Execution",
        description:
          "Create, schedule, and manage mock tests and final exams with hall ticket generation and exam requests.",
        icon: FiFileText,
        color: "text-rose-600 dark:text-rose-400",
        bgColor: "bg-rose-100 dark:bg-rose-900/30",
        points: [
          {
            id: "hall-tickets",
            title: "Generate Hall Tickets",
            description:
              "Auto-generate professional hall tickets with exam schedules, seating details, and student photos.",
            videos: [
              createDemoVideo("ex-1", "Hall Ticket Generation", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "mock-tests",
            title: "Mock Tests",
            description:
              "Create practice exams that mirror the final exam format, helping students prepare with timed, scored assessments.",
            videos: [
              createDemoVideo("ex-2", "Mock Test Creation", "laptop"),
              createDemoVideo("ex-3", "Taking Mock Test", "tablet", "4:3"),
            ],
            carouselLayout: "spotlight",
          },
          {
            id: "final-exams",
            title: "Final Exams",
            description:
              "Schedule and conduct final examinations with secure question papers, invigilation tools, and auto-grading.",
            videos: [
              createDemoVideo("ex-4", "Final Exam Dashboard", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
          {
            id: "exam-requests",
            title: "Exam Requests & Marks",
            description:
              "Manage student exam registration requests and update marks with batch upload support.",
            videos: [
              createDemoVideo("ex-5", "Exam Request Flow", "laptop"),
              createDemoVideo("ex-6", "Marks Entry", "laptop"),
            ],
            carouselLayout: "grid",
          },
        ],
      },
    ],
  },
  {
    id: "certificate-management",
    title: "Certificates",
    description:
      "Digital certificate lifecycle from application to approval, with customizable templates and background images.",
    icon: FiAward,
    gradient: "from-yellow-500 to-amber-500",
    subFeatures: [
      {
        id: "certificate-workflow",
        title: "Certificate Workflow",
        description:
          "Streamlined certificate application, approval, and generation with customizable backgrounds and templates.",
        icon: FiAward,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        points: [
          {
            id: "apply-certificate",
            title: "Apply for Certificate",
            description:
              "Students can apply for course completion certificates with auto-populated academic details and photo upload.",
            videos: [
              createDemoVideo("cert-1", "Certificate Application", "laptop"),
              createDemoVideo("cert-2", "Mobile Application", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
          {
            id: "approved-certificates",
            title: "Approved Certificates",
            description:
              "View and download approved certificates with digital signatures, QR verification codes, and print options.",
            videos: [
              createDemoVideo("cert-3", "Certificate Gallery", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "background-images",
            title: "Certificate Backgrounds",
            description:
              "Upload and manage certificate background templates with drag-and-drop positioning for text and image elements.",
            videos: [
              createDemoVideo("cert-4", "Background Designer", "laptop"),
            ],
            carouselLayout: "grid",
          },
        ],
      },
    ],
  },
  {
    id: "financial-operations",
    title: "Financial Operations",
    description:
      "Track expenses with type-based categorization, manage inventory, and maintain complete financial oversight.",
    icon: FiCreditCard,
    gradient: "from-teal-500 to-cyan-600",
    subFeatures: [
      {
        id: "expense-management",
        title: "Expense Management",
        description:
          "Categorize and track all institutional expenses with types, subtypes, and detailed records.",
        icon: FiTag,
        color: "text-teal-600 dark:text-teal-400",
        bgColor: "bg-teal-100 dark:bg-teal-900/30",
        points: [
          {
            id: "expense-types",
            title: "Expense Types & Sub Types",
            description:
              "Define expense categories and subcategories for organized tracking—rent, utilities, salaries, materials, and more.",
            videos: [
              createDemoVideo("exp-1", "Expense Type Setup", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "expense-list",
            title: "Expense Records",
            description:
              "Log, edit, and audit all expenses with receipts, approval workflows, and monthly/yearly summaries.",
            videos: [
              createDemoVideo("exp-2", "Expense Dashboard", "laptop"),
              createDemoVideo("exp-3", "Adding Expense on Mobile", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
      {
        id: "inventory-management",
        title: "Inventory Management",
        description:
          "Track institutional inventory from books to equipment with category-based organization and student assignments.",
        icon: FiPackage,
        color: "text-cyan-600 dark:text-cyan-400",
        bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
        points: [
          {
            id: "inventory-categories",
            title: "Inventory Categories",
            description:
              "Organize inventory into logical categories—books, uniforms, lab equipment, stationery, and more.",
            videos: [
              createDemoVideo("inv-1", "Category Setup", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
          {
            id: "inventory-products",
            title: "Inventory Products",
            description:
              "Manage individual products with stock levels, pricing, images, and low-stock alerts.",
            videos: [
              createDemoVideo("inv-2", "Product Management", "laptop"),
            ],
            carouselLayout: "grid",
          },
          {
            id: "student-inventory",
            title: "Student Inventory",
            description:
              "Track inventory issued to students with return dates, condition tracking, and billing integration.",
            videos: [
              createDemoVideo("inv-3", "Student Inventory View", "laptop"),
              createDemoVideo("inv-4", "Issue Inventory", "tablet", "4:3"),
            ],
            carouselLayout: "cards",
          },
        ],
      },
    ],
  },
  {
    id: "staff-user-management",
    title: "Staff & User Management",
    description:
      "Complete HR module for staff with attendance, leaves, salary, lectures, plus role-based user access control.",
    icon: FiUserCheck,
    gradient: "from-indigo-500 to-violet-600",
    subFeatures: [
      {
        id: "staff-management",
        title: "Staff Management",
        description:
          "Manage staff profiles, attendance, leaves, salary, and lecture schedules in one integrated module.",
        icon: FiUser,
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        points: [
          {
            id: "staff-list",
            title: "Staff Directory",
            description:
              "Maintain a comprehensive staff directory with profiles, designations, contact details, and employment history.",
            videos: [
              createDemoVideo("staff-1", "Staff List View", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "staff-attendance",
            title: "Staff Attendance & Leaves",
            description:
              "Track staff attendance with clock-in/out, manage leave applications with approval workflows and balance tracking.",
            videos: [
              createDemoVideo("staff-2", "Staff Attendance", "laptop"),
              createDemoVideo("staff-3", "Leave Application", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
          {
            id: "staff-salary",
            title: "Staff Salary & Payslips",
            description:
              "Process monthly salaries with attendance deductions, generate payslips, and maintain salary history records.",
            videos: [
              createDemoVideo("staff-4", "Salary Processing", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
          {
            id: "staff-lectures",
            title: "Staff Lectures",
            description:
              "Track and manage lecture assignments, schedules, and completion reports for teaching staff.",
            videos: [
              createDemoVideo("staff-5", "Lecture Schedule", "laptop"),
              createDemoVideo("staff-6", "Lecture Report", "tablet", "4:3"),
            ],
            carouselLayout: "grid",
          },
        ],
      },
      {
        id: "user-access-control",
        title: "User & Access Control",
        description:
          "Manage users, roles, and designations with granular permission controls.",
        icon: FiLock,
        color: "text-violet-600 dark:text-violet-400",
        bgColor: "bg-violet-100 dark:bg-violet-900/30",
        points: [
          {
            id: "user-management",
            title: "User Management",
            description:
              "Create and manage user accounts with profile details, status control, and activity logs.",
            videos: [
              createDemoVideo("um-1", "User Management Panel", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "role-permissions",
            title: "Roles & Permissions",
            description:
              "Define custom roles with granular permissions—control exactly what each user type can view and modify.",
            videos: [
              createDemoVideo("um-2", "Role Configuration", "laptop"),
              createDemoVideo("um-3", "Permission Matrix", "laptop"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
    ],
  },
  {
    id: "website-management",
    title: "Website Management",
    description:
      "Full CMS for your institution's website—manage banners, pages, gallery, events, jobs, and all public-facing content.",
    icon: FiGlobe,
    gradient: "from-pink-500 to-rose-500",
    subFeatures: [
      {
        id: "content-management",
        title: "Content Management",
        description:
          "Manage all website content including banners, about pages, services, testimonials, and FAQs.",
        icon: FiLayout,
        color: "text-pink-600 dark:text-pink-400",
        bgColor: "bg-pink-100 dark:bg-pink-900/30",
        points: [
          {
            id: "banners",
            title: "Banners & Mobile Banners",
            description:
              "Create eye-catching banners for desktop and mobile with image upload, text overlays, and scheduling.",
            videos: [
              createDemoVideo("web-1", "Banner Management", "laptop"),
              createDemoVideo("web-2", "Mobile Banner Preview", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
          {
            id: "about-mission",
            title: "About & Mission Vision",
            description:
              "Edit your institution's story, mission statement, and vision with rich text editors and image galleries.",
            videos: [
              createDemoVideo("web-3", "About Page Editor", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "services-faq",
            title: "Services & FAQs",
            description:
              "Showcase your institution's services and manage frequently asked questions to reduce support queries.",
            videos: [
              createDemoVideo("web-4", "Services Management", "laptop"),
              createDemoVideo("web-5", "FAQ Editor", "tablet", "4:3"),
            ],
            carouselLayout: "grid",
          },
        ],
      },
      {
        id: "media-engagement",
        title: "Media & Engagement",
        description:
          "Manage gallery, events, posts, testimonials, and social media presence from one dashboard.",
        icon: FiImage,
        color: "text-rose-600 dark:text-rose-400",
        bgColor: "bg-rose-100 dark:bg-rose-900/30",
        points: [
          {
            id: "gallery-events",
            title: "Gallery & Events",
            description:
              "Upload photos and videos to your gallery, and create event pages with dates, descriptions, and registrations.",
            videos: [
              createDemoVideo("me-1", "Gallery Upload", "laptop"),
              createDemoVideo("me-2", "Event Creation", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
          {
            id: "posts-testimonials",
            title: "Posts & Testimonials",
            description:
              "Publish blog posts and showcase student/parent testimonials to build trust and engagement.",
            videos: [
              createDemoVideo("me-3", "Blog Editor", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "social-media",
            title: "Social Media & SEO",
            description:
              "Connect social media accounts, configure social sharing previews, and optimize meta tags for search engines.",
            videos: [
              createDemoVideo("me-4", "Social Media Setup", "laptop"),
              createDemoVideo("me-5", "SEO Preview", "laptop"),
            ],
            carouselLayout: "spotlight",
          },
        ],
      },
      {
        id: "site-settings",
        title: "Site Settings & Extras",
        description:
          "Configure site-wide settings, payment details, jobs, certificates, brochures, and franchise information.",
        icon: FiSettings,
        color: "text-fuchsia-600 dark:text-fuchsia-400",
        bgColor: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
        points: [
          {
            id: "site-config",
            title: "Site Configuration",
            description:
              "Manage logos, colors, contact info, payment details, policies, and all site-wide settings from one panel.",
            videos: [
              createDemoVideo("ss-1", "Site Settings Panel", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "jobs-careers",
            title: "Jobs & Applications",
            description:
              "Post job openings and manage applications with status tracking, resume downloads, and communication tools.",
            videos: [
              createDemoVideo("ss-2", "Job Posting", "laptop"),
              createDemoVideo("ss-3", "Application Review", "tablet", "4:3"),
            ],
            carouselLayout: "grid",
          },
          {
            id: "extras",
            title: "Brochure, Partners & Affiliations",
            description:
              "Upload institutional brochures, manage partner logos, showcase affiliations, and display sample certificates.",
            videos: [
              createDemoVideo("ss-4", "Partners Page", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
        ],
      },
    ],
  },
  {
    id: "system-configuration",
    title: "System & Configuration",
    description:
      "Advanced system settings including payment configuration, WhatsApp templates, security backups, and password management.",
    icon: FiSettings,
    gradient: "from-slate-500 to-gray-600",
    subFeatures: [
      {
        id: "system-settings",
        title: "System Settings",
        description:
          "Configure core system settings, payment gateways, communication templates, and security features.",
        icon: FiShield,
        color: "text-slate-600 dark:text-slate-400",
        bgColor: "bg-slate-100 dark:bg-slate-900/30",
        points: [
          {
            id: "general-settings",
            title: "General & Payment Settings",
            description:
              "Configure institution details, timezone, currency, and integrate payment gateways for online fee collection.",
            videos: [
              createDemoVideo("sys-1", "General Settings", "laptop"),
            ],
            carouselLayout: "cards",
          },
          {
            id: "whatsapp-templates",
            title: "WhatsApp Templates",
            description:
              "Create and manage WhatsApp message templates for automated notifications—fee reminders, attendance alerts, and more.",
            videos: [
              createDemoVideo("sys-2", "Template Editor", "laptop"),
              createDemoVideo("sys-3", "WhatsApp Preview", "mobile", "9:16"),
            ],
            carouselLayout: "spotlight",
          },
          {
            id: "security-backup",
            title: "Security & Backup",
            description:
              "Schedule automated backups, manage password policies, and ensure data security with encryption and access controls.",
            videos: [
              createDemoVideo("sys-4", "Backup Configuration", "laptop"),
            ],
            carouselLayout: "filmstrip",
          },
        ],
      },
    ],
  },
];
