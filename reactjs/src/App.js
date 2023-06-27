import React from "react";
import { useState } from "react";

function formatNumber(input, prevInput) {
  let value = input.value;
  let pos = input.selectionStart;

  value = value.replace(/[()-]/g, "");

  let formattedInput = value;
  formattedInput = formattedInput.split("");

  if (formattedInput.length > 3) {
    formattedInput = [
      "(",
      ...formattedInput.slice(0, 3),
      ")",
      ...formattedInput.slice(3),
    ];
  }

  if (formattedInput.length > 8) {
    formattedInput = [
      ...formattedInput.slice(0, 8),
      "-",
      ...formattedInput.slice(8),
    ];
  }

  if (!prevInput.includes("(") && formattedInput.includes("(")) {
    pos += 1;
  }
  if (!prevInput.includes(")") && formattedInput.includes(")")) {
    pos += 1;
  }
  if (!prevInput.includes("-") && formattedInput.includes("-")) {
    pos += 1;
  }
  
  value = formattedInput.join("");
  return [value, pos];
}

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <div className="container text-center">
        <input
          type="tel"
          id="phone"
          maxLength={16}
          placeholder="mobile number"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            const target = e.target
            let [newNumber, newPos] = formatNumber(
              target,
              value
            );
            setValue(newNumber);
            window.requestAnimationFrame(()=>{
              target.setSelectionRange(newPos, newPos);
            })
          }}
        />
        <div>
          <label htmlFor="phone">(123) 456-7890</label>
        </div>
      </div>
    </div>
  );
}
