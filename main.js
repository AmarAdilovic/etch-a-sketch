function htmlElements(){
    // Container for all elements on the page
    const container = document.querySelector(".container");

    const headerContainer = document.createElement("div");
    const headerText = document.createElement("h1");
    headerText.textContent = "Etch-a-sketch";
    // Contains a grid of "pixels" 
    const gridContainer = document.createElement("div");
    // Each container has 16 div "pixel" elements
    const rowContainer = document.createElement("div");

    for(let i = 0; i < 16; i++){
        const rowContainer = document.createElement("div");

        for(let j = 0; j < 16; j++){
            const pixelDiv = document.createElement("div");
            pixelDiv.style.height = "15px";
            pixelDiv.style.width = "15px";
            pixelDiv.style.padding = "2.5px";
            pixelDiv.style.border = "1.5px solid black";
            

            rowContainer.appendChild(pixelDiv);
        }
        gridContainer.appendChild(rowContainer);
    }
      
    draw(gridContainer, "black");

    gridContainer.style.display = "flex";
    gridContainer.appendChild(rowContainer);

    headerContainer.appendChild(headerText);

    container.style.display = "flex";
    
    container.appendChild(headerContainer);
    container.appendChild(gridContainer);
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
