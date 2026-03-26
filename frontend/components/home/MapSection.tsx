"use client";

import React from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiExternalLink } from "react-icons/fi";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";
import { useApi } from "@/lib/useApi";
import api from "@/lib/api";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

const MapSection: React.FC = () => {
  const { data: apiSections } = useApi(() => api.getPageSections("home"), [] as any[]);
  const sectionData = apiSections.find((s: any) => s.section_key === "map");

  const settings = useSiteSettings();

  const address = settings?.contact_address || "";
  const phone = settings?.contact_phone || "";
  const email = settings?.contact_email || "";
  const businessHours = settings?.business_hours || null;
  const mapUrl = settings?.google_maps_embed || "";
  const directionsUrl = settings?.google_maps_directions || "";

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Column */}
          <AnimatedSection animation="slide-right">
            <div className="h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-strong border border-gray-200 dark:border-gray-700">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
                className="w-full h-full"
              />
            </div>
          </AnimatedSection>

          {/* Contact Info Column */}
          <AnimatedSection animation="slide-left" delay={0.2}>
            <div className="h-full flex flex-col justify-center space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
                  Visit Us
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {sectionData?.title ? (
                    <span dangerouslySetInnerHTML={{ __html: sectionData.title }} />
                  ) : (
                    <>
                      Our{" "}
                      <span className="gradient-text">Location</span>
                    </>
                  )}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {sectionData?.subtitle ||
                    "We're conveniently located in the heart of the city. Stop by for a demo, consultation, or just to say hello!"}
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors-smooth">
                    <FiMapPin className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors-smooth" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">Address</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {address.split("\n").map((line: string, i: number) => (
                        <React.Fragment key={i}>
                          {i > 0 && <br />}
                          {line}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors-smooth">
                    <FiPhone className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors-smooth" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">Phone</h3>
                    <a
                      href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-lg transition-colors-smooth"
                    >
                      {phone}
                    </a>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors-smooth">
                    <FiMail className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors-smooth" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">Email</h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-lg transition-colors-smooth"
                    >
                      {email}
                    </a>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-600 dark:group-hover:bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors-smooth">
                    <FiClock className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors-smooth" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-lg">Business Hours</h3>
                    <div className="text-gray-600 dark:text-gray-300">
                      {businessHours ? (
                        businessHours.split("\n").map((line: string, i: number) => (
                          <p key={i}>{line}</p>
                        ))
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <div className="pt-4">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors-smooth shadow-md hover:shadow-lg"
                >
                  <FiExternalLink className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
};

export default MapSection;
