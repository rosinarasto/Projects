let cells = [];

for (let i = 0; i < 4; ++i)
    cells.push([0, 0, 0, 0]);

cells[getRandomInt(4)][getRandomInt(4)] = 2;
fillEmptyCell(2);
drawCells();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getClassName(cell) {
    if (cell == 0)
        return ' isEmpty';

    return ' is' + cell; 
}

//find and fill empty cell if there is any
function fillEmptyCell(cellValue) {
    let x, y;

    for (x = 0; x < 4; ++x) {

        for (y = 0; y < 4; ++y)
            if (cells[x][y] == 0)
                break;
    
        if (y < 4)
            break; 
    }

    if (y == 4 && x == 4)
        return false;

    while (cells[(x = getRandomInt(4))][(y = getRandomInt(4))] != 0);

    cells[x][y] = cellValue;
    return true;
}

//add number and collor to cells that are not empty
function drawCells() {

    for (let i = 0; i < 4; ++i) {

        for (let j = 0; j < 4; ++j)
            if (cells[i][j] != 0) {
                let row = document.querySelector('.row:nth-child(' + (i + 1) + ')');
                let cell = row.querySelector(':nth-child(' + (j + 1) + ')');    
                cell.innerHTML = cells[i][j];
                cell.className = 'cell' + getClassName(cells[i][j]);
            }
    }

}

// keyboard
document.addEventListener('keydown', (event) => {
    if ((event.key == 'ArrowUp' || event.key == 'ArrowDown') && checkDirection(false))
        console.log('horizontal');
    if ((event.key == 'ArrowLeft' || event.key == 'ArrowRight') && checkDirection(true))
        console.log('vertical');
})

//decide if can move in direction
function checkDirection (vertical) {
    let count = 0;

    for (let i = 0; i < 4; ++i) {

        for (let j = 0; j < 3; ++j) {
            if (vertical && cells[i][j] != 0 && cells[i][j] == cells[i][j + 1])
                ++count;
            if (!vertical && cells[j][i] != 0 && cells[j][i] == cells[j + 1][i])
                ++count;
        }

        if (count >= 1)
            return true;

        count = 0;
    }

    return false;
}

// end of game, evaluate result
function fullTable() {

}
