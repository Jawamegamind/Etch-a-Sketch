// Script file accompanying the Etch-a-Sketch project

// Getting references to all the crucial elements
const grid = document.querySelector('.grid');
const clearButton = document.querySelector('#clear-grid')

// Registering event listners for button
clearButton.addEventListener('click', () => {
    // Call the clearGrid function
    clearGrid()
})

// Function for clearing the grid
function clearGrid() {
    grid.innerHTML = ''
    createGrid(16)
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
        // Add an event listener for highlighting grid item the mouse hovers over
        gridItem.addEventListener('mouseover', () => {
            gridItem.style.backgroundColor = 'black'; // Change color on hover
        });
        grid.appendChild(gridItem);
    }
}

// // Getting reference to the grid items
// const gridItems = document.querySelectorAll('.grid-item');
// // Adding event listeners to each grid item for hover effect
// gridItems.forEach(item => {
//     item.addEventListener('onmouseover', () => {
//         item.style.backgroundColor = 'black'; // Change color on hover
//     });
// });

// Calling the grid load function on page load
window.onload = () => {
    createGrid(16); // Default grid size
}