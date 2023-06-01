let queue = [];
const queueContainer = document.getElementById("queue-container");
const topElement = document.getElementById("top-element");
const lastPoppedElement = document.getElementById("last-popped-element");

function enqueue() {
    const values = prompt("Enter multiple values to enqueue (comma-separated):");
    const inputValues = values.split(",").map(value => value.trim());
    queue.push(...inputValues);
    renderQueue();
}

function dequeue() {
    if (queue.length === 0) {
        alert("Queue Underflow");
        return;
    }
    const poppedElement = queue.shift();
    renderQueue();
    lastPoppedElement.innerText = "Last element popped: " + poppedElement;
}

function clearQueue() {
    queue = [];
    renderQueue();
    lastPoppedElement.innerText = "Last element popped: -";
}

function renderQueue() {
    queueContainer.innerHTML = "";
    queue.forEach((value, index) => {
        const queueElement = document.createElement("div");
        const valueSpan = document.createElement("span");
        valueSpan.innerText = value;
        queueElement.appendChild(valueSpan);

        if (index < queue.length - 1) {
            const separatorSpan = document.createElement("span");
            separatorSpan.innerText = ",";
            queueElement.appendChild(separatorSpan);
        }

        queueContainer.appendChild(queueElement);
    });

    if (queue.length > 0) {
        topElement.innerText = "Top of queue: " + queue[0];
    } else {
        topElement.innerText = "Top of queue: -";
    }
}
