"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiExternalLink } from "react-icons/fi";
import Card from "../ui/Card";
import Container from "../ui/Container";
import AnimatedSection from "../ui/AnimatedSection";

// Mock data - in real implementation, this would come from API
const mockCenters = [
  { id: 1, name: "Excellence Learning Center", state: "New York", city: "New York City", logo: "ELC" },
  { id: 2, name: "Bright Future Academy", state: "California", city: "Los Angeles", logo: "BFA" },
  { id: 3, name: "Knowledge Hub Institute", state: "Texas", city: "Houston", logo: "KHI" },
  { id: 4, name: "Summit Education Center", state: "Florida", city: "Miami", logo: "SEC" },
  { id: 5, name: "Pioneer Learning Solutions", state: "Illinois", city: "Chicago", logo: "PLS" },
  { id: 6, name: "Apex Assessment Center", state: "Pennsylvania", city: "Philadelphia", logo: "AAC" },
  { id: 7, name: "Catalyst Education Group", state: "Arizona", city: "Phoenix", logo: "CEG" },
  { id: 8, name: "Horizon Institute", state: "Georgia", city: "Atlanta", logo: "HI" },
  { id: 9, name: "Pinnacle Learning Center", state: "Washington", city: "Seattle", logo: "PLC" },
  { id: 10, name: "Elevate Assessment Hub", state: "Massachusetts", city: "Boston", logo: "EAH" },
  { id: 11, name: "Gateway Education Center", state: "Michigan", city: "Detroit", logo: "GEC" },
  { id: 12, name: "Zenith Learning Institute", state: "Colorado", city: "Denver", logo: "ZLI" },
];

const states = ["All States", ...Array.from(new Set(mockCenters.map((c) => c.state)))];

const CentersSection: React.FC = () => {
  const [selectedState, setSelectedState] = useState("All States");
  const [displayCount, setDisplayCount] = useState(8);

  const filteredCenters =
    selectedState === "All States"
      ? mockCenters
      : mockCenters.filter((center) => center.state === selectedState);

  const displayedCenters = filteredCenters.slice(0, displayCount);
  const hasMore = displayCount < filteredCenters.length;

  return (
    <section id="centers" className="py-20 bg-gray-50">
      <Container>
        <AnimatedSection animation="slide-up" className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            Our Network
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Assessment Centers{" "}
            <span className="gradient-text">Nationwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find a trusted assessment center near you. Our network spans across the country,
            bringing quality assessments to your community.
          </p>

          {/* Filter Dropdown */}
          <div className="flex justify-center">
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setDisplayCount(8);
              }}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all-smooth cursor-pointer"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </AnimatedSection>

        {/* Centers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayedCenters.map((center, index) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card hover padding="lg" className="text-center h-full">
                {/* Logo Container */}
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform-smooth">
                  {center.logo}
                </div>

                {/* Center Info */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {center.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                  <FiMapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">
                    {center.city}, {center.state}
                  </span>
                </div>

                {/* Link Button */}
                <button className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all-smooth">
                  <span>Visit Website</span>
                  <FiExternalLink className="w-4 h-4" />
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <motion.button
              onClick={() => setDisplayCount((prev) => prev + 8)}
              className="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors-smooth"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Centers
            </motion.button>
          </div>
        )}

        {/* Empty State */}
        {filteredCenters.length === 0 && (
          <div className="text-center py-12">
            <FiMapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No centers found in this state.</p>
            <button
              onClick={() => setSelectedState("All States")}
              className="mt-4 text-primary-600 font-semibold hover:underline"
            >
              View all centers
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default CentersSection;
