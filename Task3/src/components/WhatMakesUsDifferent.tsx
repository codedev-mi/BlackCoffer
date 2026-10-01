'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './WhatMakesUsDifferent.module.css';

const features = [
  { label: 'Consistency', icon: '/assets/icon_consistency.png' },
  { label: 'Improvement', icon: '/assets/icon_improvement.png' },
  { label: 'Branching', icon: '/assets/icon_branching.png' },
  { label: 'Expertise', icon: '/assets/icon_expertise.png' },
  { label: 'Security', icon: '/assets/icon_security.png' },
  { label: 'Transparency', icon: '/assets/icon_transparency.png' },
];

export default function WhatMakesUsDifferent() {
  return (
    <section className={styles.differentSection}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Makes Us Different
        </motion.h2>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.iconBox}>
                <img src={feature.icon} alt={feature.label} />
              </div>
              <span className={styles.featureLabel}>{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
