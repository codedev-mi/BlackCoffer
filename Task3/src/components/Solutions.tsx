'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, TrendingUp, UserPlus, Globe } from 'lucide-react';
import styles from './Solutions.module.css';

export default function Solutions() {
  return (
    <section className={styles.solutionsSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.headerGroup}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.subHeading}>The reason why Blackcoffer stands out</p>
          <h2 className={styles.mainHeading}>Blackcoffer Unfolds Solutions To Everything</h2>
        </motion.div>

        <motion.div 
          className={styles.gridContainer}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left 3x3 Stats Grid */}
          <div className={styles.statsGrid}>
            {/* Row 1, Col 1: 12+ Years of Experience */}
            <div className={styles.cell}>
              <div className={styles.statValue}>12+</div>
              <div className={styles.statLabel}>Years of<br />Experience</div>
              <div className={styles.bgIcon}>
                <Calendar size={60} color="#ffffff" />
              </div>
            </div>

            {/* Row 1, Col 2: 100+ Clients */}
            <div className={styles.cell}>
              <div className={styles.statValue}>100+</div>
              <div className={styles.statLabel}>Clients</div>
              <div className={styles.bgIcon}>
                <Users size={60} color="#ffffff" />
              </div>
            </div>

            {/* Row 1, Col 3: 97% Client Retention Rate */}
            <div className={styles.cell}>
              <div className={styles.statValue}>97%</div>
              <div className={styles.statLabel}>Client Retention<br />Rate</div>
              <div className={styles.bgIcon}>
                <TrendingUp size={60} color="#ffffff" />
              </div>
            </div>

            {/* Row 2, Col 1: 40+ AI solutions (With AI image background) */}
            <div className={`${styles.cell} ${styles.aiCell}`}>
              <div className={styles.statValue}>40+</div>
              <div className={styles.statLabel}>AI solutions</div>
            </div>

            {/* Row 2, Col 2: 350+ Employees */}
            <div className={styles.cell}>
              <div className={styles.statValue}>350+</div>
              <div className={styles.statLabel}>Employees</div>
              <div className={styles.bgIcon}>
                <UserPlus size={60} color="#ffffff" />
              </div>
            </div>

            {/* Row 2, Col 3: 2+ Countries */}
            <div className={styles.cell}>
              <div className={styles.statValue}>2+</div>
              <div className={styles.statLabel}>Countries</div>
              <div className={styles.bgIcon}>
                <Globe size={60} color="#ffffff" />
              </div>
            </div>

            {/* Row 3, Col 1: 80+ Big Data Solutions */}
            <div className={`${styles.cell} ${styles.cellNoBottom}`}>
              <div className={styles.statValue}>80+</div>
              <div className={styles.statLabel}>Big Data Solutions</div>
            </div>

            {/* Row 3, Col 2 & 3: Dedicated to Providing Top-Notch... */}
            <div className={styles.dedicatedCell}>
              <span className={styles.dedicatedSub}>Dedicated to</span>
              <h3 className={styles.dedicatedTitle}>
                Providing Top-Notch Big Data<br />Analytics & BI Services
              </h3>
            </div>
          </div>

          {/* Right Image Card (Conference/Meeting photo from Figma asset Group 45.png) */}
          <div className={styles.rightImageCard}>
            <img src="/assets/people_meeting_clean.png" alt="Blackcoffer Team Solutions" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
