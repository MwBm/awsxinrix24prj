const submitButton = document.getElementById('submitButton');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const largeInput = document.getElementById('largeInput');

let value1, value2, largeValue;

submitButton.addEventListener('click', () => {
    const value1 = input1.value;
    const value2 = input2.value;
    const largeValue = largeInput.value;

    console.log("Value 1 --> " + value1);
    console.log("Value 2 --> " + value2);
    console.log("LargeValue --> " + largeValue);
    console.log(" ");
});