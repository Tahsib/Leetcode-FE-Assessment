describe('formatNumber', () => {
  it('should format phone number input correctly', () => {
    const phoneInput = document.createElement('input');
    phoneInput.id = 'phone';
    phoneInput.value = '(123) 456-7890';
    document.body.appendChild(phoneInput);

    phoneInput.setSelectionRange(5, 5);

    const inputEvent = new Event('input', { bubbles: true });
    phoneInput.dispatchEvent(inputEvent);

    expect(phoneInput.value).toBe('(123) 456-7890');
    expect(phoneInput.selectionStart).toBe(5);
  });
});