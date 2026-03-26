<?php

namespace Database\Seeders;

use App\Models\PageSection;
use Illuminate\Database\Seeder;

class LegalPageSectionSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'page' => 'terms',
                'section_key' => 'content',
                'title' => 'Terms & Conditions',
                'subtitle' => 'Please read these terms carefully before using our services',
                'content' => '<h2>1. Introduction</h2>
<p>Welcome to DITRP INDIA. By accessing and using our website and services, you agree to comply with and be bound by these Terms and Conditions.</p>

<h2>2. Use of Services</h2>
<p>Our services are intended for educational purposes. Users must be at least 16 years of age to register. You agree to provide accurate information during registration.</p>

<h2>3. Intellectual Property</h2>
<p>All content on this platform is the property of DITRP INDIA and is protected by intellectual property laws. Unauthorized reproduction is strictly prohibited.</p>

<h2>4. User Conduct</h2>
<p>Users agree not to use the services for unlawful purposes, share credentials, or copy course materials without permission.</p>

<h2>5. Certifications</h2>
<p>Certifications are awarded upon successful completion of designated programs. DITRP INDIA reserves the right to revoke certifications in cases of fraud.</p>

<h2>6. Limitation of Liability</h2>
<p>DITRP INDIA shall not be liable for indirect or consequential damages arising from use of our services.</p>

<h2>7. Changes to Terms</h2>
<p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of updated terms.</p>',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'page' => 'privacy',
                'section_key' => 'content',
                'title' => 'Privacy Policy',
                'subtitle' => 'How we collect, use, and protect your information',
                'content' => '<h2>1. Information We Collect</h2>
<p>We collect personal information (name, email, phone), educational information, payment details, and usage data when you use our services.</p>

<h2>2. How We Use Your Information</h2>
<p>Your information is used to provide educational services, process enrollments, communicate updates, and personalize your experience.</p>

<h2>3. Data Protection</h2>
<p>We implement industry-standard security measures including SSL encryption and secure servers to protect your personal information.</p>

<h2>4. Data Sharing</h2>
<p>We do not sell your personal information. We may share data with authorized franchise centers, payment processors, and government authorities when required by law.</p>

<h2>5. Your Rights</h2>
<p>You have the right to access, correct, and request deletion of your personal data, and to opt-out of marketing communications.</p>',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'page' => 'refund',
                'section_key' => 'content',
                'title' => 'Refund Policy',
                'subtitle' => 'Our commitment to fair refund practices',
                'content' => '<h2>1. Overview</h2>
<p>DITRP INDIA is committed to delivering high-quality educational services. This policy outlines the terms for refund processing.</p>

<h2>2. Eligibility</h2>
<p>Refund requests may be considered if made within 7 days of enrollment and before accessing more than 20% of course content, or for technical issues or billing errors.</p>

<h2>3. Non-Refundable Items</h2>
<p>Courses with more than 20% content accessed, downloaded materials, attempted exams, franchise fees, and promotional purchases are not eligible for refunds.</p>

<h2>4. Refund Process</h2>
<p>Contact our support team with enrollment details. Requests are reviewed within 5-7 business days. Approved refunds are processed within 10-15 business days.</p>',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'page' => 'affiliations',
                'section_key' => 'content',
                'title' => 'Our Affiliations',
                'subtitle' => 'Trusted partnerships and collaborations',
                'content' => '<h2>Our Trusted Affiliations & Partnerships</h2>
<p>DITRP INDIA is affiliated with leading organizations in education and technology, ensuring our programs meet international standards.</p>

<h2>Government Affiliations</h2>
<p>We work closely with government bodies to align our programs with national education policies and skill development initiatives.</p>

<h2>Industry Partnerships</h2>
<p>Strategic partnerships with leading technology companies ensure our curriculum stays current with market demands.</p>

<h2>Academic Collaborations</h2>
<p>We collaborate with universities and academic institutions to provide comprehensive learning experiences.</p>',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'page' => 'accreditations',
                'section_key' => 'content',
                'title' => 'Accreditations',
                'subtitle' => 'Our recognized standards of excellence',
                'content' => '<h2>Our Accreditations & Certifications</h2>
<p>DITRP INDIA holds multiple accreditations validating the quality and credibility of our educational programs.</p>

<h2>Quality Standards</h2>
<p>Our programs comply with recognized quality frameworks and undergo periodic assessments and audits.</p>

<h2>Certification Authority</h2>
<p>As an accredited institution, we issue certifications recognized by employers. Our certificates include QR codes for instant verification.</p>

<h2>Verification</h2>
<p>All certifications can be verified through our online verification portal using the unique certificate number or QR code.</p>',
                'is_active' => true,
                'sort_order' => 1,
            ],
        ];

        foreach ($pages as $page) {
            PageSection::updateOrCreate(
                ['page' => $page['page'], 'section_key' => $page['section_key']],
                $page
            );
        }
    }
}
