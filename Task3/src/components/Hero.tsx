'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Figma exported background visual waveform */}
      <div className={styles.heroBackground}>
        <img src="/assets/Group 1.png" alt="Hero Wave Visual" />
      </div>

      <div className={styles.container}>
        <motion.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className={styles.heroHeading}>
            <div>TOGETHER WE</div>
            <div className={styles.headingRow2}>REINVENTED</div>
          </h1>
        </motion.div>

        <motion.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className={styles.blueBar} />
          <p className={styles.heroParagraph}>
            Together, we can reinvent your business. Reinvention is about breaking industry norms.
            Our wide range of capabilities, ecosystem partnerships and unmatched industry expertise can help
            your business become the next best version of itself.
          </p>
          <div>
            <a href="#services" className={styles.ctaLink}>
              <span>See what we do</span>
              <span className={styles.arrowBadge}>
                <ChevronRight size={18} color="#ffffff" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
