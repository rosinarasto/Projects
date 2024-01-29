let cells = [];
let score = 0;
let bestScore = 0;
let gameInProcess = true;

for (let i = 0; i < 4; ++i)
    cells.push([0, 0, 0, 0]);

cells[getRandomInt(4)][getRandomInt(4)] = 2;
fillEmptyCell();
drawCells();
drawScore();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getClassName(cell) {
    if (cell == 0)
        return ' isEmpty';

    return ' is' + cell; 
}

//find and fill empty cell if there is any
function fillEmptyCell() {
    if (fullTable())
        return;

    let x, y;

    while (cells[(x = getRandomInt(4))][(y = getRandomInt(4))] != 0);

    cells[x][y] = 2;
}

function fullTable() {

    for (let i = 0; i < 4; i++)

        for (let j = 0; j < 4; j++)
            if (cells[i][i] == 0)
                return false;

    return true;
}

//add number and collor to cells that are not empty
function drawCells() {

    for (let i = 0; i < 4; ++i)

        for (let j = 0; j < 4; ++j) {
            let row = document.querySelector('.row:nth-child(' + (i + 1) + ')');
            let cell = row.querySelector(':nth-child(' + (j + 1) + ')');            

            if (cells[i][j] != 0)
                cell.innerHTML = cells[i][j];
            else
                cell.innerHTML = '';

            cell.className = 'cell' + getClassName(cells[i][j]);
        }

}

function drawScore() {
    document.querySelector('.score:nth-child(1)').querySelector('.num-score').innerHTML = score;
    document.querySelector('.score:nth-child(2)').querySelector('.num-score').innerHTML = bestScore;
}

// keyboard
document.addEventListener('keydown', (event) => {
    if (!gameInProcess)
        return;

    let madeMove = false;
    switch (event.key) {
        case 'ArrowUp':
            madeMove = makeMove(1, 4, 1, false);
            break;
    
        case 'ArrowDown':
            madeMove = makeMove(2, -1, -1, false);
            break;

        case 'ArrowLeft':
            madeMove = makeMove(1, 4, 1, true);
            break;
    
        case 'ArrowRight':
            madeMove = makeMove(2, -1, -1, true);
            break;

        default:
            return;
    }

    if (madeMove) {
        fillEmptyCell()
        drawCells();
        drawScore();
    }

    gameOver(endOfGame());
})

// move every cell in particular direction
function makeMove (start, end, step, vertical) {
    let moves = 0;
    let result;

    for (let i = 0; i < 4; ++i) {
        let border = (start - step);

        for (let j = start; j != end; j += step) {
            if ((vertical && cells[i][j] == 0) || (!vertical && cells[j][i] == 0))
                continue;

            for (let k = j; k != border; k -= step) {
                result = (vertical) ? shiftCell(i, i, k - step, k) : shiftCell(k - step, k, i, i);
                
                if (result == 0) {
                    moves++
                    border = k;   
                    break;
                } else if (result == 2) {
                    border += step;
                    break;
                } else moves++;

            }

        }

    }

    return (moves > 0);
}

function shiftCell(nextX, currX, nextY, currY) {    
    let result = 0;

    if (cells[nextX][nextY] == 0 || cells[nextX][nextY] == cells[currX][currY]) {
        if (cells[nextX][nextY] == cells[currX][currY]) {
            score += (2 * cells[nextX][nextY]);
            result = 1;
        }
        cells[nextX][nextY] += cells[currX][currY];
        cells[currX][currY] = 0;

        return (result == 0) ? 1 : 0;
    }

    return 2;
}

// decide if table is full, player won or game should go on
function endOfGame() {

    for (let i = 0; i < 4; ++i) {
        if (cells[i][3] == 0)
            return 0;

        if (cells[i][3] == 2048)
            return 2;

        for (let j = 0; j < 3; ++j) {
            if (cells[i][j] == 0)
                return 0;
            if (cells[i][j] == 2048)
                return 2;
            if (cells[i][j] == cells[i][j + 1])
                return 1;
            if (cells[j][i] == cells[j + 1][i])
                return 1;
        }

    }

    return 3;
}

// end of game, evaluate result
function gameOver(ending) {
    if (ending < 2 || ending > 3)
        return;

    document.querySelector('.game-process').querySelector('h2').innerHTML = (ending == 3) ? 'Game over' : 'You won!!'; 
    document.querySelector('.game-process').className = 'game-over';
    document.querySelector('footer').querySelector('.reset-button').className = 'game-process reset-button';
    if (score > bestScore)
        bestScore = score;

    drawScore();
    gameInProcess = false;
}

function reset() {

    for (let i = 0; i < 4; i++)

        for (let j = 0; j < 4; j++)
            cells[i][j] = 0;

    score = 0;
    fillEmptyCell();
    fillEmptyCell();
    drawCells();
    drawScore();

    if (!gameInProcess) {
        document.querySelector('.game-over').className = 'game-process';
        document.querySelector('footer').querySelector('.reset-button').className = 'reset-button';
        gameInProcess = true;
    }
}
