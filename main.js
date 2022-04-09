function main(){
    // Container for all elements on the page
    const container = document.querySelector(".container");

    const headerContainer = document.createElement("div");
    const headerText = document.createElement("h1");

    const contentContainer = document.createElement("div");
    contentContainer.setAttribute("id", "contentDiv");

    const buttonContainer = document.createElement("div");
    createButtons(buttonContainer);

    contentContainer.style.display = "flex";
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";

    headerText.textContent = "Etch-a-sketch";
    headerContainer.appendChild(headerText);

    contentContainer.appendChild(buttonContainer);

    container.appendChild(headerContainer);
    container.appendChild(contentContainer);

    // Default container is 16 x 16 and the color drawn is black
    createPixelGrid(16);
}

function createPixelGrid(gridSize){
    // Contains a grid of "pixels"
    // Each row has a number of div "pixel" elements
    const gridContainer = document.createElement("div");
    gridContainer.setAttribute("id", "gridDiv");
    gridContainer.style.display = "flex";
    // Default size for the grid is a 400px x 400px window
    gridContainer.style.height = "400px";
    gridContainer.style.width = "400px";
    gridContainer.style.border = "1.5px solid black";

    // Nested for loops that set each of the elements in a row first then add that row to the larger gridContainer
    for(let i = 0; i < gridSize; i++){
        const rowContainer = document.createElement("div");
        rowContainer.setAttribute("id", "rowDiv");

        for(let j = 0; j < gridSize; j++){
            const pixelDiv = document.createElement("div");
            pixelDiv.setAttribute("id", "pixelDiv");

            // Each pixel has a 2.5px padding that must be offset
            let paddingOffset = gridSize * 2.5;
            let heightAndWidth = (400 - (paddingOffset * 2)) / gridSize;
            pixelDiv.style.height = heightAndWidth + "px";
            pixelDiv.style.width = heightAndWidth + "px";
            pixelDiv.style.padding = "2.5px";
            
            rowContainer.appendChild(pixelDiv);
        }
        gridContainer.appendChild(rowContainer);
    }

    draw(gridContainer, "black");

    const contentContainer = document.getElementById("contentDiv");
    contentContainer.appendChild(gridContainer);

}

function removePixelGrid(){
    const rowContainerList = document.querySelectorAll("#rowDiv");

    rowContainerList.forEach(function(rowContainer) {
        rowContainer.remove();
    });

    const pixelDivList = document.querySelectorAll("#pixelDiv");

    pixelDivList.forEach(function(pixelDiv) {
        pixelDiv.remove();
    });

    const gridContainer = document.getElementById("gridDiv");
    gridContainer.remove();
}

const drawObject = {color: "black", isDrawing: false };

function mouseDownHandler(e){
    // Must check if a pixelDiv is being selected, or else all divs will be acceptable 
    if(e.target.id === "pixelDiv"){
        (e.target).style.backgroundColor = drawObject.color;
        drawObject.isDrawing = true;
    }
}

function mouseMoveHandler(e){
    if (drawObject.isDrawing === true && e.target.id === "pixelDiv") {
        (e.target).style.backgroundColor = drawObject.color;
    }
}
function mouseUpHandler(){
    if (drawObject.isDrawing === true) {
        drawObject.isDrawing = false;
    }
}
function draw(container, color){
    drawObject.color = color;
    drawObject.isDrawing = false;

    container.addEventListener('mousedown', mouseDownHandler);
    container.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
}

function getRandomColor() {
    var hexLetters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += hexLetters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createButtons(buttonContainer){
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    resetButton.addEventListener('click', () => {
        const divs = document.querySelectorAll('div');
        divs.forEach((div) => {
            div.style.backgroundColor = "white";
        });
    });

    const randomColorButton = document.createElement("button");
    randomColorButton.textContent = "Random Color Mode";
    randomColorButton.addEventListener('click', () => {
        const gridContainer = document.querySelector("#gridDiv");

        gridContainer.removeEventListener('mousedown', mouseDownHandler); 
        gridContainer.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);

        draw(gridContainer, getRandomColor());
    });

    const changeGridSizeButton = document.createElement("button");
    changeGridSizeButton.textContent = "Change Grid Size";
    changeGridSizeButton.addEventListener('click', () => {
        let userNum = Number(window.prompt("Please enter a valid number (1 - 80): ", 16));
        if(Number.isNaN(userNum) || userNum > 80 || userNum < 1){
           alert("Invalid entry, please try again!");
        }
        else{
            removePixelGrid();
            createPixelGrid(userNum);
        }
    });

    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(randomColorButton);
    buttonContainer.appendChild(changeGridSizeButton);

}

main();
