import React, { useState, useEffect } from "react";
import styles from "./select.module.css";

type SelectOptions = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOptions[];
  value?: SelectOptions | undefined;
  onChange: (value: SelectOptions | undefined) => void;
};

export const Select = ({ value, onChange, options }: SelectProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const isOptionSelected = (option: SelectOptions) => {
    return option === value;
  };

  const clearOption = () => {
    onChange(undefined);
  };

  const selectOptions = (options: SelectOptions) => {
    if (options !== value) {
      onChange(options);
    }
  };

  useEffect(() => {
    if (show) {
      setHighlightedIndex(0);
    }
  }, [show]);

  return (
    <>
      <div
        onClick={() => setShow((prev) => !prev)}
        onBlur={() => setShow(false)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>{value?.label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOption();
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <span className={styles.carat}></span>
        <ul className={`${styles.options} ${show ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              key={option.value}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              }
              ${highlightedIndex === index ? styles.highlighted : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                selectOptions(option);
                setShow(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
