"use client";

import React from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiExternalLink } from "react-icons/fi";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";

const MapSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Column */}
          <AnimatedSection animation="slide-right">
            <div className="h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-strong">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830921927!2d-74.11976378897398!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
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
                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
                  Visit Us
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                  Our{" "}
                  <span className="gradient-text">Location</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We're conveniently located in the heart of the city. Stop by for a demo,
                  consultation, or just to say hello!
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors-smooth">
                    <FiMapPin className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors-smooth" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">Address</h3>
                    <p className="text-gray-600 leading-relaxed">
                      123 Education Street, Suite 456
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors-smooth">
                    <FiPhone className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors-smooth" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-primary-600 hover:text-primary-700 font-medium text-lg transition-colors-smooth"
                    >
                      (123) 456-7890
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors-smooth">
                    <FiMail className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors-smooth" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">Email</h3>
                    <a
                      href="mailto:info@digitalnexstep.com"
                      className="text-primary-600 hover:text-primary-700 font-medium text-lg transition-colors-smooth"
                    >
                      info@digitalnexstep.com
                    </a>
                    <p className="text-gray-500 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors-smooth">
                    <FiClock className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors-smooth" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">Business Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <div className="pt-4">
                <a
                  href="https://www.google.com/maps/dir//New+York,+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors-smooth shadow-md hover:shadow-lg"
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
