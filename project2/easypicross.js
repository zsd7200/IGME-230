// setup a 16x16 grid, each 25x25 pixels
const numCols = 16;
const numRows = 16;
const cellWidth = 25;
const cellSpacing = 0;

// setting up variables for displaying the numbers
let horizText = document.querySelector("#horizText");
let vertText3 = document.querySelector("#vertText3");
let vertText2 = document.querySelector("#vertText2");
let vertText1 = document.querySelector("#vertText1");

const pokeHoriz = ["0", "0", "4", "8", "10", "10", "12", "12", "5 5", "1 3 3 1", "1 2 1", "1 1", "2 2", "4", "0", "0"];
const pokeVert3 = ["", "", "", "", "", "", "", "6", "6", "", "", "", "", "", "", ""];
const pokeVert2 = ["", "", "", "5", "7", "7", "8", "1", "1", "8", "7", "7", "5", "", "", ""];
const pokeVert1 = ["0", "0", "4", "2", "1", "1", "1", "1", "1", "1", "1", "1", "2", "4", "0", "0"];

// setup an object literal of colors for when the puzzle is completed
const colors = {
	orange: "#F89878",
	lightred: "#D02828",
	red: "#A80000",
	darkred: "#800000",
	gray: "#909090",
};

// setup the button variable
let button = document.querySelector('button');

// reference the grid container to hold cells
const container = document.querySelector("#gridContainer");

// create a cell
const span = document.createElement('span');
span.className = 'cell';

// create an array to hold the cells
const cells = [];

// fill the array with cells
for (row = 0; row < numRows; row++)
{
	cells.push([]);
	
	// while filling the array, print out the numbers on the left and top
	let horizP = document.createElement('p');
	horizP.innerHTML = pokeHoriz[row];
	horizText.appendChild(horizP);
	
	let vertP1 = document.createElement('p');
	vertP1.innerHTML = pokeVert1[row];
	vertText1.appendChild(vertP1);
	
	// vert 2 and 3 need to have a solid white border so there will not be
	// seemingly random purple blocks next to some numbers
	let vertP2 = document.createElement('p');
	vertP2.innerHTML = pokeVert2[row];
	if (pokeVert2[row] == "") { vertP2.style.border = "1px solid white"; }
	vertText2.appendChild(vertP2);
	
	let vertP3 = document.createElement('p');
	vertP3.innerHTML = pokeVert3[row];
	if (pokeVert3[row] == "") { vertP3.style.border = "1px solid white"; }
	vertP3.style.top = "17px";
	vertText3.appendChild(vertP3);
	
	for (col = 0; col < numCols; col++)
	{
		let cell = span.cloneNode();
		cell.style.left = `${col * (cellWidth + cellSpacing)}px`;
		cell.style.top = `${row * (cellWidth + cellSpacing)}px`;
		container.appendChild(cell);
		cells[row][col] = cell;
	}
}

// mouseIsDown bool for dragging, erase bool for erasing on double click
let mouseIsDown = false;
let erase = false;

// setup event handlers for when the container or button is clicked
container.onclick = fillCell;
button.onclick = checkCompletion;

// event handler that will erase a block upon being double-clicked
container.ondblclick = (e) => { 
	erase = true; 
	fillCell(e);
}

// calls fillCell whenever we move the mouse if mouseIsDown = true
container.onmousemove = (e) => {
	e.preventDefault();
	if (mouseIsDown) fillCell(e);
}

// set mouseIsDown = true when we click
container.onmousedown = (e) => {
	e.preventDefault();
	mouseIsDown = true;
}

// stop painting when mouse leaves the window
window.onmouseup = (e) => {
	e.preventDefault();
	mouseIsDown = false;
}

// fillCell now handles filling the cell and erasing it
function fillCell(e)
{
	let rect = container.getBoundingClientRect();
	let mouseX = e.clientX - rect.left;
	let mouseY = e.clientY - rect.top;
	let columnWidth = cellWidth + cellSpacing;
	let col = Math.floor(mouseX / columnWidth);
	let row = Math.floor(mouseY / columnWidth);
	let selectedCell = cells[row][col];
	selectedCell.className = 'cellSelected';
	
	// if erase is true, set the selected cell back to its original state
	if (erase)
	{
		selectedCell.style.backgroundColor = "#ccc";
		selectedCell.style.border = "1px solid purple";
		selectedCell.style.width = "23px";
		selectedCell.style.height = "23px";
	}
	
	// otherwise, make it black
	else
	{
		selectedCell.style.backgroundColor = "black";
		selectedCell.style.border = "1px solid white";
		selectedCell.style.width = "25px";
		selectedCell.style.height = "25px";
	}
	
	// set erase to false every time this is run to reset it
	erase = false;
}


