import React, { useState, useRef, useEffect } from "react";
import ChipInput from "./components/ChipInput";

const App = () => {
  const allItems = [
    "JavaScript",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "SQL",
  ];

  return (
    <div className="container mx-auto px-40">
      <h1>Chip Input</h1>
      <ChipInput allItems={allItems} />
    </div>
  );
};

export default App;
