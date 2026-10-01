'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

const servicesData = [
  { id: 1, title: 'Big Data & Analytics', asset: '/assets/1.png' },
  { id: 2, title: 'Consultancy', asset: '/assets/2.png' },
  { id: 3, title: 'HR & staffing', asset: '/assets/3.png' },
  { id: 4, title: 'Cybersecurity', asset: '/assets/4.png' },
  { id: 5, title: 'Consultancy', asset: '/assets/5.png' },
  { id: 6, title: 'Sustainability', asset: '/assets/6.png' },
  { id: 7, title: 'Cloud', asset: '/assets/7.png' },
  { id: 8, title: 'Metaverse', asset: '/assets/8.png' },
];

export default function Services() {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Services</h2>
        <div className={styles.servicesGrid}>
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.cardWrapper}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className={styles.serviceCard}>
                <img src={service.asset} alt={service.title} />
                <div className={styles.cardOverlay} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
