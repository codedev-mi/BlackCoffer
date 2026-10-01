'use client';

import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const col1Links = ['About us', 'About Founder', 'Contact us', 'Team', 'Locations'];
  const col2Links = ['FAQ', 'Terms & Conditions', 'Careers', 'Solutions', 'Our Process'];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Column 1 */}
        <div className={styles.column}>
          <ul className={styles.linkList}>
            {col1Links.map((link) => (
              <li key={link} className={styles.linkItem}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div className={styles.column}>
          <ul className={styles.linkList}>
            {col2Links.map((link) => (
              <li key={link} className={styles.linkItem}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Get In Touch */}
        <div className={styles.getInTouchCol}>
          <h4 className={styles.getInTouchTitle}>Get In Touch</h4>
          <p className={styles.touchDescription}>
            Taking seamless key performance indicators offline to maximise the long tail.
          </p>

          {/* Social Icons matching exported Frame 85 / Figma colors */}
          <div className={styles.socialRow}>
            <a href="#" className={`${styles.socialIcon} ${styles.facebook}`} aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className={`${styles.socialIcon} ${styles.youtube}`} aria-label="YouTube">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className={`${styles.socialIcon} ${styles.linkedin}`} aria-label="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className={`${styles.socialIcon} ${styles.twitter}`} aria-label="Twitter">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.copyrightRow}>
        <p>© {new Date().getFullYear()} Blackcoffer. All rights reserved.</p>
        <p>Built with Next.js & Framer Motion</p>
      </div>
    </footer>
  );
}
