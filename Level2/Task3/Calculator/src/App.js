import React, { useState } from 'react';
import './App.css';
import Button from './components/Button.js'; // Import the Button component
import Display from './components/Display.js'; // Import the Display component

function App() {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch (error) {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <Display input={input} />
      <div className="button-container">
        {["(", ")", "%", "C"].map((button) => (
        <Button key={button} value={button} onClick={handleButtonClick} />
        ))}
        {["7", "8", "9", "/"].map((button) => (
          <Button key={button} value={button} onClick={handleButtonClick} />
        ))}
        {["4", "5", "6", "*"].map((button) => (
          <Button key={button} value={button} onClick={handleButtonClick} />
        ))}
        {["1", "2", "3", "-"].map((button) => (
          <Button key={button} value={button} onClick={handleButtonClick} />
        ))}
        {["0", ".", "=", "+"].map((button) => (
          <Button key={button} value={button} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
