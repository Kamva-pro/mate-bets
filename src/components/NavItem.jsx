import React from 'react';
import styles from '../HeroSection.module.css';

const NavItem = ({ text }) => {
  return (
    <div className={styles.navItem}>
      {text}
    </div>
  );
};

export default NavItem;