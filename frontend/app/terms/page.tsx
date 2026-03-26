"use client";

import LegalPageLayout from "@/components/ui/LegalPageLayout";
import { FiFileText } from "react-icons/fi";

export default function TermsPage() {
  return (
    <LegalPageLayout
      pageKey="terms"
      fallbackTitle="Terms & Conditions"
      icon={FiFileText}
      gradient="from-blue-600 via-indigo-600 to-purple-600"
      fallbackContent={`<h2>1. Introduction</h2>
<p>Welcome to DITRP INDIA. By accessing and using our website and services, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our platform.</p>

<h2>2. Definitions</h2>
<p><strong>"Company"</strong> refers to DITRP INDIA, its subsidiaries, and affiliates.<br>
<strong>"User"</strong> refers to any individual or entity accessing or using our services.<br>
<strong>"Services"</strong> refers to all educational programs, courses, certifications, and related offerings provided by the Company.</p>

<h2>3. Use of Services</h2>
<p>Our services are intended for educational purposes. Users must be at least 16 years of age to register. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated.</p>

<h2>4. Intellectual Property</h2>
<p>All content on this platform, including but not limited to text, graphics, logos, course materials, videos, and software, is the property of DITRP INDIA and is protected by intellectual property laws. Unauthorized reproduction, distribution, or modification of any content is strictly prohibited.</p>

<h2>5. User Conduct</h2>
<p>Users agree not to:</p>
<ul>
<li>Use the services for any unlawful purpose</li>
<li>Share login credentials with unauthorized individuals</li>
<li>Copy, distribute, or reproduce course materials without permission</li>
<li>Engage in any activity that disrupts or interferes with the services</li>
<li>Misrepresent identity or affiliation with any person or entity</li>
</ul>

<h2>6. Certifications</h2>
<p>Certifications are awarded upon successful completion of designated programs as per our assessment criteria. DITRP INDIA reserves the right to revoke certifications in cases of fraud or policy violations.</p>

<h2>7. Limitation of Liability</h2>
<p>DITRP INDIA shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the user for the specific service in question.</p>

<h2>8. Changes to Terms</h2>
<p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms. Users will be notified of significant changes via email or platform notifications.</p>

<h2>9. Contact</h2>
<p>For questions regarding these Terms & Conditions, please contact us through our Contact page or email us directly.</p>`}
    />
  );
}
