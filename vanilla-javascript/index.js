document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("phone").addEventListener("input", (e) => {
        let [v , p] = format_number(e.target);
        e.target.value = v
        e.target.setSelectionRange(p,p)
    });
});

let prevInput = [];

function format_number(input){
    let value = input.value
    let pos = input.selectionStart;

    value = value.replace(/[()-]/g, '');
    
    let formattedInput = value
    formattedInput = formattedInput.split("")

    if (formattedInput.length > 3) {
        formattedInput = ['(', ...formattedInput.slice(0,3), ')', ...formattedInput.slice(3)]
    }
    
    if (formattedInput.length > 8) {
        formattedInput = [...formattedInput.slice(0,8), '-', ...formattedInput.slice(8)]
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

    value = formattedInput.join("")
    return [value, pos]
}

