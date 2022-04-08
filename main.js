function htmlElements(){
    // Container for all elements on the page
    const container = document.querySelector(".container");

    const headerContainer = document.createElement("div");
    const headerText = document.createElement("h1");
    headerText.textContent = "Etch-a-sketch";
    // Contains a grid of "pixels"
    // Each row has a number of div "pixel" elements
    const gridContainer = document.createElement("div");

    // Default container is 16 x 16 and the color drawn is black
    createPixelGrid(gridContainer, 16)
    draw(gridContainer, "black");

    gridContainer.style.display = "flex";
    container.style.display = "flex";
    
    headerContainer.appendChild(headerText);

    container.appendChild(headerContainer);
    container.appendChild(gridContainer);
}

function createPixelGrid(gridContainer, gridSize){
    for(let i = 0; i < gridSize; i++){
        const rowContainer = document.createElement("div");

        for(let j = 0; j < gridSize; j++){
            const pixelDiv = document.createElement("div");
            pixelDiv.style.height = "15px";
            pixelDiv.style.width = "15px";
            pixelDiv.style.padding = "2.5px";
            pixelDiv.style.border = "1.5px solid black";
            
            rowContainer.appendChild(pixelDiv);
        }
        gridContainer.appendChild(rowContainer);
    }
}

function draw(container, color){
    let isDrawing = false;
    let x = 0;
    let y = 0;    

    container.addEventListener('mousedown', e => {
        isDrawing = true;
        (e.target).style.backgroundColor = color;
    });
      
    container.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            (e.target).style.backgroundColor = color;
        }
    });
    
    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
          isDrawing = false;
        }
    });
}


htmlElements();
