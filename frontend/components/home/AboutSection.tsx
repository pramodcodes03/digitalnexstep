"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FiAward, FiUsers, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import Button from "../ui/Button";
import Container from "../ui/Container";

const stats = [
  { icon: FiAward, label: "Years of Experience", value: 10, suffix: "+" },
  { icon: FiUsers, label: "Centers Served", value: 500, suffix: "+" },
  { icon: FiTrendingUp, label: "Students Assessed", value: 1000000, suffix: "+", isLarge: true },
  { icon: FiCheckCircle, label: "Success Rate", value: 98, suffix: "%" },
];

const CountUp: React.FC<{ end: number; duration?: number; isLarge?: boolean; suffix?: string }> = ({
  end,
  duration = 2,
  isLarge = false,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  const formatNumber = (num: number) => {
    if (isLarge && num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return <span ref={ref}>{formatNumber(count)}{suffix}</span>;
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-strong">
              {/* Placeholder gradient - replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <FiUsers className="w-32 h-32 mx-auto mb-4 opacity-20" />
                  <p className="text-2xl font-bold">Educational Excellence</p>
                  <p className="text-primary-100 mt-2">Team Photo Placeholder</p>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-primary-100 rounded-2xl -z-10" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold uppercase tracking-wide">
              About Us
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Empowering Education Through{" "}
              <span className="gradient-text">Innovation</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                Founded with a vision to revolutionize educational assessments, DigitalNexStep
                has been at the forefront of educational technology for over a decade. We believe
                that assessment should be more than just testing—it should be a tool for growth,
                insight, and continuous improvement.
              </p>
              <p>
                Our platform is trusted by educational institutions nationwide, from small learning
                centers to large university systems. We combine cutting-edge technology with deep
                educational expertise to deliver solutions that truly make a difference.
              </p>
              <p>
                Every day, we work to empower educators with the tools they need to assess fairly,
                grade efficiently, and understand student progress deeply. Our commitment to
                excellence drives everything we do.
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100"
                  >
                    <Icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                    <div className="text-3xl font-extrabold text-primary-700 mb-1">
                      <CountUp
                        end={stat.value}
                        isLarge={stat.isLarge}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4">
              <Button variant="primary" size="lg">
                Learn More About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
