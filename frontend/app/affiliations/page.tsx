"use client";

import LegalPageLayout from "@/components/ui/LegalPageLayout";
import { FiLink } from "react-icons/fi";

export default function AffiliationsPage() {
  return (
    <LegalPageLayout
      pageKey="affiliations"
      fallbackTitle="Our Affiliations"
      icon={FiLink}
      gradient="from-violet-600 via-purple-600 to-indigo-600"
      fallbackContent={`<h2>Our Trusted Affiliations & Partnerships</h2>
<p>DITRP INDIA is proud to be affiliated with leading organizations and institutions in the education and technology sector. Our affiliations ensure that our programs meet international standards and are recognized across industries.</p>

<h2>Government Affiliations</h2>
<p>We work closely with government bodies to ensure our programs align with national education policies and skill development initiatives. Our certifications are recognized by various government departments and agencies.</p>

<h2>Industry Partnerships</h2>
<p>Our strategic partnerships with leading technology companies and industry bodies ensure that our curriculum stays current with market demands. These partnerships also enable placement opportunities for our students.</p>

<h2>Academic Collaborations</h2>
<p>We collaborate with universities and academic institutions to provide comprehensive learning experiences. These collaborations help bridge the gap between academic knowledge and practical industry requirements.</p>

<h2>International Recognition</h2>
<p>Our programs and certifications are designed to meet international standards, making our graduates competitive in the global job market. We continuously work to expand our international affiliations and recognition.</p>

<h2>Quality Assurance</h2>
<p>All our affiliated programs undergo regular quality audits and reviews to maintain the highest standards of education delivery. Our commitment to quality is reflected in the trust our affiliating partners place in us.</p>`}
    />
  );
}
