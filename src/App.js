import React from "react";
// Pages
import Home from "./Home/Home";
import Playground from "./Playground/Playground";
// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Playground />} />
      </Routes>
    </Router>
  );
}

export default App;
