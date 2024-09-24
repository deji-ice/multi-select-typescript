import React, { useState } from 'react'
import styles from "../body.module.css";
import { Select, SelectOptions } from "../Select";

const MultiSelectForm = () => {
    const options = [
        { label: "first", value: 1 },
        { label: "second", value: 2 },
        { label: "third", value: 3 },
        { label: "fourth", value: 4 },
        { label: "fifth", value: 5 },
        { label: "sixth", value: 6 },
        { label: "seventh", value: 7 },
      ];
      

    const [value, setValue] = useState<SelectOptions[]>([options[0]]);
    const [value2, setValue2] = useState<SelectOptions | undefined>(options[0]);
  
    return (
      <div
      className={styles.body}>
        <div>
          <h1 className={styles.header}>A Multi Select Option Component</h1>
          <p className={styles.subheader}>Made with Typescript, ReactJS and CSS modules</p>
        </div>
        <Select
          multi
          options={options}
          value={value}
          onChange={(o) => setValue(o)}
        />
        <br />
        <Select options={options} value={value2} onChange={(o) => setValue2(o)} />
      </div>
    );
}

export default MultiSelectForm