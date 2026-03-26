"use client";

import LegalPageLayout from "@/components/ui/LegalPageLayout";
import { FiRefreshCw } from "react-icons/fi";

export default function RefundPage() {
  return (
    <LegalPageLayout
      pageKey="refund"
      fallbackTitle="Refund Policy"
      icon={FiRefreshCw}
      gradient="from-orange-500 via-red-500 to-pink-600"
      fallbackContent={`<h2>1. Overview</h2>
<p>DITRP INDIA is committed to delivering high-quality educational services. This Refund Policy outlines the terms and conditions under which refunds may be processed for our courses and services.</p>

<h2>2. Eligibility for Refund</h2>
<p>Refund requests may be considered under the following circumstances:</p>
<ul>
<li>Request made within 7 days of enrollment and before accessing more than 20% of course content</li>
<li>Technical issues preventing access to the course that cannot be resolved by our support team</li>
<li>Course cancellation by DITRP INDIA</li>
<li>Duplicate payment or billing errors</li>
</ul>

<h2>3. Non-Refundable Items</h2>
<p>The following are not eligible for refunds:</p>
<ul>
<li>Courses where more than 20% of the content has been accessed</li>
<li>Downloaded course materials or resources</li>
<li>Certification and examination fees once the exam has been attempted</li>
<li>Franchise registration fees</li>
<li>Special promotional or discounted purchases</li>
</ul>

<h2>4. Refund Process</h2>
<p>To request a refund:</p>
<ol>
<li>Contact our support team via the Contact page with your enrollment details</li>
<li>Provide the reason for the refund request</li>
<li>Our team will review the request within 5-7 business days</li>
<li>If approved, refunds will be processed to the original payment method within 10-15 business days</li>
</ol>

<h2>5. Partial Refunds</h2>
<p>In certain cases, partial refunds may be offered based on the amount of course content accessed and the time elapsed since enrollment.</p>

<h2>6. Course Transfers</h2>
<p>Instead of a refund, you may request to transfer your enrollment to a different course of equal or lesser value. The difference in fees for a higher-value course must be paid additionally.</p>

<h2>7. Contact</h2>
<p>For refund inquiries, please reach out to our support team through the Contact page. All refund decisions are at the sole discretion of DITRP INDIA management.</p>`}
    />
  );
}
