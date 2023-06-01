let stack = [];
const stackContainer = document.getElementById("stack-container");
const topElement = document.getElementById("top-element");
const lastPoppedElement = document.getElementById("last-popped-element");

function push() {
    const values = prompt("Enter values to push (comma-separated):");
    const inputValues = values.split(",").map(value => value.trim());
    stack.push(...inputValues);
    renderStack();
}

function pop() {
    if (stack.length === 0) {
        alert("Stack Underflow");
        return;
    }
    const poppedElement = stack.pop();
    renderStack();
    lastPoppedElement.innerText = "Last element popped: " + poppedElement;
}

function clearStack() {
    stack = [];
    renderStack();
    lastPoppedElement.innerText = "Last element popped: -";
}

function renderStack() {
    stackContainer.innerHTML = "";
    stack.forEach((value) => {
        const stackElement = document.createElement("div");
        stackElement.innerText = value;
        stackContainer.appendChild(stackElement);
    });

    if (stack.length > 0) {
        topElement.innerText = "Top of stack: " + stack[stack.length - 1];
    } else {
        topElement.innerText = "Top of stack: -";
    }
}
