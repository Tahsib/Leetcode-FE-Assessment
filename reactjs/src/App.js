import React from "react";
import { useState } from "react";

function formatNumber(input, prevInput) {
  let value = input.value;
  let pos = input.selectionStart;
  console.log(pos);
  console.log(prevInput);

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
  prevInput = formattedInput;
  value = formattedInput.join("");
  return [value, pos, prevInput];
}

export default function App() {
  const initialValues = {
    prevInput: [],
    currentVal: "",
  };
  const [values, setValues] = useState(initialValues);

  return (
    <div className="App">
      <div className="container text-center">
        <input
          type="tel"
          id="phone"
          maxLength={16}
          placeholder="mobile number"
          autoComplete="off"
          defaultValue={values.currentVal}
          onInput={(e) => {
            let [newNumber, newPos, prev] = formatNumber(
              e.target,
              values.prevInput
            );
            setValues({
              prevInput: prev,
            });
            e.target.value = newNumber;
            e.target.setSelectionRange(newPos, newPos);
          }}
        />
        <div>
          <label htmlFor="phone">(123) 456-7890</label>
        </div>
      </div>
    </div>
  );
}
