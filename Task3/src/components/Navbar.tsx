'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, Phone, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Who we are', href: '#' },
    { label: 'What we do', href: '#' },
    { label: 'Insights', href: '#' },
    { label: 'Careers', href: '#' },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link href="/" className={styles.logoContainer}>
          <svg width="150" height="32" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C7.58 4 4 7.58 4 12V24C4 28.42 7.58 32 12 32H24C28.42 32 32 28.42 32 24V12C32 7.58 28.42 4 24 4H12ZM14 10H22V14H18V16H21V20H18V22H22V26H14V10Z" fill="white"/>
            <text x="40" y="25" fill="white" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700" letterSpacing="-0.5">Blackcoffer</text>
          </svg>
        </Link>

        {/* Desktop Nav Links */}
        <nav>
          <ul className={styles.navLinks}>
            {navItems.map((item) => (
              <li key={item.label} className={styles.navItem}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                  <ChevronDown size={16} className={styles.chevron} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right CTA / Actions */}
        <div className={styles.rightActions}>
          <button className={styles.searchBtn} aria-label="Search">
            <Search size={19} />
          </button>
          
          <a href="#contact" className={styles.contactBtn}>
            <Phone size={16} />
            <span>Contact Us</span>
          </a>

          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{item.label}</span>
              <ChevronDown size={18} />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
