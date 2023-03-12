import React, { useState, useEffect, useRef } from "react";
import styles from "./select.module.css";

export type SelectOptions = {
  label: string;
  value: string | number;
};

type MultiSelectProps = {
  value: SelectOptions[];
  multi: true;
  onChange: (value: SelectOptions[]) => void;
};

type SingleSelectProps = {
  multi?: false;
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

type SelectProps = {
  options: SelectOptions[];
} & (MultiSelectProps | SingleSelectProps);

export const Select = ({ multi, value, onChange, options }: SelectProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOption = () => {
    multi ? onChange([]) : onChange(undefined);
  };

  const selectOptions = (option: SelectOptions) => {
    if (multi) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOptions) => {
    return multi ? value.includes(option) : option === value;
  };

  useEffect(() => {
    if (show) {
      setHighlightedIndex(0);
    }
  }, [show]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setShow((prev) => !prev);
          if (show) selectOptions(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!show) {
            setShow(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setShow(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [show, highlightedIndex, options]);
  return (
    <>
      <div
        ref={containerRef}
        onClick={() => setShow((prev) => !prev)}
        onBlur={() => setShow(false)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {multi
            ? value.map((item) => (
                <button
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOptions(item);
                  }}
                  className={styles.optionsBadge}
                >
                  {item.label}{" "}
                  <span className={styles["remove-button"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
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
