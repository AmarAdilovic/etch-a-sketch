function htmlElements(){
    // Container for all elements on the page
    const container = document.querySelector(".container");

    const headerContainer = document.createElement("div");
    // Contains a grid of "pixels" 
    const gridContainer = document.createElement("div");
    // Each container has 16 div "pixel" elements
    const rowContainer = document.createElement("div");

    for(let i = 0; i < 16; i++){
        const rowContainer = document.createElement("div");

        for(let j = 0; j < 16; j++){
            const pixelDiv = document.createElement("div");
            pixelDiv.textContent = "pixel";
            pixelDiv.style.color = "blue";
            pixelDiv.style.padding = "2.5px";
            rowContainer.appendChild(pixelDiv);
        }
        gridContainer.appendChild(rowContainer);

    }
    gridContainer.style.display = "flex";
    gridContainer.appendChild(rowContainer);

    container.appendChild(headerContainer);
    container.appendChild(gridContainer);
}


htmlElements();
