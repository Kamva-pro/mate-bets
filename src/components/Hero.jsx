import React from 'react';
import styles from '../HeroSection.module.css';
import NavItem from './NavItem';
import FilterItem from './FilterItem';

const HeroSection = () => {
  const navItems = ['Home', 'Play a friend', 'Pro Games'];
  const filterItems = [
    { text: 'Rapid', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/12195c45f221fe1fe1cfbc177a04fffcd13d8e64d0f662bd8ca6fd6444aedb97?placeholderIfAbsent=true&apiKey=6d35f1e4a4de483c8e715d4491c01e28' },
    { text: 'Date', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/12195c45f221fe1fe1cfbc177a04fffcd13d8e64d0f662bd8ca6fd6444aedb97?placeholderIfAbsent=true&apiKey=6d35f1e4a4de483c8e715d4491c01e28' }
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.logo}>
            <span>Mate </span>
            <span className={styles.logoGreen}>Bets</span>
          </h1>
          <nav className={styles.navigation}>
            {navItems.map((item, index) => (
              <NavItem key={index} text={item} />
            ))}
          </nav>
          <button className={styles.loginButton}>Login</button>
        </header>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Put your money where your moves are</h2>
          <p className={styles.heroSubtitle}>Play against your friends and place a bet</p>
          <button className={styles.ctaButton}>Bet Now</button>
        </div>
        <div className={styles.filterSection}>
          {filterItems.map((item, index) => (
            <FilterItem key={index} text={item.text} iconSrc={item.iconSrc} />
          ))}
          <button className={styles.filterButton}>Filter</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;