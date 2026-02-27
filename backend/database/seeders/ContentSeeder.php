<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\HeroSlide;
use App\Models\Feature;
use App\Models\AboutSection;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Partner;
use App\Models\Faq;
use App\Models\GalleryItem;
use App\Models\Product;
use App\Models\JobUpdate;
use App\Models\Center;
use App\Models\PricingPlan;
use App\Models\Achievement;
use App\Models\PageSection;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSiteSettings();
        $this->seedHeroSlides();
        $this->seedFeatures();
        $this->seedAboutSections();
        $this->seedTeamMembers();
        $this->seedTestimonials();
        $this->seedPartners();
        $this->seedFaqs();
        $this->seedJobUpdates();
        $this->seedCenters();
        $this->seedPricingPlans();
        $this->seedAchievements();
        $this->seedPageSections();
        $this->seedProducts();
        $this->seedGalleryItems();
        $this->seedCourses();
    }

    private function seedSiteSettings(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'DigitalNexStep', 'group' => 'general', 'type' => 'text'],
            ['key' => 'site_tagline', 'value' => '#1 Educational Assessment Platform', 'group' => 'general', 'type' => 'text'],
            ['key' => 'contact_email', 'value' => 'info@digitalnexstep.com', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'contact_phone', 'value' => '(123) 456-7890', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'contact_address', 'value' => '123 Education Street, Suite 456, New York, NY 10001', 'group' => 'contact', 'type' => 'textarea'],
            ['key' => 'business_hours', 'value' => 'Monday - Friday: 9:00 AM - 6:00 PM', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'google_maps_embed', 'value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830921927!2d-74.11976378897398!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus', 'group' => 'contact', 'type' => 'textarea'],
            ['key' => 'google_maps_directions', 'value' => 'https://www.google.com/maps/dir//New+York,+NY', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/digitalnexstep', 'group' => 'social', 'type' => 'text'],
            ['key' => 'twitter_url', 'value' => 'https://twitter.com/digitalnexstep', 'group' => 'social', 'type' => 'text'],
            ['key' => 'linkedin_url', 'value' => 'https://linkedin.com/company/digitalnexstep', 'group' => 'social', 'type' => 'text'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/digitalnexstep', 'group' => 'social', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }

    private function seedHeroSlides(): void
    {
        $slides = [
            [
                'title' => 'Transform Your Educational Journey',
                'subtitle' => '#1 Educational Assessment Platform',
                'description' => 'Empower your institution with AI-powered assessments, real-time analytics, and seamless automation. Join 500+ leading educational centers worldwide.',
                'button_text' => 'Start Free Trial',
                'button_link' => '#contact',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'AI-Powered Assessments for Modern Education',
                'subtitle' => 'Next Generation Learning',
                'description' => 'Create, administer, and analyze assessments with cutting-edge AI technology. Transform how you measure learning outcomes.',
                'button_text' => 'Learn More',
                'button_link' => '#features',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Trusted by 500+ Educational Centers',
                'subtitle' => 'Nationwide Coverage',
                'description' => 'From small learning centers to large university systems, our platform powers assessments that drive real results.',
                'button_text' => 'View Centers',
                'button_link' => '#centers',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::updateOrCreate(['title' => $slide['title']], $slide);
        }
    }

    private function seedFeatures(): void
    {
        $features = [
            [
                'title' => 'Real-time Analytics',
                'description' => 'Monitor student performance and assessment metrics in real-time with comprehensive dashboards and insights.',
                'icon' => 'FiActivity',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Automated Grading',
                'description' => 'Save time with intelligent automated grading for objective questions, with manual override options for complex assessments.',
                'icon' => 'FiCheckCircle',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Custom Assessments',
                'description' => 'Create tailored assessments with our intuitive builder. Support for multiple question types, multimedia, and adaptive testing.',
                'icon' => 'FiEdit3',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Secure Platform',
                'description' => 'Enterprise-grade security with encrypted data, secure authentication, and compliance with educational standards.',
                'icon' => 'FiShield',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Multi-format Support',
                'description' => 'Support for various assessment formats including MCQs, essays, coding challenges, and multimedia submissions.',
                'icon' => 'FiFileText',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Detailed Reporting',
                'description' => 'Generate comprehensive reports with actionable insights. Export data for further analysis and stakeholder presentations.',
                'icon' => 'FiBarChart2',
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($features as $feature) {
            Feature::updateOrCreate(['title' => $feature['title']], $feature);
        }
    }

    private function seedAboutSections(): void
    {
        $sections = [
            [
                'title' => 'Empowering Education Through',
                'subtitle' => 'Innovation',
                'description' => "Founded with a vision to revolutionize educational assessments, DigitalNexStep has been at the forefront of educational technology for over a decade. We believe that assessment should be more than just testing—it should be a tool for growth, insight, and continuous improvement.\n\nOur platform is trusted by educational institutions nationwide, from small learning centers to large university systems. We combine cutting-edge technology with deep educational expertise to deliver solutions that truly make a difference.\n\nEvery day, we work to empower educators with the tools they need to assess fairly, grade efficiently, and understand student progress deeply. Our commitment to excellence drives everything we do.",
                'section_key' => 'about_main',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Our Vision',
                'subtitle' => 'Shaping the Future of Education',
                'description' => "To be the world's most trusted platform in educational assessment, enabling every institution to unlock the full potential of their students through technology-driven insights and innovation.",
                'section_key' => 'vision',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Our Mission',
                'subtitle' => 'Empowering Educators',
                'description' => 'To empower educators and institutions with intelligent, accessible, and reliable assessment solutions that inspire growth, celebrate achievements, and transform the way we measure learning.',
                'section_key' => 'mission',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($sections as $section) {
            AboutSection::updateOrCreate(['section_key' => $section['section_key']], $section);
        }
    }

    private function seedTeamMembers(): void
    {
        $members = [
            ['name' => 'Dr. Meena Iyer', 'designation' => 'Chief Academic Officer', 'bio' => 'Curriculum Design & EdTech Strategy. 20+ Years Experience.', 'is_active' => true, 'sort_order' => 1],
            ['name' => 'Rajesh Kumar', 'designation' => 'Head of Technology', 'bio' => 'AI/ML in Education & Platform Architecture. 15+ Years Experience.', 'is_active' => true, 'sort_order' => 2],
            ['name' => 'Dr. Sunita Rao', 'designation' => 'Director of Assessments', 'bio' => 'Psychometrics & Adaptive Testing. 18+ Years Experience.', 'is_active' => true, 'sort_order' => 3],
            ['name' => 'Amit Joshi', 'designation' => 'Senior Content Architect', 'bio' => 'Question Bank Design & Quality Assurance. 12+ Years Experience.', 'is_active' => true, 'sort_order' => 4],
            ['name' => 'Kavita Menon', 'designation' => 'Lead Data Scientist', 'bio' => 'Learning Analytics & Student Insights. 10+ Years Experience.', 'is_active' => true, 'sort_order' => 5],
            ['name' => 'Dr. Sanjay Gupta', 'designation' => 'Head of Research', 'bio' => 'Educational Psychology & Assessment Innovation. 22+ Years Experience.', 'is_active' => true, 'sort_order' => 6],
            ['name' => 'Neha Kapoor', 'designation' => 'UX Research Lead', 'bio' => 'Student Experience & Accessibility. 8+ Years Experience.', 'is_active' => true, 'sort_order' => 7],
            ['name' => 'Vikash Tiwari', 'designation' => 'Operations Director', 'bio' => 'Center Management & Training Programs. 14+ Years Experience.', 'is_active' => true, 'sort_order' => 8],
        ];

        foreach ($members as $member) {
            TeamMember::updateOrCreate(['name' => $member['name']], $member);
        }
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            ['name' => 'Dr. Anita Desai', 'designation' => 'Principal', 'company' => 'DPS International', 'content' => 'DigitalNexStep has completely transformed how we conduct assessments. The AI-powered analytics give us insights we never had before. Our student outcomes improved by 35% in just one year.', 'rating' => 5, 'is_active' => true, 'sort_order' => 1],
            ['name' => 'Prof. Ramesh Nair', 'designation' => 'Director', 'company' => 'National Institute of Education', 'content' => "The platform's reliability and depth of features are unmatched. We've been using it for 3 years and it continues to exceed expectations. The support team is incredibly responsive.", 'rating' => 5, 'is_active' => true, 'sort_order' => 2],
            ['name' => 'Shalini Gupta', 'designation' => 'Founder', 'company' => 'LearnBridge Academy', 'content' => 'As a growing ed-tech startup, we needed a robust assessment solution. DigitalNexStep provided exactly that – scalable, user-friendly, and backed by brilliant technology.', 'rating' => 5, 'is_active' => true, 'sort_order' => 3],
            ['name' => 'Karthik Venkatesh', 'designation' => 'COO', 'company' => 'EduStar Group', 'content' => 'We manage 50+ centers and DigitalNexStep handles our assessments flawlessly across all locations. The real-time reporting saves us hundreds of hours every month.', 'rating' => 5, 'is_active' => true, 'sort_order' => 4],
            ['name' => 'Meera Krishnan', 'designation' => 'Academic Head', 'company' => 'Sunshine Schools', 'content' => 'The personalized reports for each student are a game-changer. Parents love the detailed insights, and teachers can now focus on targeted improvement areas.', 'rating' => 5, 'is_active' => true, 'sort_order' => 5],
            ['name' => 'Arun Prakash', 'designation' => 'Managing Director', 'company' => 'TechEd Solutions', 'content' => 'Integration was seamless and the team walked us through every step. Their commitment to education technology is evident in every feature they build.', 'rating' => 5, 'is_active' => true, 'sort_order' => 6],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(['name' => $t['name']], $t);
        }
    }

    private function seedPartners(): void
    {
        $partners = [
            ['name' => 'EduTech Foundation', 'website_url' => '#', 'is_active' => true, 'sort_order' => 1],
            ['name' => 'National Board of Education', 'website_url' => '#', 'is_active' => true, 'sort_order' => 2],
            ['name' => 'CloudNet Systems', 'website_url' => '#', 'is_active' => true, 'sort_order' => 3],
            ['name' => 'SkillBridge Institute', 'website_url' => '#', 'is_active' => true, 'sort_order' => 4],
            ['name' => 'DataMinds Analytics', 'website_url' => '#', 'is_active' => true, 'sort_order' => 5],
            ['name' => 'Global Ed Alliance', 'website_url' => '#', 'is_active' => true, 'sort_order' => 6],
            ['name' => 'SecureTest Labs', 'website_url' => '#', 'is_active' => true, 'sort_order' => 7],
            ['name' => 'LearnPath AI', 'website_url' => '#', 'is_active' => true, 'sort_order' => 8],
        ];

        foreach ($partners as $p) {
            Partner::updateOrCreate(['name' => $p['name']], $p);
        }
    }

    private function seedFaqs(): void
    {
        $faqs = [
            ['question' => 'What types of assessments can I create with DigitalNexStep?', 'answer' => 'Our platform supports a wide variety of assessment types including multiple-choice questions, true/false, short answer, essay questions, fill-in-the-blank, matching, coding challenges, and multimedia submissions. You can mix and match question types to create comprehensive assessments tailored to your needs.', 'category' => 'general', 'is_active' => true, 'sort_order' => 1],
            ['question' => 'How secure is the platform?', 'answer' => 'Security is our top priority. We use bank-level encryption (AES-256) for all data at rest and in transit. Our platform is hosted on enterprise-grade servers with 99.9% uptime guarantee, regular security audits, and compliance with FERPA, COPPA, and GDPR regulations. We also offer features like secure browser lockdown and plagiarism detection.', 'category' => 'security', 'is_active' => true, 'sort_order' => 2],
            ['question' => 'Can I integrate DigitalNexStep with my existing LMS?', 'answer' => 'Yes! We offer seamless integration with popular Learning Management Systems including Canvas, Blackboard, Moodle, Google Classroom, and Schoology. Our API also allows for custom integrations with proprietary systems. Data syncs automatically, and single sign-on (SSO) is supported for a smooth user experience.', 'category' => 'integration', 'is_active' => true, 'sort_order' => 3],
            ['question' => 'What kind of analytics and reporting do you provide?', 'answer' => 'We provide comprehensive real-time analytics including individual student performance, class-wide statistics, question-level analysis, time-on-task metrics, and learning outcome tracking. Reports can be customized, scheduled, and exported in multiple formats (PDF, Excel, CSV). You can also create custom dashboards to track the metrics that matter most to you.', 'category' => 'features', 'is_active' => true, 'sort_order' => 4],
            ['question' => 'Is there a limit on the number of students or assessments?', 'answer' => 'Limits depend on your chosen plan. Our Basic plan supports up to 100 students, Professional up to 500, and Enterprise offers unlimited students. All plans include unlimited assessments. You can always upgrade your plan as your needs grow, and we offer educational discounts for qualifying institutions.', 'category' => 'pricing', 'is_active' => true, 'sort_order' => 5],
            ['question' => 'What kind of support do you offer?', 'answer' => 'We offer tiered support based on your plan. Basic includes email support with 24-hour response time, Professional adds priority support and live chat, and Enterprise includes 24/7 dedicated support with a phone hotline and assigned success manager. All plans include access to our comprehensive knowledge base, video tutorials, and regular training webinars.', 'category' => 'support', 'is_active' => true, 'sort_order' => 6],
            ['question' => 'Can students take assessments on mobile devices?', 'answer' => 'Absolutely! Our platform is fully responsive and works seamlessly on smartphones, tablets, laptops, and desktops. Students can take assessments on any device with an internet connection. The interface automatically adapts to screen size for optimal usability, and we support both iOS and Android devices.', 'category' => 'general', 'is_active' => true, 'sort_order' => 7],
            ['question' => 'How does the automated grading work?', 'answer' => 'Our intelligent grading engine automatically scores objective questions (multiple-choice, true/false, matching, etc.) instantly upon submission. For subjective questions like essays, we provide AI-assisted grading suggestions based on rubrics and keywords, but educators always have final review control. You can set up custom rubrics, partial credit rules, and grading workflows.', 'category' => 'features', 'is_active' => true, 'sort_order' => 8],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(['question' => $faq['question']], $faq);
        }
    }

    private function seedJobUpdates(): void
    {
        $jobs = [
            ['title' => 'Senior Content Developer', 'company' => 'DigitalNexStep', 'location' => 'Bangalore, India', 'type' => 'full-time', 'description' => 'We are looking for a Senior Content Developer to join our Academic Team. You will be responsible for creating high-quality educational content and assessments.', 'requirements' => 'Content development, Education background, Remote Option', 'salary_range' => '₹8L – ₹14L', 'is_active' => true],
            ['title' => 'Full Stack Developer', 'company' => 'DigitalNexStep', 'location' => 'Hyderabad, India', 'type' => 'full-time', 'description' => 'Join our Engineering team to build and maintain our cutting-edge assessment platform using React, Node.js, and TypeScript.', 'requirements' => 'React, Node.js, TypeScript', 'salary_range' => '₹12L – ₹22L', 'is_active' => true],
            ['title' => 'Data Analyst – EdTech', 'company' => 'DigitalNexStep', 'location' => 'Remote', 'type' => 'full-time', 'description' => 'Analyze educational data to derive insights that improve our platform. Work with Python, SQL, and advanced analytics tools.', 'requirements' => 'Python, SQL, Analytics', 'salary_range' => '₹7L – ₹12L', 'is_active' => true],
            ['title' => 'UI/UX Designer', 'company' => 'DigitalNexStep', 'location' => 'Mumbai, India', 'type' => 'full-time', 'description' => 'Design intuitive and accessible user experiences for our assessment platform. Proficiency in Figma and UX Research required.', 'requirements' => 'Figma, UX Research, Prototyping', 'salary_range' => '₹9L – ₹16L', 'is_active' => true],
            ['title' => 'Assessment Specialist', 'company' => 'DigitalNexStep', 'location' => 'Delhi, India', 'type' => 'contract', 'description' => 'Design and validate educational assessments using psychometric principles and quality assurance methodologies.', 'requirements' => 'Psychometrics, Testing, QA', 'salary_range' => '₹6L – ₹10L', 'is_active' => true],
            ['title' => 'Marketing Manager', 'company' => 'DigitalNexStep', 'location' => 'Bangalore, India', 'type' => 'full-time', 'description' => 'Lead our digital marketing efforts including SEO, content marketing, and growth strategies for our EdTech platform.', 'requirements' => 'Digital Marketing, SEO, Growth', 'salary_range' => '₹10L – ₹18L', 'is_active' => true],
        ];

        foreach ($jobs as $job) {
            JobUpdate::updateOrCreate(['title' => $job['title']], $job);
        }
    }

    private function seedCenters(): void
    {
        $centers = [
            ['name' => 'Excellence Learning Center', 'address' => 'New York City, NY', 'state' => 'New York', 'city' => 'New York City', 'is_active' => true, 'sort_order' => 1],
            ['name' => 'Bright Future Academy', 'address' => 'Los Angeles, CA', 'state' => 'California', 'city' => 'Los Angeles', 'is_active' => true, 'sort_order' => 2],
            ['name' => 'Knowledge Hub Institute', 'address' => 'Houston, TX', 'state' => 'Texas', 'city' => 'Houston', 'is_active' => true, 'sort_order' => 3],
            ['name' => 'Summit Education Center', 'address' => 'Miami, FL', 'state' => 'Florida', 'city' => 'Miami', 'is_active' => true, 'sort_order' => 4],
            ['name' => 'Pioneer Learning Solutions', 'address' => 'Chicago, IL', 'state' => 'Illinois', 'city' => 'Chicago', 'is_active' => true, 'sort_order' => 5],
            ['name' => 'Apex Assessment Center', 'address' => 'Philadelphia, PA', 'state' => 'Pennsylvania', 'city' => 'Philadelphia', 'is_active' => true, 'sort_order' => 6],
            ['name' => 'Catalyst Education Group', 'address' => 'Phoenix, AZ', 'state' => 'Arizona', 'city' => 'Phoenix', 'is_active' => true, 'sort_order' => 7],
            ['name' => 'Horizon Institute', 'address' => 'Atlanta, GA', 'state' => 'Georgia', 'city' => 'Atlanta', 'is_active' => true, 'sort_order' => 8],
            ['name' => 'Pinnacle Learning Center', 'address' => 'Seattle, WA', 'state' => 'Washington', 'city' => 'Seattle', 'is_active' => true, 'sort_order' => 9],
            ['name' => 'Elevate Assessment Hub', 'address' => 'Boston, MA', 'state' => 'Massachusetts', 'city' => 'Boston', 'is_active' => true, 'sort_order' => 10],
            ['name' => 'Gateway Education Center', 'address' => 'Detroit, MI', 'state' => 'Michigan', 'city' => 'Detroit', 'is_active' => true, 'sort_order' => 11],
            ['name' => 'Zenith Learning Institute', 'address' => 'Denver, CO', 'state' => 'Colorado', 'city' => 'Denver', 'is_active' => true, 'sort_order' => 12],
        ];

        foreach ($centers as $center) {
            Center::updateOrCreate(['name' => $center['name']], $center);
        }
    }

    private function seedPricingPlans(): void
    {
        $plans = [
            [
                'name' => 'Basic',
                'price' => 99.00,
                'duration' => 'month',
                'description' => 'Perfect for small learning centers',
                'features' => ['Up to 100 students', 'Basic assessments', 'Email support', 'Monthly reports', 'Standard security'],
                'is_popular' => false,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Professional',
                'price' => 299.00,
                'duration' => 'month',
                'description' => 'Ideal for growing institutions',
                'features' => ['Up to 500 students', 'Advanced assessments', 'Priority support', 'Real-time analytics', 'Custom branding', 'API access', 'Advanced reporting'],
                'is_popular' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Enterprise',
                'price' => 0.00,
                'duration' => 'Custom',
                'description' => 'For large-scale institutions',
                'features' => ['Unlimited students', 'All assessment types', '24/7 dedicated support', 'Advanced analytics', 'White-label solution', 'Custom integrations', 'SLA guarantee', 'Training & onboarding'],
                'is_popular' => false,
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($plans as $plan) {
            PricingPlan::updateOrCreate(['name' => $plan['name']], $plan);
        }
    }

    private function seedAchievements(): void
    {
        $achievements = [
            ['title' => 'Years of Experience', 'value' => '10', 'suffix' => '+', 'icon' => 'FiAward', 'description' => 'Over a decade of excellence in educational technology', 'is_active' => true, 'sort_order' => 1],
            ['title' => 'Centers Served', 'value' => '500', 'suffix' => '+', 'icon' => 'FiUsers', 'description' => 'Trusted by educational centers nationwide', 'is_active' => true, 'sort_order' => 2],
            ['title' => 'Students Assessed', 'value' => '1000000', 'suffix' => '+', 'icon' => 'FiTrendingUp', 'description' => 'Over a million students assessed on our platform', 'is_active' => true, 'sort_order' => 3],
            ['title' => 'Success Rate', 'value' => '98', 'suffix' => '%', 'icon' => 'FiCheckCircle', 'description' => 'Industry-leading success rate for our clients', 'is_active' => true, 'sort_order' => 4],
        ];

        foreach ($achievements as $a) {
            Achievement::updateOrCreate(['title' => $a['title']], $a);
        }
    }

    private function seedPageSections(): void
    {
        $sections = [
            // Home page sections
            [
                'page' => 'home',
                'section_key' => 'hero',
                'title' => 'Transform Your Educational Journey',
                'subtitle' => '#1 Educational Assessment Platform',
                'content' => 'Empower your institution with AI-powered assessments, real-time analytics, and seamless automation. Join 500+ leading educational centers worldwide.',
                'extra_data' => ([
                    'badge' => '#1 Educational Assessment Platform',
                    'cta_primary' => 'Start Free Trial',
                    'cta_primary_link' => '#contact',
                    'cta_secondary' => 'Watch Demo',
                    'highlights' => ['AI-Powered Grading', 'Real-time Analytics', 'Automated Workflows', '99.9% Uptime'],
                    'trust_educators' => '10,000+',
                    'trust_rating' => '4.9/5',
                    'stats' => [
                        ['label' => 'Active Students', 'value' => '1000000+'],
                        ['label' => 'Assessments Completed', 'value' => '5M+'],
                        ['label' => 'Success Rate', 'value' => '98%'],
                        ['label' => 'Time Saved', 'value' => '15hrs/week'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'page' => 'home',
                'section_key' => 'features_header',
                'title' => 'Everything You Need for Modern Assessment',
                'subtitle' => 'Our Features',
                'content' => 'Comprehensive tools designed to streamline your assessment workflow, enhance student engagement, and provide meaningful insights.',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'page' => 'home',
                'section_key' => 'vision_mission',
                'title' => 'Driven by Purpose, Guided by Vision',
                'subtitle' => 'Who We Are',
                'content' => 'We are committed to transforming the educational landscape through innovation, accessibility, and excellence in every step we take.',
                'extra_data' => ([
                    'vision_title' => 'Our Vision',
                    'vision_description' => "To be the world's most trusted platform in educational assessment, enabling every institution to unlock the full potential of their students through technology-driven insights and innovation.",
                    'vision_points' => [
                        'Become the global standard for educational assessment technology',
                        'Empower every learner with personalized, data-driven insights',
                        'Pioneer innovation that shapes the future of education',
                    ],
                    'mission_title' => 'Our Mission',
                    'mission_description' => 'To empower educators and institutions with intelligent, accessible, and reliable assessment solutions that inspire growth, celebrate achievements, and transform the way we measure learning.',
                    'mission_points' => [
                        'Deliver cutting-edge assessment tools that drive measurable outcomes',
                        'Create inclusive, accessible platforms for educators and students',
                        'Foster a culture of continuous improvement through smart analytics',
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'page' => 'home',
                'section_key' => 'why_choose_us',
                'title' => 'The Smart Choice for Modern Education',
                'subtitle' => 'Why Choose Us',
                'content' => "Join thousands of educational institutions that trust us to transform their assessment experience. Here's why we're the #1 choice for educators worldwide.",
                'extra_data' => ([
                    'reasons' => [
                        ['title' => 'Industry-Leading Expertise', 'description' => 'Over 10 years of experience in educational technology with award-winning solutions trusted by top institutions worldwide.', 'icon' => 'FiAward'],
                        ['title' => 'Uncompromising Security', 'description' => 'Bank-level encryption, FERPA & GDPR compliance, and regular security audits to keep your data safe and secure.', 'icon' => 'FiShield'],
                        ['title' => 'Lightning-Fast Performance', 'description' => 'Cloud-based infrastructure with 99.9% uptime guarantee. Assessments load instantly, even with thousands of students.', 'icon' => 'FiZap'],
                        ['title' => 'Exceptional Support', 'description' => "24/7 dedicated support team ready to help. Get answers within minutes, not days. We're here whenever you need us.", 'icon' => 'FiUsers'],
                        ['title' => 'Proven Results', 'description' => 'Institutions using our platform see 40% increase in student engagement and 30% reduction in grading time.', 'icon' => 'FiTrendingUp'],
                        ['title' => 'Student-Centered Design', 'description' => 'Intuitive interface designed with students in mind. Reduce anxiety, increase accessibility, and promote fairness.', 'icon' => 'FiHeart'],
                        ['title' => 'Save Valuable Time', 'description' => 'Automated workflows and smart features save educators 15+ hours per week, letting you focus on teaching.', 'icon' => 'FiClock'],
                        ['title' => 'Global Reach, Local Support', 'description' => 'Available in 25+ languages with local support teams. Serving institutions across 50+ countries worldwide.', 'icon' => 'FiGlobe'],
                    ],
                    'stats' => [
                        ['number' => '500+', 'label' => 'Educational Institutions'],
                        ['number' => '1M+', 'label' => 'Assessments Completed'],
                        ['number' => '98%', 'label' => 'Customer Satisfaction'],
                        ['number' => '15+', 'label' => 'Hours Saved Per Week'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'page' => 'home',
                'section_key' => 'explore_features',
                'title' => 'Explore Our Top Features',
                'subtitle' => '',
                'content' => 'Powerful management tools designed to streamline every aspect of your educational institution',
                'extra_data' => ([
                    'items' => [
                        ['title' => 'Student Management', 'description' => 'Comprehensive student profiles, enrollment tracking, and performance monitoring all in one place.', 'icon' => 'FiUsers'],
                        ['title' => 'Academics Management', 'description' => 'Streamline curriculum planning, course management, and academic scheduling effortlessly.', 'icon' => 'FiBook'],
                        ['title' => 'Slider Management', 'description' => 'Dynamic content carousel system for announcements, events, and important updates.', 'icon' => 'FiMonitor'],
                        ['title' => 'Teacher Management', 'description' => 'Manage faculty schedules, assignments, workload distribution, and performance tracking.', 'icon' => 'FiCalendar'],
                        ['title' => 'Session Year Management', 'description' => 'Configure academic sessions, semesters, terms, and manage year-end transitions smoothly.', 'icon' => 'FiClock'],
                        ['title' => 'Holiday Management', 'description' => 'Plan academic calendars, mark holidays, and schedule breaks with automated notifications.', 'icon' => 'FiSun'],
                        ['title' => 'Timetable Management', 'description' => 'Smart scheduling with conflict detection, automated timetable generation, and easy modifications.', 'icon' => 'FiCheckSquare'],
                        ['title' => 'Attendance Management', 'description' => 'Real-time attendance tracking, automated reports, and attendance pattern analysis.', 'icon' => 'FiCheckSquare'],
                        ['title' => 'Exam Management', 'description' => 'End-to-end exam lifecycle management from scheduling to result publication and analysis.', 'icon' => 'FiFileText'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'page' => 'home',
                'section_key' => 'robust_support',
                'title' => 'Robust Operational Support',
                'subtitle' => '',
                'content' => "Comprehensive support services to ensure your educational platform runs smoothly 24/7. We're committed to your success every step of the way.",
                'extra_data' => ([
                    'items' => [
                        ['title' => 'Cloud Based Solution', 'description' => 'Stay up-to-date with the latest learning materials and resources, without delays with real-time content updates.', 'icon' => 'FiCloud'],
                        ['title' => 'Simple and Trouble Free Installation', 'description' => 'Easy installation with our team of expert technicians along with access to comprehensive software suite.', 'icon' => 'FiTool'],
                        ['title' => 'Training and Service Support', 'description' => 'Dedicated training, maintenance and support team to resolve any issues promptly.', 'icon' => 'FiHeadphones'],
                        ['title' => '24/7 Technical Support', 'description' => 'Round-the-clock technical assistance available whenever you need help. Our team is always ready to assist.', 'icon' => 'FiClock'],
                        ['title' => 'Data Security & Backup', 'description' => 'Enterprise-grade security with automatic backups, ensuring your data is always safe and recoverable.', 'icon' => 'FiShield'],
                        ['title' => 'Regular Updates & Maintenance', 'description' => 'Automatic software updates and scheduled maintenance to keep your system running smoothly and efficiently.', 'icon' => 'FiZap'],
                    ],
                    'stats' => [
                        ['label' => 'Uptime Guarantee', 'value' => '99.9%'],
                        ['label' => 'Response Time', 'value' => '<5min'],
                        ['label' => 'Support Rating', 'value' => '4.9/5'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'page' => 'home',
                'section_key' => 'testimonials_header',
                'title' => 'Trusted by Educators Nationwide',
                'subtitle' => 'What People Say',
                'content' => 'Hear from the educators and institutions who have transformed their assessment experience with our platform.',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'page' => 'home',
                'section_key' => 'partners_header',
                'title' => 'Powered by Strategic Partnerships',
                'subtitle' => 'Our Partners',
                'content' => 'We collaborate with industry leaders and institutions to deliver world-class educational assessment solutions.',
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'page' => 'home',
                'section_key' => 'pricing_header',
                'title' => 'Choose Your Perfect Plan',
                'subtitle' => 'Pricing Plans',
                'content' => 'Flexible pricing designed to scale with your needs. All plans include our core features with no hidden fees.',
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'page' => 'home',
                'section_key' => 'achievers_header',
                'title' => 'Stars Who Shine Bright',
                'subtitle' => 'Our Achievers',
                'content' => 'Meet the extraordinary individuals who achieved their dreams with our platform. Their success stories inspire millions.',
                'is_active' => true,
                'sort_order' => 10,
            ],
            [
                'page' => 'home',
                'section_key' => 'staff_header',
                'title' => 'Meet the Experts Behind Our Success',
                'subtitle' => 'Our Experienced Staff',
                'content' => 'Our team of seasoned professionals brings decades of combined experience in education, technology, and assessment innovation.',
                'is_active' => true,
                'sort_order' => 11,
            ],
            [
                'page' => 'home',
                'section_key' => 'faq_header',
                'title' => 'Frequently Asked Questions',
                'subtitle' => 'FAQ',
                'content' => "Find answers to common questions about our platform. Can't find what you're looking for? Contact us.",
                'is_active' => true,
                'sort_order' => 12,
            ],
            [
                'page' => 'home',
                'section_key' => 'contact',
                'title' => "Let's Start a Conversation",
                'subtitle' => 'Get in Touch',
                'content' => "Have questions? We're here to help. Fill out the form and we'll get back to you within 24 hours.",
                'is_active' => true,
                'sort_order' => 13,
            ],
            [
                'page' => 'home',
                'section_key' => 'map',
                'title' => 'Our Location',
                'subtitle' => 'Visit Us',
                'content' => "We're conveniently located in the heart of the city. Stop by for a demo, consultation, or just to say hello!",
                'is_active' => true,
                'sort_order' => 14,
            ],
            [
                'page' => 'home',
                'section_key' => 'centers_header',
                'title' => 'Assessment Centers Nationwide',
                'subtitle' => 'Our Network',
                'content' => 'Find a trusted assessment center near you. Our network spans across the country, bringing quality assessments to your community.',
                'is_active' => true,
                'sort_order' => 15,
            ],
            [
                'page' => 'home',
                'section_key' => 'jobs_header',
                'title' => 'Join Our Growing Team',
                'subtitle' => 'Job Updates',
                'content' => "Explore exciting career opportunities and be part of the team that's revolutionizing education technology.",
                'is_active' => true,
                'sort_order' => 16,
            ],

            // ===== ABOUT PAGE =====
            [
                'page' => 'about',
                'section_key' => 'about_hero',
                'title' => 'Empowering Education Through Innovation',
                'subtitle' => 'About DigitalNexStep',
                'content' => 'We are on a mission to transform how educational institutions conduct assessments, leveraging cutting-edge technology to empower educators and students worldwide.',
                'extra_data' => ([
                    'badge' => 'About Us',
                    'cta_text' => 'Get Started Today',
                    'cta_link' => '#contact',
                ]),
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'page' => 'about',
                'section_key' => 'about_stats',
                'title' => 'Our Impact in Numbers',
                'subtitle' => 'Stats',
                'content' => '',
                'extra_data' => ([
                    'stats' => [
                        ['value' => '50000', 'suffix' => '+', 'label' => 'Students'],
                        ['value' => '200', 'suffix' => '+', 'label' => 'Courses'],
                        ['value' => '10', 'suffix' => '+', 'label' => 'Years'],
                        ['value' => '98', 'suffix' => '%', 'label' => 'Success Rate'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'page' => 'about',
                'section_key' => 'about_vision',
                'title' => 'Our Vision',
                'subtitle' => 'What We Envision',
                'content' => 'To be the global leader in educational assessment technology, making quality education accessible and measurable for every learner worldwide.',
                'extra_data' => ([
                    'features' => [
                        ['title' => 'Innovation First', 'description' => 'Continuously pushing boundaries with AI-powered assessment tools and adaptive learning technologies.'],
                        ['title' => 'Student-Centered', 'description' => 'Every feature we build starts with the student experience in mind, ensuring accessibility and engagement.'],
                        ['title' => 'Data-Driven Insights', 'description' => 'Transforming raw assessment data into actionable insights that drive educational improvement.'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'page' => 'about',
                'section_key' => 'about_mission',
                'title' => 'Our Mission',
                'subtitle' => 'What Drives Us',
                'content' => 'To empower educators and institutions with intelligent, accessible, and reliable assessment solutions that inspire growth and celebrate achievements.',
                'extra_data' => ([
                    'features' => [
                        ['title' => 'Empower Educators', 'description' => 'Providing tools that save time and enhance teaching effectiveness through smart automation.'],
                        ['title' => 'Ensure Quality', 'description' => 'Maintaining the highest standards in assessment design, delivery, and analysis.'],
                        ['title' => 'Drive Results', 'description' => 'Helping institutions achieve measurable improvements in student outcomes and operational efficiency.'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'page' => 'about',
                'section_key' => 'about_values',
                'title' => 'Our Core Values',
                'subtitle' => 'What We Stand For',
                'content' => 'These principles guide everything we do.',
                'extra_data' => ([
                    'values' => [
                        ['title' => 'Innovation', 'description' => 'We embrace new ideas and technologies to continuously improve our solutions.', 'icon' => 'FiZap'],
                        ['title' => 'Integrity', 'description' => 'We operate with honesty, transparency, and ethical standards in everything we do.', 'icon' => 'FiShield'],
                        ['title' => 'Inclusion', 'description' => 'We design for everyone, ensuring our platform is accessible to all learners.', 'icon' => 'FiHeart'],
                        ['title' => 'Impact', 'description' => 'We measure success by the positive change we create in education.', 'icon' => 'FiTrendingUp'],
                        ['title' => 'Excellence', 'description' => 'We pursue the highest quality in every product and service we deliver.', 'icon' => 'FiStar'],
                        ['title' => 'Collaboration', 'description' => 'We work together with educators, students, and partners to achieve shared goals.', 'icon' => 'FiUsers'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'page' => 'about',
                'section_key' => 'about_milestones',
                'title' => 'Key Milestones',
                'subtitle' => 'Our Journey',
                'content' => '',
                'extra_data' => ([
                    'milestones' => [
                        ['year' => '2014', 'title' => 'Company Founded', 'description' => 'Started with a vision to digitize educational assessments.'],
                        ['year' => '2016', 'title' => 'First 100 Centers', 'description' => 'Reached 100 assessment centers across the country.'],
                        ['year' => '2018', 'title' => 'AI Integration', 'description' => 'Launched AI-powered grading and analytics engine.'],
                        ['year' => '2020', 'title' => 'Remote Assessment', 'description' => 'Pioneered remote proctored assessments during the pandemic.'],
                        ['year' => '2022', 'title' => '500+ Centers', 'description' => 'Expanded to over 500 centers nationwide.'],
                        ['year' => '2024', 'title' => '1M+ Assessments', 'description' => 'Crossed 1 million assessments conducted on our platform.'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 6,
            ],

            // ===== CONTACT PAGE =====
            [
                'page' => 'contact',
                'section_key' => 'contact_hero',
                'title' => 'Get in Touch',
                'subtitle' => 'Contact Us',
                'content' => "We'd love to hear from you. Reach out and we'll respond within 24 hours.",
                'extra_data' => ([
                    'contact_info' => [
                        ['icon' => 'FiMapPin', 'title' => 'Visit Us', 'details' => '123 Education Street, Suite 456, New York, NY 10001', 'sub' => 'Mon-Fri, 9AM-6PM'],
                        ['icon' => 'FiPhone', 'title' => 'Call Us', 'details' => '(123) 456-7890', 'sub' => 'Mon-Fri 9AM-6PM EST'],
                        ['icon' => 'FiMail', 'title' => 'Email Us', 'details' => 'info@digitalnexstep.com', 'sub' => 'We reply within 24 hours'],
                        ['icon' => 'FiClock', 'title' => 'Business Hours', 'details' => 'Mon-Fri: 9AM-6PM, Sat: 10AM-2PM', 'sub' => 'Sunday: Closed'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 1,
            ],

            // ===== COURSES PAGE =====
            [
                'page' => 'courses',
                'section_key' => 'courses_hero',
                'title' => 'Explore Our Courses',
                'subtitle' => 'Course Catalog',
                'content' => 'Discover a wide range of courses designed to help you master new skills and advance your career.',
                'extra_data' => ([
                    'categories' => ['All', 'Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'AI & ML'],
                ]),
                'is_active' => true,
                'sort_order' => 1,
            ],

            // ===== FRANCHISE DETAILS PAGE =====
            [
                'page' => 'franchise-details',
                'section_key' => 'franchise_hero',
                'title' => 'Partner With Us for Educational Excellence',
                'subtitle' => 'Franchise Opportunity',
                'content' => 'Join our growing network of educational centers and bring quality assessment solutions to your community.',
                'extra_data' => ([
                    'stats' => [
                        ['value' => '200', 'suffix' => '+', 'label' => 'Courses'],
                        ['value' => '500', 'suffix' => '+', 'label' => 'Franchise Centers'],
                        ['value' => '10000', 'suffix' => '+', 'label' => 'Students Placed'],
                        ['value' => '15', 'suffix' => '+', 'label' => 'Years Experience'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'page' => 'franchise-details',
                'section_key' => 'franchise_about',
                'title' => 'About DITRP',
                'subtitle' => 'Who We Are',
                'content' => 'DITRP (Digital IT Resource Provider) is a pioneering organization dedicated to bridging the gap between education and employment. With over 15 years of experience, we have established ourselves as a trusted name in the education and technology sector.',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'page' => 'franchise-details',
                'section_key' => 'franchise_certifications',
                'title' => 'Our Certifications',
                'subtitle' => 'Quality Assured',
                'content' => 'We are certified by internationally recognized bodies ensuring the highest quality standards.',
                'extra_data' => ([
                    'certifications' => [
                        ['title' => 'ISO 9001:2008 (JAS-ANZ)', 'description' => 'Certified by Equalitas Certifications Ltd.', 'icon' => 'FiAward'],
                        ['title' => 'ISO 9001:2008 (UASL)', 'description' => 'Quality management system certification.', 'icon' => 'FiShield'],
                        ['title' => 'Employment Exchange Recognition', 'description' => 'Government recognized for employment services.', 'icon' => 'FiGlobe'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'page' => 'franchise-details',
                'section_key' => 'franchise_why_choose',
                'title' => 'Why Choose DITRP',
                'subtitle' => 'Benefits',
                'content' => 'Our franchise model offers unmatched advantages.',
                'extra_data' => ([
                    'benefits' => [
                        ['title' => '200+ Courses', 'description' => 'Wide range of industry-relevant courses and certifications.', 'icon' => 'FiBookOpen'],
                        ['title' => 'Quality Assurance', 'description' => 'ISO certified and government recognized quality standards.', 'icon' => 'FiShield'],
                        ['title' => 'Placement Support', 'description' => 'Dedicated placement cell for student career guidance.', 'icon' => 'FiBriefcase'],
                        ['title' => 'Industry Tie-ups', 'description' => 'Strong partnerships with leading companies for internships.', 'icon' => 'FiUsers'],
                        ['title' => 'IT Association', 'description' => 'Member of major IT associations and educational bodies.', 'icon' => 'FiCpu'],
                        ['title' => 'Growth Together', 'description' => 'Continuous support and training for franchise partners.', 'icon' => 'FiTrendingUp'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'page' => 'franchise-details',
                'section_key' => 'franchise_process',
                'title' => 'Franchise Process',
                'subtitle' => 'How It Works',
                'content' => 'Simple 4-step process to become a franchise partner.',
                'extra_data' => ([
                    'steps' => [
                        ['step' => 1, 'title' => 'Enquiry', 'description' => 'Submit your franchise enquiry through our online form or contact us directly.'],
                        ['step' => 2, 'title' => 'Verification', 'description' => 'Our team will verify your details and conduct a preliminary assessment.'],
                        ['step' => 3, 'title' => 'Documentation', 'description' => 'Complete the required documentation and agreement process.'],
                        ['step' => 4, 'title' => 'Approval & Launch', 'description' => 'Get approved and launch your center with our full support.'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 5,
            ],

            // ===== STUDENT CORNER PAGE =====
            [
                'page' => 'student-corner',
                'section_key' => 'student_hero',
                'title' => 'Your Learning Journey Starts Here',
                'subtitle' => 'Student Corner',
                'content' => 'Everything you need to excel in your studies and assessments.',
                'extra_data' => ([
                    'stats' => [
                        ['value' => '50000', 'suffix' => '+', 'label' => 'Active Students'],
                        ['value' => '120000', 'suffix' => '+', 'label' => 'Courses Completed'],
                        ['value' => '96', 'suffix' => '%', 'label' => 'Success Rate'],
                        ['value' => '34', 'suffix' => '%', 'label' => 'Avg Score Boost'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'page' => 'student-corner',
                'section_key' => 'student_benefits',
                'title' => 'Why Students Love Us',
                'subtitle' => 'Benefits',
                'content' => 'Discover the features that make learning better.',
                'extra_data' => ([
                    'benefits' => [
                        ['title' => 'Personalized Learning Path', 'description' => 'AI-powered personalized study plans tailored to your strengths and weaknesses.', 'icon' => 'FiTarget'],
                        ['title' => 'Real-Time Progress Tracking', 'description' => 'Track your performance with detailed analytics and improvement suggestions.', 'icon' => 'FiBarChart2'],
                        ['title' => 'Practice Anytime, Anywhere', 'description' => 'Access your courses and practice tests on any device, anytime.', 'icon' => 'FiSmartphone'],
                        ['title' => 'Instant Result & Feedback', 'description' => 'Get immediate results with detailed explanations for every question.', 'icon' => 'FiCheckCircle'],
                        ['title' => 'Certificates & Badges', 'description' => 'Earn recognized certificates and achievement badges for your accomplishments.', 'icon' => 'FiAward'],
                        ['title' => 'Secure & Fair Exams', 'description' => 'Advanced proctoring ensures a fair and secure exam environment for all.', 'icon' => 'FiShield'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'page' => 'student-corner',
                'section_key' => 'student_how_it_works',
                'title' => 'How It Works',
                'subtitle' => 'Getting Started',
                'content' => 'Start your journey in 5 simple steps.',
                'extra_data' => ([
                    'steps' => [
                        ['step' => 1, 'title' => 'Sign Up', 'description' => 'Create your free account in minutes.'],
                        ['step' => 2, 'title' => 'Smart Plan', 'description' => 'Get a personalized study plan based on your goals.'],
                        ['step' => 3, 'title' => 'Practice', 'description' => 'Take practice tests and learn from detailed explanations.'],
                        ['step' => 4, 'title' => 'Track', 'description' => 'Monitor your progress with real-time analytics.'],
                        ['step' => 5, 'title' => 'Ace Exam', 'description' => 'Confidently take your exam and achieve great results.'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'page' => 'student-corner',
                'section_key' => 'student_features',
                'title' => 'Platform Features',
                'subtitle' => 'Everything You Need',
                'content' => 'Our platform is packed with features designed for student success.',
                'extra_data' => ([
                    'features' => [
                        ['title' => 'Mobile Friendly', 'description' => 'Study on the go with our fully responsive mobile experience.', 'icon' => 'FiSmartphone'],
                        ['title' => 'Multi-Language', 'description' => 'Available in multiple languages for a global audience.', 'icon' => 'FiGlobe'],
                        ['title' => 'Chapter-Wise Tests', 'description' => 'Focus on specific topics with chapter-wise test series.', 'icon' => 'FiBookOpen'],
                        ['title' => 'AI Doubt Solver', 'description' => 'Get instant answers to your doubts with our AI assistant.', 'icon' => 'FiCpu'],
                        ['title' => 'Leaderboard', 'description' => 'Compete with peers and track your ranking.', 'icon' => 'FiTrendingUp'],
                        ['title' => 'Discussion Forum', 'description' => 'Connect with fellow students and educators.', 'icon' => 'FiMessageCircle'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'page' => 'student-corner',
                'section_key' => 'student_testimonials',
                'title' => 'Student Success Stories',
                'subtitle' => 'Hear From Our Students',
                'content' => '',
                'extra_data' => ([
                    'testimonials' => [
                        ['name' => 'Priya Sharma', 'achievement' => 'JEE Advanced - AIR 342', 'quote' => 'The personalized study plans and detailed analytics helped me identify my weak areas and improve systematically. I could not have achieved this without DigitalNexStep.'],
                        ['name' => 'Rahul Verma', 'achievement' => 'NEET UG - 680/720', 'quote' => 'The chapter-wise tests and AI-powered doubt solving made my preparation incredibly efficient. The platform is a game-changer for medical aspirants.'],
                        ['name' => 'Ananya Iyer', 'achievement' => 'UPSC Prelims - Cleared', 'quote' => 'The comprehensive test series and real-time performance tracking gave me the confidence to clear one of the toughest exams in the country.'],
                        ['name' => 'Mohammed Faisal', 'achievement' => 'CAT - 99.2 percentile', 'quote' => 'The adaptive mock tests closely simulated the actual exam experience. The analytics showed me exactly where I needed to improve.'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 5,
            ],

            // ===== VERIFICATION PAGE =====
            [
                'page' => 'verification',
                'section_key' => 'verification_hero',
                'title' => 'Certificate Verification Portal',
                'subtitle' => 'Verify Credentials',
                'content' => 'Verify the authenticity of certificates and ATC credentials issued by our platform.',
                'extra_data' => ([
                    'branches' => [
                        ['name' => 'Delhi (Head Office)', 'address' => '123, Connaught Place, New Delhi - 110001', 'phone' => '+91-11-XXXX-XXXX', 'email' => 'delhi@digitalnexstep.com'],
                        ['name' => 'Mumbai', 'address' => '456, Bandra West, Mumbai - 400050', 'phone' => '+91-22-XXXX-XXXX', 'email' => 'mumbai@digitalnexstep.com'],
                        ['name' => 'Bangalore', 'address' => '789, Koramangala, Bangalore - 560034', 'phone' => '+91-80-XXXX-XXXX', 'email' => 'bangalore@digitalnexstep.com'],
                        ['name' => 'Hyderabad', 'address' => '321, HITEC City, Hyderabad - 500081', 'phone' => '+91-40-XXXX-XXXX', 'email' => 'hyderabad@digitalnexstep.com'],
                        ['name' => 'Chennai', 'address' => '654, Anna Nagar, Chennai - 600040', 'phone' => '+91-44-XXXX-XXXX', 'email' => 'chennai@digitalnexstep.com'],
                        ['name' => 'Kolkata', 'address' => '987, Salt Lake City, Kolkata - 700091', 'phone' => '+91-33-XXXX-XXXX', 'email' => 'kolkata@digitalnexstep.com'],
                    ],
                    'partner_portals' => [
                        ['name' => 'DITR India', 'url' => 'https://ditrindia.com'],
                        ['name' => 'DITRP India', 'url' => 'https://ditrpindia.com'],
                    ],
                ]),
                'is_active' => true,
                'sort_order' => 1,
            ],

            // ===== GALLERY PAGE =====
            [
                'page' => 'gallery',
                'section_key' => 'gallery_hero',
                'title' => 'Our Gallery',
                'subtitle' => 'Explore',
                'content' => 'A visual journey through our events, achievements, and milestones.',
                'extra_data' => ([
                    'categories' => ['all', 'images', 'news', 'awards', 'videos'],
                ]),
                'is_active' => true,
                'sort_order' => 1,
            ],

            // ===== PRODUCTS PAGE =====
            [
                'page' => 'products',
                'section_key' => 'products_hero',
                'title' => 'Our Products',
                'subtitle' => 'Solutions',
                'content' => 'Discover our suite of educational technology products designed to transform learning and assessment.',
                'is_active' => true,
                'sort_order' => 1,
            ],

            // ===== FEATURES PAGE =====
            [
                'page' => 'features',
                'section_key' => 'features_hero',
                'title' => 'Powerful Features for Modern Education',
                'subtitle' => 'Platform Features',
                'content' => 'Explore the comprehensive suite of tools and capabilities that make DigitalNexStep the leading assessment platform.',
                'is_active' => true,
                'sort_order' => 1,
            ],
        ];

        foreach ($sections as $section) {
            PageSection::updateOrCreate(
                ['page' => $section['page'], 'section_key' => $section['section_key']],
                $section
            );
        }
    }

    private function seedProducts(): void
    {
        $products = [
            ['title' => 'Assessment Builder Pro', 'description' => 'Create professional assessments with our intuitive drag-and-drop builder. Supports multiple question types and adaptive testing.', 'icon' => 'FiEdit3', 'tags' => (['Assessment', 'Builder', 'AI']), 'is_active' => true, 'sort_order' => 1],
            ['title' => 'Analytics Dashboard', 'description' => 'Real-time analytics and reporting dashboard with customizable widgets, export options, and automated insights.', 'icon' => 'FiBarChart2', 'tags' => (['Analytics', 'Reports', 'Dashboard']), 'is_active' => true, 'sort_order' => 2],
            ['title' => 'Student Portal', 'description' => 'A comprehensive student portal for taking assessments, viewing results, and tracking learning progress.', 'icon' => 'FiUsers', 'tags' => (['Students', 'Portal', 'Learning']), 'is_active' => true, 'sort_order' => 3],
            ['title' => 'Center Management System', 'description' => 'End-to-end management solution for assessment centers including scheduling, resource allocation, and reporting.', 'icon' => 'FiMonitor', 'tags' => (['Management', 'Centers', 'Scheduling']), 'is_active' => true, 'sort_order' => 4],
            ['title' => 'AI Grading Engine', 'description' => 'Intelligent automated grading for essays, coding assignments, and complex responses with detailed feedback generation.', 'icon' => 'FiZap', 'tags' => (['AI', 'Grading', 'Automation']), 'is_active' => true, 'sort_order' => 5],
            ['title' => 'Secure Browser', 'description' => 'Enterprise-grade secure browser that prevents cheating during online assessments with proctoring capabilities.', 'icon' => 'FiShield', 'tags' => (['Security', 'Proctoring', 'Browser']), 'is_active' => true, 'sort_order' => 6],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['title' => $product['title']], $product);
        }
    }

    private function seedGalleryItems(): void
    {
        $items = [
            ['title' => 'Annual Education Summit 2024', 'description' => 'Our annual education summit bringing together educators from across the country.', 'category' => 'images', 'date' => '2024-11-15', 'is_active' => true, 'sort_order' => 1],
            ['title' => 'Best EdTech Platform Award', 'description' => 'DigitalNexStep wins the Best EdTech Platform award at the National Education Awards.', 'category' => 'awards', 'date' => '2024-09-20', 'is_active' => true, 'sort_order' => 2],
            ['title' => 'New AI Features Launch', 'description' => 'Introducing our new AI-powered grading and analytics features.', 'category' => 'news', 'date' => '2024-10-01', 'is_active' => true, 'sort_order' => 3],
            ['title' => 'Teacher Training Workshop', 'description' => 'Training educators to leverage our platform for better assessment outcomes.', 'category' => 'images', 'date' => '2024-08-10', 'is_active' => true, 'sort_order' => 4],
            ['title' => 'Platform Demo Video', 'description' => 'Watch how DigitalNexStep transforms the assessment experience.', 'category' => 'videos', 'video_url' => 'https://youtube.com/watch?v=example', 'is_active' => true, 'sort_order' => 5],
            ['title' => 'Innovation in Education Award', 'description' => 'Recognized for innovation in educational technology at the Global EdTech Summit.', 'category' => 'awards', 'date' => '2024-07-15', 'is_active' => true, 'sort_order' => 6],
        ];

        foreach ($items as $item) {
            GalleryItem::updateOrCreate(['title' => $item['title']], $item);
        }
    }

    private function seedCourses(): void
    {
        $courses = [
            [
                'title' => 'Complete Web Development Bootcamp 2024',
                'slug' => 'complete-web-development-bootcamp-2024',
                'description' => 'Master HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and land your dream developer job.',
                'category' => 'Web Development',
                'badge' => 'Bestseller',
                'instructor_name' => 'Dr. Alex Morgan',
                'instructor_role' => 'Senior Web Developer & Educator',
                'mrp' => 4999,
                'price' => 499,
                'duration' => '6 Months',
                'rating' => 4.8,
                'reviews_count' => 12430,
                'enrolled_count' => 2450,
                'lectures_count' => 120,
                'videos_count' => 85,
                'notes_count' => 45,
                'has_certificate' => true,
                'tags' => ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Data Science & Machine Learning with Python',
                'slug' => 'data-science-machine-learning-python',
                'description' => 'Learn data analysis, visualization, machine learning, and deep learning with Python from scratch.',
                'category' => 'Data Science',
                'badge' => 'Hot',
                'instructor_name' => 'Prof. Sarah Chen',
                'instructor_role' => 'Data Science Lead at TechCorp',
                'mrp' => 5999,
                'price' => 599,
                'duration' => '8 Months',
                'rating' => 4.7,
                'reviews_count' => 8920,
                'enrolled_count' => 1890,
                'lectures_count' => 140,
                'videos_count' => 110,
                'notes_count' => 60,
                'has_certificate' => true,
                'tags' => ['Python', 'ML', 'Data Science', 'TensorFlow'],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'UI/UX Design Masterclass',
                'slug' => 'ui-ux-design-masterclass',
                'description' => 'Master Figma, user research, wireframing, prototyping, and design systems. Build a professional portfolio.',
                'category' => 'Design',
                'badge' => 'New',
                'instructor_name' => 'Maya Patel',
                'instructor_role' => 'UX Lead at DesignHub',
                'mrp' => 3999,
                'price' => 399,
                'duration' => '4 Months',
                'rating' => 4.9,
                'reviews_count' => 5640,
                'enrolled_count' => 1340,
                'lectures_count' => 80,
                'videos_count' => 65,
                'notes_count' => 30,
                'has_certificate' => true,
                'tags' => ['Figma', 'UX Research', 'Prototyping', 'Design'],
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Advanced React & Next.js',
                'slug' => 'advanced-react-nextjs',
                'description' => 'Build production-ready applications with React 18, Next.js 14, TypeScript, and modern best practices.',
                'category' => 'Web Development',
                'badge' => 'Trending',
                'instructor_name' => 'Jason Lee',
                'instructor_role' => 'Frontend Architect at Meta',
                'mrp' => 4499,
                'price' => 449,
                'duration' => '5 Months',
                'rating' => 4.8,
                'reviews_count' => 7210,
                'enrolled_count' => 1670,
                'lectures_count' => 100,
                'videos_count' => 80,
                'notes_count' => 40,
                'has_certificate' => true,
                'tags' => ['React', 'Next.js', 'TypeScript', 'Redux'],
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Digital Marketing Strategy & Growth Hacking',
                'slug' => 'digital-marketing-growth-hacking',
                'description' => 'Master SEO, social media marketing, content strategy, paid ads, and analytics to drive business growth.',
                'category' => 'Marketing',
                'badge' => 'Popular',
                'instructor_name' => 'Priya Kapoor',
                'instructor_role' => 'CMO at GrowthLab',
                'mrp' => 3499,
                'price' => 349,
                'duration' => '3 Months',
                'rating' => 4.6,
                'reviews_count' => 4350,
                'enrolled_count' => 980,
                'lectures_count' => 70,
                'videos_count' => 55,
                'notes_count' => 25,
                'has_certificate' => true,
                'tags' => ['SEO', 'Social Media', 'Analytics', 'Growth'],
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'AI & Deep Learning with TensorFlow',
                'slug' => 'ai-deep-learning-tensorflow',
                'description' => 'Deep dive into neural networks, CNNs, RNNs, GANs, and transformers with hands-on TensorFlow projects.',
                'category' => 'AI & ML',
                'badge' => 'Advanced',
                'instructor_name' => 'Dr. Raj Mehta',
                'instructor_role' => 'AI Researcher at Google',
                'mrp' => 6999,
                'price' => 699,
                'duration' => '10 Months',
                'rating' => 4.9,
                'reviews_count' => 6780,
                'enrolled_count' => 1560,
                'lectures_count' => 160,
                'videos_count' => 130,
                'notes_count' => 70,
                'has_certificate' => true,
                'tags' => ['AI', 'Deep Learning', 'TensorFlow', 'Python'],
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'title' => 'Business Analytics & Financial Modeling',
                'slug' => 'business-analytics-financial-modeling',
                'description' => 'Learn Excel, SQL, Tableau, and financial modeling techniques used by top consulting firms.',
                'category' => 'Business',
                'badge' => '',
                'instructor_name' => 'Vikram Singh',
                'instructor_role' => 'Finance Director at Deloitte',
                'mrp' => 4299,
                'price' => 429,
                'duration' => '5 Months',
                'rating' => 4.5,
                'reviews_count' => 3210,
                'enrolled_count' => 760,
                'lectures_count' => 90,
                'videos_count' => 70,
                'notes_count' => 35,
                'has_certificate' => true,
                'tags' => ['Excel', 'SQL', 'Tableau', 'Finance'],
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'title' => 'Graphic Design Fundamentals with Adobe Suite',
                'slug' => 'graphic-design-adobe-suite',
                'description' => 'Master Photoshop, Illustrator, and InDesign. Create stunning designs for print and digital media.',
                'category' => 'Design',
                'badge' => '',
                'instructor_name' => 'Nisha Gupta',
                'instructor_role' => 'Creative Director at ArtStudio',
                'mrp' => 2999,
                'price' => 299,
                'duration' => '3 Months',
                'rating' => 4.7,
                'reviews_count' => 4890,
                'enrolled_count' => 1120,
                'lectures_count' => 75,
                'videos_count' => 60,
                'notes_count' => 20,
                'has_certificate' => true,
                'tags' => ['Photoshop', 'Illustrator', 'InDesign', 'Design'],
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'title' => 'Full-Stack Python: Django, REST APIs & Deployment',
                'slug' => 'fullstack-python-django',
                'description' => 'Build complete web applications with Django, Django REST Framework, PostgreSQL, and deploy to AWS.',
                'category' => 'Web Development',
                'badge' => '',
                'instructor_name' => 'Arjun Reddy',
                'instructor_role' => 'Backend Lead at Amazon',
                'mrp' => 4999,
                'price' => 499,
                'duration' => '7 Months',
                'rating' => 4.6,
                'reviews_count' => 5670,
                'enrolled_count' => 1350,
                'lectures_count' => 110,
                'videos_count' => 90,
                'notes_count' => 50,
                'has_certificate' => true,
                'tags' => ['Python', 'Django', 'REST API', 'AWS'],
                'is_active' => true,
                'sort_order' => 9,
            ],
        ];

        foreach ($courses as $course) {
            Course::updateOrCreate(['slug' => $course['slug']], $course);
        }
    }
}
