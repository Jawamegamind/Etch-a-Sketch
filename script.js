// Script file accompanying the Etch-a-Sketch project

// Some global variables for state tracking
mousedown = false
eraserToggled = false
rainbowToggled = false

// Getting references to all the crucial elements
const grid = document.querySelector('.grid');
const clearButton = document.querySelector('#clear-grid')
const rainbowButton = document.querySelector('#rainbow')
const penButton = document.querySelector('#pen')
const eraserButton = document.querySelector('#eraser')
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
    // Call the clear grid function to reinitialize grid with new size
    clearGrid()
})

// Adding event listener on the eraser button to toggle eraser mode for resetting grid colors
eraserButton.addEventListener('click', () => {
    // Update the boolean variable to true so we can reset grid
    eraserToggled = true
    // Also update the button's color to indicate that the eraser is currently selected
    eraserButton.style.backgroundColor = 'green'
    /// Update the other buttons back to their original color
    penButton.style.backgroundColor = 'lightblue'
    rainbowButton.style.backgroundColor = 'lightblue'
})

// Adding an event listner on the pen button to toggle back from the eraser mode to the pen/color fill mode
penButton.addEventListener('click', () => {
    // Update eraser toggle to false
    eraserToggled = false
    // Update rainbow toggle to false
    rainbowToggled = false
    // Update the pen button's background color to green
    penButton.style.backgroundColor = 'green'
    // Update the other buttons back to their original color
    eraserButton.style.backgroundColor = 'lightblue'
    rainbowButton.style.backgroundColor = 'lightblue'
})

// Adding an event listener for updating rainbow toggle
rainbowButton.addEventListener('click', () => {
    // Update rainbow button to true
    rainbowToggled = true
    // Update eraser toggle
    eraserToggled = false
    // Update color of rainbow button
    rainbowButton.style.backgroundColor = 'green'
    // Reset background colors of all other buttons
    eraserButton.style.backgroundColor = 'lightblue'
    penButton.style.backgroundColor = 'lightblue'
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
            if (eraserToggled) {
                gridItem.style.backgroundColor = 'white';
            }else if (rainbowToggled) {
                // Use random RGB values for each grid cell
                let R = Math.floor(Math.random() * 256)
                let G = Math.floor(Math.random() * 256)
                let B = Math.floor(Math.random() * 256)

                // Update the background color of the div using the RGB CSS attribute
                gridItem.style.backgroundColor = `rgb(${R},${G}, ${B})`
            } else {
                gridItem.style.backgroundColor = 'black';
            }
        })
        // Adding an event listener for mouseup
        gridItem.addEventListener('mouseup', () => {
            // Update the boolean
            mousedown = false
        })
        // Add an event listener for highlighting grid item the mouse hovers over
        gridItem.addEventListener('mouseover', () => {
            if (mousedown == true) {
                // Also check for eraser mode
                if (eraserToggled == true) {
                    gridItem.style.backgroundColor = 'white'
                } else if (rainbowToggled) {
                // Use random RGB values for each grid cell
                let R = Math.floor(Math.random() * 256)
                let G = Math.floor(Math.random() * 256)
                let B = Math.floor(Math.random() * 256)

                // Update the background color of the div using the RGB CSS attribute
                gridItem.style.backgroundColor = `rgb(${R},${G}, ${B})`
                } else {
                    gridItem.style.backgroundColor = 'black'; // Change color on hover
                }
            }
        });
        grid.appendChild(gridItem);
    }
}

// Calling the grid load function on page load
window.onload = () => {
    createGrid(16); // Default grid size
}