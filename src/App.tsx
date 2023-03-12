import { useState } from "react";
import { Select, SelectOptions } from "./Select";

const options = [
  { label: "first", value: 1 },
  { label: "second", value: 2 },
  { label: "third", value: 3 },
  { label: "fourth", value: 4 },
  { label: "fifth", value: 5 },
  { label: "sixth", value: 6 },
  { label: "seventh", value: 7 },
];

function App() {
  const [value, setValue] = useState<SelectOptions[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOptions | undefined>(options[0]);

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>A Select Option component </h1>
        <i>made with Typescript, reactJs and CSS modules</i>
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

export default App;
