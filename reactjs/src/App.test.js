import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "./App";

describe("App", () => {
  it("should format phone number correctly", async () => {
    const { getByLabelText } = render(<App />);
    const phoneInput = getByLabelText("(123) 456-7890");

    await userEvent.type(phoneInput, "1234" );
    expect(phoneInput.value).toBe("(123)4");
    
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "1234567890" );
    expect(phoneInput.value).toBe("(123)456-7890");
    
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "1234567" );
    expect(phoneInput.value).toBe("(123)456-7");

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "1234567890" );
    expect(phoneInput.value).toBe("(123)456-7890");
  });

  it("should put cursor at right place", async () => {
    const { getByLabelText } = render(<App />);
    const phoneInput = getByLabelText("(123) 456-7890");

    await userEvent.type(phoneInput, "(123)456-7890");
    expect(phoneInput.value).toBe("(123)456-7890");
    expect(phoneInput.selectionStart).toBe(13);
  });
});
