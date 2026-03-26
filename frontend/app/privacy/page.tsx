"use client";

import LegalPageLayout from "@/components/ui/LegalPageLayout";
import { FiShield } from "react-icons/fi";

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      pageKey="privacy"
      fallbackTitle="Privacy Policy"
      icon={FiShield}
      gradient="from-green-600 via-emerald-600 to-teal-600"
      fallbackContent={`<h2>1. Information We Collect</h2>
<p>We collect information you provide directly to us, including:</p>
<ul>
<li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, and postal address when you register or contact us</li>
<li><strong>Educational Information:</strong> Qualifications, course enrollments, assessment results, and certification data</li>
<li><strong>Payment Information:</strong> Transaction details processed through secure payment gateways (we do not store card details)</li>
<li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our platform</li>
</ul>

<h2>2. How We Use Your Information</h2>
<p>Your information is used to:</p>
<ul>
<li>Provide, maintain, and improve our educational services</li>
<li>Process enrollments, certifications, and verifications</li>
<li>Communicate important updates, course information, and promotional offers</li>
<li>Personalize your learning experience</li>
<li>Comply with legal obligations and regulatory requirements</li>
</ul>

<h2>3. Data Protection</h2>
<p>We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information. Access to personal data is restricted to authorized personnel only.</p>

<h2>4. Data Sharing</h2>
<p>We do not sell your personal information to third parties. We may share your data with:</p>
<ul>
<li>Authorized franchise centers for course delivery</li>
<li>Payment processors for transaction handling</li>
<li>Government authorities when required by law</li>
</ul>

<h2>5. Cookies</h2>
<p>Our website uses cookies to enhance your browsing experience. You can manage cookie preferences through your browser settings. Essential cookies are required for the platform to function properly.</p>

<h2>6. Your Rights</h2>
<p>You have the right to:</p>
<ul>
<li>Access and review your personal data</li>
<li>Request correction of inaccurate information</li>
<li>Request deletion of your data (subject to legal obligations)</li>
<li>Opt-out of marketing communications</li>
<li>Data portability where applicable</li>
</ul>

<h2>7. Data Retention</h2>
<p>We retain personal data for as long as your account is active or as needed to provide services. Certification records may be retained indefinitely for verification purposes.</p>

<h2>8. Contact Us</h2>
<p>For privacy-related queries or to exercise your rights, please contact our data protection team through the Contact page.</p>`}
    />
  );
}
