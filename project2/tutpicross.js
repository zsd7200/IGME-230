// setup a 16x16 grid, each 25x25 pixels
const numCols = 16;
const numRows = 16;
const cellWidth = 25;
const cellSpacing = 0;

// variables for setting the text at the top
let tutCurrent = 0;
let tutorial = document.querySelector("#tutorial");
const tutText = [
	"This level is designed to help you learn how to play Picross.", 
	"Picross is a type of puzzle game that, when solved, will reveal an image.",
	"You play by filling in blocks in a certain way. You can fill in a block by clicking on it, and erase a block by double-clicking.",
	"For this tutorial, I'll help guide you through a pretty easy Picross puzzle!",
	"Now, let's talk about the numbers, Mason. What do they mean?",
	"The numbers are how many blocks are to be filled in in a given column or row.",
	"For example, look at the numbers at the top.",
	"The first three of those numbers are 0, so that means that you have to fill in 0 blocks from that column.",
	"So that means you can essentially ignore those columns, since there are no blocks to be filled in.",
	"Looking for 0's and 16's can really help, since you'll know if you don't have to fill in anything, or if you have to fill in a whole column or row!",
	"Now, let's look at the numbers to the left.",
	"There are four 0's there, so that means there are no blocks in those rows.",
	"So with all the rows and columns with 0 out of the running, that shrinks our playing field a bit, so that'll make this puzzle a little easier!",
	"Now that we've shrunk our playing field, let's get to the fun part--actually solving the puzzle!",
	"The top row has quite a few 1's and a couple 3's, but how do we use those to solve the puzzle?",
	"The columns with more than one number in them mean that there are blocks to be filled in in that order.",
	"For example, the columns that say '3 1' have a line of 3 blocks, then one block, in that order.",
	"The same goes for the rows that say '1 1'--they have one block, then another block in another place.",
	"When lines have spacing like this, it's so that you create gaps when you solve it, helping to make the picture at the end.",
	"Now if you look closely, there is only one place where the lines of 3 can go, since there is only one set of rows that have 3 blocks in a row.",
	"I've highlighted the blocks in red, in case you were a bit confused. Feel free to fill them in by clicking on them!",
	"Just by filling in those two lines, we're already halfway done with this puzzle!",
	"Take a look at the remaining two rows.",
	"One of the remaining rows is a line of 4, which is key to solving the puzzle.",
	"This is key, because if it touches any of the blocks filled in from the row directly above it, it would make it incorrect.",
	"So we know that there is a line of 4, and two blocks above it that do not touch the line.",
	"With this in mind, we should be able to solve the puzzle!",
	"So go ahead and fill in what you believe to be the last blocks. If you're right, you should see a smiley face!",
	"Congratulations, you've completed your first Picross puzzle!"
];

// setting up variables for displaying the numbers
let horizText = document.querySelector("#horizText");
let vertText2 = document.querySelector("#vertText2");
let vertText1 = document.querySelector("#vertText1");

const smileHoriz = ["0", "0", "0", "0", "1 1", "1 1", "1 1", "0", "0", "1 1", "4", "0", "0", "0", "0", "0"];
const smileVert2 = ["", "", "", "", "", "3", "", "", "", "", "3", "", "", "", "", ""];
const smileVert1 = ["0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0"];

// setup the button variables
let backButton = document.querySelector("#backButton");
let nextButton = document.querySelector("#nextButton");

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
	horizP.innerHTML = smileHoriz[row];
	horizText.appendChild(horizP);
	
	let vertP1 = document.createElement('p');
	vertP1.innerHTML = smileVert1[row];
	vertText1.appendChild(vertP1);
	
	// vert 2 needs to have a solid white border so there will not be
	// seemingly random purple blocks next to some numbers
	let vertP2 = document.createElement('p');
	vertP2.innerHTML = smileVert2[row];
	if (smileVert2[row] == "") { vertP2.style.border = "1px solid white"; }
	vertText2.appendChild(vertP2);

	
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

// setup event handlers for when the container or buttons are clicked
container.onclick = fillCell;
nextButton.onclick = advanceText;

backButton.onclick = (e) => {
	tutCurrent -= 2;
	if(tutCurrent < 0) tutCurrent = 0;
	advanceText(e);
}

// advanceText transitions the text under the header to
// help teach the player how to play picross
function advanceText(e)
{
	if(tutCurrent + 1 <= tutText.length)
	{
		// fade the old text out
		tutorial.style.opacity = 0;
		
		// use setTimeout to time out the fade in of the new text
		setTimeout(function(){
			if (tutCurrent > 28) tutCurrent = 28;
		
			tutorial.innerHTML = tutText[tutCurrent]; // set the new text
			
			// at a certain point in the tutorial highlight certain blocks
			if(tutCurrent == 19)
			{
				cells[4][5].style.borderColor = "red";
				cells[5][5].style.borderColor = "red";
				cells[6][5].style.borderColor = "red";
				
				cells[4][10].style.borderColor = "red";
				cells[5][10].style.borderColor = "red";
				cells[6][10].style.borderColor = "red";
			}
			
			// at the end of the tutorial turn =) into =D
			if(tutCurrent == 28)
			{
				cells[9][6].style.backgroundColor = "black";
				cells[9][6].style.borderTop = "1px solid white";
				cells[9][6].style.borderLeft = "1px solid white";
				cells[9][7].style.backgroundColor = "black";
				cells[9][7].style.borderTop = "1px solid white";
				cells[9][7].style.borderLeft = "1px solid white";
				cells[9][8].style.backgroundColor = "black";
				cells[9][8].style.borderTop = "1px solid white";
				cells[9][8].style.borderLeft = "1px solid white";
				cells[9][9].style.backgroundColor = "black";
				cells[9][9].style.borderTop = "1px solid white";
				cells[9][9].style.borderLeft = "1px solid white";
				cells[10][5].style.backgroundColor = "black";
				cells[10][5].style.borderTop = "1px solid white";
				cells[10][5].style.borderLeft = "1px solid white";
				cells[10][10].style.backgroundColor = "black";
				cells[10][10].style.borderTop = "1px solid white";
				cells[10][10].style.borderLeft = "1px solid white";
				cells[11][6].style.backgroundColor = "black";
				cells[11][6].style.borderTop = "1px solid white";
				cells[11][6].style.borderLeft = "1px solid white";
				cells[11][7].style.backgroundColor = "black";
				cells[11][7].style.borderTop = "1px solid white";
				cells[11][7].style.borderLeft = "1px solid white";
				cells[11][8].style.backgroundColor = "black";
				cells[11][8].style.borderTop = "1px solid white";
				cells[11][8].style.borderLeft = "1px solid white";
				cells[11][9].style.backgroundColor = "black";
				cells[11][9].style.borderTop = "1px solid white";
				cells[11][9].style.borderLeft = "1px solid white";
			}
			
			tutCurrent++; // increment the count
			tutorial.style.opacity = 1; // fade the text back in
		}, 500);
	}
	
	// in the case of the next button being mashed, the text shown will be
	// the last entry in the t
	if(tutCurrent > tutText.length) tutorial.innerHTML = tutText[tutText.length - 1];
}

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