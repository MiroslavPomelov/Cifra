
let squareArray = new Array();

document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';

for (let i = 0; i < 8; i++) {
    let strokeDiv = document.createElement('div');
    strokeDiv.id = i + 1;
    strokeDiv.style.display = 'flex';

    for (let j = 0; j < 8; j++) {
        let squareDiv = document.createElement('div');
        squareDiv.id = `${i + 1}${j + 1}`;
        squareDiv.style.width = '100px';
        squareDiv.style.height = '100px';
        squareDiv.style.display = 'flex';
        squareDiv.style.alignItems = 'flex-end';
        squareDiv.style.justifyContent = 'center';


        if ((i + j) % 2 == 0) {
            squareDiv.style.backgroundColor = 'beige';
        }
        else {
            squareDiv.style.backgroundColor = 'brown';
        }

        strokeDiv.appendChild(squareDiv);
        squareArray.push(squareDiv);
    }
    document.body.appendChild(strokeDiv);
}


for (let y = 0; y <= squareArray.length; y++) {
    if (y > 15 && y < 48) {
        continue;
    }

    let newFigure = document.createElement('div');

    newFigure.style.backgroundImage = "url(wP.png)";
    newFigure.style.width = "80px";
    newFigure.style.height = "80px";

    if (y >= 8 && y <= 15) {
        squareArray[y].appendChild(newFigure);
    }


    if (y == 0 || y == 7) {
        let wR = document.createElement('div');

        wR.style.backgroundImage = "url(wR.png)";
        wR.style.width = "80px";
        wR.style.height = "80px";
        wR.style.alignItems = "center";
        squareArray[y].appendChild(wR);
    }


    if (y == 1 || y == 6) {
        let wN = document.createElement('div');

        wN.style.backgroundImage = "url(wN.png)";
        wN.style.width = "80px";
        wN.style.height = "80px";
        wN.style.alignItems = "center";
        squareArray[y].appendChild(wN);

    }

    if (y == 2 || y == 5) {
        let wB = document.createElement('div');

        wB.style.backgroundImage = "url(wB.png)";
        wB.style.width = "80px";
        wB.style.height = "80px";
        wB.style.alignItems = "center";
        squareArray[y].appendChild(wB);
    }

    if (y == 3) {
        let wK = document.createElement('div');

        wK.style.backgroundImage = "url(wK.png)";
        wK.style.width = "80px";
        wK.style.height = "80px";
        wK.style.alignItems = "center";
        squareArray[y].appendChild(wK);
    }

    if (y == 4) {
        let wQ = document.createElement('div');

        wQ.style.backgroundImage = "url(wQ.png)";
        wQ.style.width = "80px";
        wQ.style.height = "80px";
        wQ.style.alignItems = "center";
        squareArray[y].appendChild(wQ);
    }













    if (y >= 48 && y <= 55) {
        let bP = document.createElement('div');

        bP.style.backgroundImage = "url(bP.png)";
        bP.style.width = "80px";
        bP.style.height = "80px";
        bP.style.alignItems = "center";
        squareArray[y].appendChild(bP);
    }

    if (y == 56 || y == 63) {
        let bR = document.createElement('div');

        bR.style.backgroundImage = "url(bR.png)";
        bR.style.width = "80px";
        bR.style.height = "80px";
        bR.style.alignItems = "center";
        squareArray[y].appendChild(bR);
    }

    if (y == 57 || y == 62) {
        let bN = document.createElement('div');

        bN.style.backgroundImage = "url(bN.png)";
        bN.style.width = "80px";
        bN.style.height = "80px";
        bN.style.alignItems = "center";
        squareArray[y].appendChild(bN);
    }

    if (y == 58 || y == 61) {
        let bB = document.createElement('div');

        bB.style.backgroundImage = "url(bB.png)";
        bB.style.width = "80px";
        bB.style.height = "80px";
        bB.style.alignItems = "center";
        squareArray[y].appendChild(bB);
    }

    if (y == 59) {
        let wK = document.createElement('div');

        wK.style.backgroundImage = "url(bK.png)";
        wK.style.width = "80px";
        wK.style.height = "80px";
        wK.style.alignItems = "center";
        squareArray[y].appendChild(wK);
    }

    if (y == 60) {
        let wQ = document.createElement('div');

        wQ.style.backgroundImage = "url(bQ.png)";
        wQ.style.width = "80px";
        wQ.style.height = "80px";
        wQ.style.alignItems = "center";
        squareArray[y].appendChild(wQ);
    }
}