// this function is one big if statement to check
// if the puzzle has been done correctly
// if the puzzle has been solved, it will color in pokeball
function checkCompletion(e)
{
	if (
		cells[2][6].style.backgroundColor == "black" ||  
		cells[2][7].style.backgroundColor == "black" && 
		cells[2][8].style.backgroundColor == "black" && 
		cells[2][9].style.backgroundColor == "black" && 
		cells[3][4].style.backgroundColor == "black" && 
		cells[3][5].style.backgroundColor == "black" && 
		cells[3][6].style.backgroundColor == "black" && 
		cells[3][7].style.backgroundColor == "black" && 
		cells[3][8].style.backgroundColor == "black" && 
		cells[3][9].style.backgroundColor == "black" && 
		cells[3][10].style.backgroundColor == "black" && 
		cells[3][11].style.backgroundColor == "black" && 
		cells[4][3].style.backgroundColor == "black" && 
		cells[4][4].style.backgroundColor == "black" && 
		cells[4][5].style.backgroundColor == "black" && 
		cells[4][6].style.backgroundColor == "black" && 
		cells[4][7].style.backgroundColor == "black" && 
		cells[4][8].style.backgroundColor == "black" && 
		cells[4][9].style.backgroundColor == "black" && 
		cells[4][10].style.backgroundColor == "black" && 
		cells[4][11].style.backgroundColor == "black" && 
		cells[4][12].style.backgroundColor == "black" && 
		cells[5][3].style.backgroundColor == "black" && 
		cells[5][4].style.backgroundColor == "black" && 
		cells[5][5].style.backgroundColor == "black" && 
		cells[5][6].style.backgroundColor == "black" && 
		cells[5][7].style.backgroundColor == "black" && 
		cells[5][8].style.backgroundColor == "black" && 
		cells[5][9].style.backgroundColor == "black" && 
		cells[5][10].style.backgroundColor == "black" && 
		cells[5][11].style.backgroundColor == "black" && 
		cells[5][12].style.backgroundColor == "black" && 
		cells[6][2].style.backgroundColor == "black" && 
		cells[6][3].style.backgroundColor == "black" && 
		cells[6][4].style.backgroundColor == "black" && 
		cells[6][5].style.backgroundColor == "black" && 
		cells[6][6].style.backgroundColor == "black" && 
		cells[6][7].style.backgroundColor == "black" && 
		cells[6][8].style.backgroundColor == "black" && 
		cells[6][9].style.backgroundColor == "black" && 
		cells[6][10].style.backgroundColor == "black" && 
		cells[6][11].style.backgroundColor == "black" && 
		cells[6][12].style.backgroundColor == "black" && 
		cells[6][13].style.backgroundColor == "black" && 
		cells[8][2].style.backgroundColor == "black" && 
		cells[8][3].style.backgroundColor == "black" && 
		cells[8][4].style.backgroundColor == "black" && 
		cells[8][5].style.backgroundColor == "black" && 
		cells[8][6].style.backgroundColor == "black" && 
		cells[8][9].style.backgroundColor == "black" && 
		cells[8][10].style.backgroundColor == "black" && 
		cells[8][11].style.backgroundColor == "black" && 
		cells[8][12].style.backgroundColor == "black" && 
		cells[8][13].style.backgroundColor == "black" && 
		cells[9][2].style.backgroundColor == "black" && 
		cells[9][4].style.backgroundColor == "black" && 
		cells[9][5].style.backgroundColor == "black" && 
		cells[9][6].style.backgroundColor == "black" && 
		cells[9][9].style.backgroundColor == "black" && 
		cells[9][10].style.backgroundColor == "black" && 
		cells[9][11].style.backgroundColor == "black" && 
		cells[9][13].style.backgroundColor == "black" && 
		cells[10][3].style.backgroundColor == "black" && 
		cells[10][7].style.backgroundColor == "black" && 
		cells[10][8].style.backgroundColor == "black" && 
		cells[10][12].style.backgroundColor == "black" && 
		cells[11][3].style.backgroundColor == "black" && 
		cells[11][12].style.backgroundColor == "black" && 
		cells[12][4].style.backgroundColor == "black" && 
		cells[12][5].style.backgroundColor == "black" && 
		cells[12][10].style.backgroundColor == "black" && 
		cells[12][11].style.backgroundColor == "black" && 
		cells[13][6].style.backgroundColor == "black" && 
		cells[13][7].style.backgroundColor == "black" && 
		cells[13][8].style.backgroundColor == "black" && 
		cells[13][9].style.backgroundColor == "black"
	)
	{
		cells[3][6].style.backgroundColor = colors.red;
		cells[3][7].style.backgroundColor = colors.red;
		cells[3][8].style.backgroundColor = colors.red;
		cells[3][9].style.backgroundColor = colors.red;
		cells[4][4].style.backgroundColor = colors.red;
		cells[4][5].style.backgroundColor = colors.lightred;
		cells[4][6].style.backgroundColor = colors.orange;
		cells[4][7].style.backgroundColor = colors.lightred;
		cells[4][8].style.backgroundColor = colors.lightred;
		cells[4][9].style.backgroundColor = colors.red;
		cells[4][10].style.backgroundColor = colors.red;
		cells[4][11].style.backgroundColor = colors.darkred;
		cells[5][4].style.backgroundColor = colors.lightred;
		cells[5][5].style.backgroundColor = colors.orange;
		cells[5][6].style.backgroundColor = "white";
		cells[5][7].style.backgroundColor = colors.orange;
		cells[5][8].style.backgroundColor = colors.lightred;
		cells[5][9].style.backgroundColor = colors.lightred;
		cells[5][10].style.backgroundColor = colors.red;
		cells[5][11].style.backgroundColor = colors.red;
		cells[6][3].style.backgroundColor = colors.red;
		cells[6][4].style.backgroundColor = colors.lightred;
		cells[6][5].style.backgroundColor = colors.lightred;
		cells[6][6].style.backgroundColor = colors.orange;
		cells[6][7].style.backgroundColor = colors.lightred;
		cells[6][8].style.backgroundColor = colors.lightred;
		cells[6][9].style.backgroundColor = colors.lightred;
		cells[6][10].style.backgroundColor = colors.red;
		cells[6][11].style.backgroundColor = colors.red;
		cells[6][12].style.backgroundColor = colors.darkred;
		cells[7][3].style.backgroundColor = colors.lightred;
		cells[7][4].style.backgroundColor = colors.lightred;
		cells[7][5].style.backgroundColor = colors.lightred;
		cells[7][6].style.backgroundColor = colors.lightred;
		cells[7][9].style.backgroundColor = colors.red;
		cells[7][10].style.backgroundColor = colors.red;
		cells[7][11].style.backgroundColor = colors.red;
		cells[7][12].style.backgroundColor = colors.darkred;
		cells[8][4].style.backgroundColor = colors.lightred;
		cells[8][5].style.backgroundColor = colors.lightred;
		cells[8][7].style.backgroundColor = "white";
		cells[8][8].style.backgroundColor = colors.gray;
		cells[8][10].style.backgroundColor = colors.red;
		cells[8][11].style.backgroundColor = colors.darkred;
		cells[9][3].style.backgroundColor = "white";
		cells[9][7].style.backgroundColor = colors.gray;
		cells[9][8].style.backgroundColor = colors.gray;
		cells[9][12].style.backgroundColor = colors.gray;
		cells[10][4].style.backgroundColor = "white";
		cells[10][5].style.backgroundColor = "white";
		cells[10][6].style.backgroundColor = "white";
		cells[10][9].style.backgroundColor = colors.gray;
		cells[10][10].style.backgroundColor = colors.gray;
		cells[10][11].style.backgroundColor = colors.gray;
		cells[11][4].style.backgroundColor = colors.gray;
		cells[11][5].style.backgroundColor = "white";
		cells[11][6].style.backgroundColor = "white";
		cells[11][7].style.backgroundColor = "white";
		cells[11][8].style.backgroundColor = colors.gray;
		cells[11][9].style.backgroundColor = colors.gray;
		cells[11][10].style.backgroundColor = colors.gray;
		cells[11][11].style.backgroundColor = colors.gray;
		cells[12][6].style.backgroundColor = colors.gray;
		cells[12][7].style.backgroundColor = colors.gray;
		cells[12][8].style.backgroundColor = colors.gray;
		cells[12][9].style.backgroundColor = colors.gray;
	}
}