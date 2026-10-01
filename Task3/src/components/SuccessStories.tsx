'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './SuccessStories.module.css';

const allStories = [
  {
    id: 1,
    date: '2024 March 17',
    title: 'Efficient Supply Chain Assessment: Overcoming Technical Hurdles for Web Application Development',
  },
  {
    id: 2,
    date: '2024 March 17',
    title: 'Streamlined Integration: Interactive Brokers API with Python for Desktop Trading Application',
  },
  {
    id: 3,
    date: '2024 February 28',
    title: 'AI-Powered Predictive Maintenance for Enterprise Manufacturing Infrastructure',
  },
  {
    id: 4,
    date: '2024 January 15',
    title: 'Scalable Big Data Lake Implementation for Global Financial Institutions',
  },
];

export default function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 2 >= allStories.length ? 0 : prev + 2));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 2 < 0 ? allStories.length - 2 : prev - 2));
  };

  const visibleStories = allStories.slice(currentIndex, currentIndex + 2);

  return (
    <section className={styles.storiesSection}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <h2 className={styles.sectionTitle}>Success Stories</h2>
          <a href="#" className={styles.readAllLink}>
            <span>Read all stories</span>
            <span className={styles.blueSquare}>
              <ChevronRight size={18} color="#ffffff" />
            </span>
          </a>
        </div>

        <div className={styles.storiesGrid}>
          <AnimatePresence mode="wait">
            {visibleStories.map((story) => (
              <motion.div
                key={story.id}
                className={styles.storyCard}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.dateBadge}>{story.date}</div>
                <h3 className={styles.storyTitle}>{story.title}</h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className={styles.carouselNav}>
          <button className={styles.navArrowBtn} onClick={handlePrev} aria-label="Previous story">
            <ChevronLeft size={20} />
          </button>
          <button className={styles.navArrowBtn} onClick={handleNext} aria-label="Next story">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
