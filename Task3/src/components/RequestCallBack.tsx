'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './RequestCallBack.module.css';

export default function RequestCallBack() {
  return (
    <section id="contact" className={styles.ctaSection}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className={styles.titleCaps}>REQUEST A CALL BACK</h2>
        <h3 className={styles.subHeading}>Get your Business Right up There</h3>
        <p className={styles.description}>
          When you need intelligent answers to your toughest questions, we&apos;re here to help.
          We&apos;re just a call or email away! Don&apos;t hang back from getting in touch with us. We&apos;ll be glad to assist you.
        </p>
        <div className={styles.ctaBtnBox}>
          <button className={styles.ctaButton}>Request a Call Back</button>
        </div>
      </motion.div>
    </section>
  );
}
