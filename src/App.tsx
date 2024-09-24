import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MultiSelectForm from "./pages/MultiSelectForm";




function App() {
 <div>
  <Routes>
    <Route path="/" element={<MultiSelectForm />} />
    
  </Routes>
 </div>
}

export default App;
