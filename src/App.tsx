import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MultiSelectForm from "./pages/MultiSelectForm";
import Tests from "./pages/Tests";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MultiSelectForm />} />
        <Route path="/tests" element={<Tests />} />
      </Routes>
    </div>
  );
};

export default App;
