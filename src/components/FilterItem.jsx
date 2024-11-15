import React from 'react';
import styles from '../HeroSection.module.css';

const FilterItem = ({ text, iconSrc }) => {
  return (
    <div className={styles.filterItem}>
      <div className={styles.filterText}>{text}</div>
      <img loading="lazy" src={iconSrc} alt="" className={styles.filterIcon} />
    </div>
  );
};

export default FilterItem;