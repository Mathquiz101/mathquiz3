// Initialize counter value
let count = 0;

// Function to increment the counter
function increment() {
    count++;
    updateCounter();
}

// Function to decrement the counter
function decrement() {
    count--;
    updateCounter();
}

// Function to update the counter display
function updateCounter() {
    document.getElementById("counter").textContent = count;
}
