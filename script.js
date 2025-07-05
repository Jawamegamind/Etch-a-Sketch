// Script file accompanying the Etch-a-Sketch project

// Some global variables for state tracking
mousedown = false

// Getting references to all the crucial elements
const grid = document.querySelector('.grid');
const clearButton = document.querySelector('#clear-grid')
const slider = document.querySelector('#grid-slider')
const sliderValue = document.querySelector('#slider-value')
const sliderValueY = document.querySelector('#slider-value-y')
const gridUpdateButton = document.querySelector('#update-grid')

// Registering event listners for button
clearButton.addEventListener('click', () => {
    // Call the clearGrid function
    clearGrid()
})

// Adding event listener on the slider to update the value of the current grid size below it
slider.addEventListener('input', () => {
    // Updating the inner text of the span element that sits below the slider
    sliderValue.textContent = slider.value
    sliderValueY.textContent = slider.value
})

// Adding event listener for updating the grid
gridUpdateButton.addEventListener('click', () => {
    // First clear the current grid
    clearGrid()
    // After clearing the grid reninitialze it using the slider's value
    createGrid(slider.value)
})

// Function for clearing the grid
function clearGrid() {
    grid.innerHTML = ''
    // Instead of creating a 16x16 grid use the slider's current value
    createGrid(slider.value)
}

// Function for creating a grid of divs
function createGrid(size) {
    // // Clear the grid before creating a new one
    // grid.innerHTML = '';
    // Set the grid's style properties
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    // Create the grid items
    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        // Adding style for the grid items
        gridItem.style.border = '1px solid #ddd';
        // Adding an event listener for mousedown so that we can have click and drag highlighting
        gridItem.addEventListener('mousedown', () => {
            // If mousedown is detected update boolean
            mousedown = true
            // Update grid color
            gridItem.style.backgroundColor = 'black';
        })
        // Adding an event listener for mouseup
        gridItem.addEventListener('mouseup', () => {
            // Update the boolean
            mousedown = false
        })
        // Add an event listener for highlighting grid item the mouse hovers over
        gridItem.addEventListener('mouseover', () => {
            if (mousedown == true) {
                gridItem.style.backgroundColor = 'black'; // Change color on hover
            }
        });
        grid.appendChild(gridItem);
    }
}

// Calling the grid load function on page load
window.onload = () => {
    createGrid(16); // Default grid size
}