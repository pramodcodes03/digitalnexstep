"use client";

import LegalPageLayout from "@/components/ui/LegalPageLayout";
import { FiAward } from "react-icons/fi";

export default function AccreditationsPage() {
  return (
    <LegalPageLayout
      pageKey="accreditations"
      fallbackTitle="Accreditations"
      icon={FiAward}
      gradient="from-yellow-500 via-amber-500 to-orange-600"
      fallbackContent={`<h2>Our Accreditations & Certifications</h2>
<p>DITRP INDIA holds multiple accreditations that validate the quality and credibility of our educational programs. These accreditations are a testament to our commitment to maintaining the highest standards in education delivery.</p>

<h2>Quality Standards</h2>
<p>Our programs are designed and delivered in compliance with recognized quality frameworks. We undergo periodic assessments and audits to ensure continued adherence to these standards.</p>

<h2>Certification Authority</h2>
<p>As an accredited institution, DITRP INDIA is authorized to issue certifications that are recognized by employers and educational institutions. Our certificates carry verification features including QR codes for instant authentication.</p>

<h2>Continuous Improvement</h2>
<p>We are committed to continuous improvement of our programs and services. Our accreditation process involves regular reviews, feedback incorporation, and curriculum updates to stay relevant in the evolving education landscape.</p>

<h2>Verification</h2>
<p>All certifications issued by DITRP INDIA can be verified through our online verification portal. Employers and institutions can authenticate certificates using the unique certificate number or QR code provided on each certificate.</p>

<h2>Recognition</h2>
<p>Our accredited programs are recognized across various sectors including IT, education, skill development, and professional training. This recognition ensures our graduates have a competitive advantage in the job market.</p>`}
    />
  );
}
