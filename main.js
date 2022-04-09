function htmlElements(){
    // Container for all elements on the page
    const container = document.querySelector(".container");
    const headerText = document.createElement("h1");

    const headerContainer = document.createElement("div");
    const contentContainer = document.createElement("div");
    // Contains a grid of "pixels"
    // Each row has a number of div "pixel" elements
    const gridContainer = document.createElement("div");
    gridContainer.setAttribute("id", "gridDiv");
    const buttonContainer = document.createElement("div");

    // Default container is 16 x 16 and the color drawn is black
    createPixelGrid(gridContainer, 16)
    draw(gridContainer, "black");

    createButtons(buttonContainer, gridContainer);

    gridContainer.style.display = "flex";
    gridContainer.style.height = "400px";
    gridContainer.style.width = "400px";

    gridContainer.style.border = "1.5px solid black";

    contentContainer.style.display = "flex";
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";

    headerText.textContent = "Etch-a-sketch";
    headerContainer.appendChild(headerText);

    contentContainer.appendChild(buttonContainer);
    contentContainer.appendChild(gridContainer);

    container.appendChild(headerContainer);
    container.appendChild(contentContainer);
}

function createPixelGrid(gridContainer, gridSize){
    for(let i = 0; i < gridSize; i++){
        const rowContainer = document.createElement("div");

        for(let j = 0; j < gridSize; j++){
            const pixelDiv = document.createElement("div");
            pixelDiv.setAttribute("id", "pixelDiv");
            let paddingOffset = gridSize * 2.5;
            let heightAndWidth = (400 - (paddingOffset * 2)) / gridSize;
            pixelDiv.style.height = heightAndWidth + "px";
            pixelDiv.style.width = heightAndWidth + "px";
            pixelDiv.style.padding = "2.5px";
            
            rowContainer.appendChild(pixelDiv);
        }
        gridContainer.appendChild(rowContainer);
    }
}
const drawObject = {color: "black", isDrawing: false };

function mouseDownHandler(e){
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
function mouseUpHandler(e){
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

function createButtons(buttonContainer, gridContainer){
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
        gridContainer.removeEventListener('mousedown', mouseDownHandler); 
        gridContainer.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);

        draw(gridContainer, getRandomColor());
    });


    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(randomColorButton);

}

htmlElements();
