/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { useState } from 'react';
import styles from '../styles/Switch.module.css'

const SwitchInput = ({ isOn, handleToggle, id, className }) => {
    return (
      <>
        <input checked={isOn} onChange={handleToggle} className={styles.react_switch_checkbox} id={id} type="checkbox" />
        <label style={{ background: isOn && '#06D6A0' }} className={`${styles.react_switch_label} ${className}`} htmlFor={id} >
          <span className={styles.react_switch_button} />
        </label>
      </>
    );
  };
  
  export default SwitchInput;