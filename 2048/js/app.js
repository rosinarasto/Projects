let cells = [];
let score = 0;
let bestScore = 0;

for (let i = 0; i < 4; ++i)
    cells.push([0, 0, 0, 0]);

cells[getRandomInt(4)][getRandomInt(4)] = 2;
fillEmptyCell();
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
function fillEmptyCell() {
    let x, y;

    while (cells[(x = getRandomInt(4))][(y = getRandomInt(4))] != 0);

    cells[x][y] = 2;
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

// keyboard
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            makeMove(1, 4, 1, false);
            break;
    
        case 'ArrowDown':
            makeMove(2, -1, -1, false);
            break;

        case 'ArrowLeft':
            makeMove(1, 4, 1, true);
            break;
    
        case 'ArrowRight':
            makeMove(2, -1, -1, true);
            break;

        default:
            break;
    }
})

// move every cell in particular direction
function makeMove (start, end, step, vertical) {
    let moves = 0;

    for (let i = 0; i < 4; ++i) {
        let border = (start - step);

        for (let j = start; j != end; j += step) {
            if (vertical) {
                if (cells[i][j] == 0)
                    continue;

                for (let k = j; k != border; k -= step) {
                    if (cells[i][k - step] == 0) {
                        cells[i][k - step] = cells[i][k];
                        cells[i][k] = 0;
                        moves++;
                    }
                    else if (cells[i][k - step] == cells[i][k]) {
                        cells[i][k - step] *= 2;
                        cells[i][k] = 0;
                        score += cells[i][k - step];
                        border = k;
                        moves++;
                        break;
                    }
                    else {
                        border += step
                        break;
                    }
                }

            } else {
                if (cells[j][i] == 0)
                    continue;

                for (let k = j; k != border; k -= step) {
                    if (cells[k - step][i] == 0) {
                        cells[k - step][i] = cells[k][i];
                        cells[k][i] = 0;
                        moves++;
                    }
                    else if (cells[k - step][i] == cells[k][i]) {
                        cells[k - step][i] *= 2;
                        cells[k][i] = 0;
                        score += cells[k - step][i];
                        border = k;
                        moves++;
                        break;
                    }
                    else {
                        border += step
                        break;
                    }
                }

            }
        }

    }

    if (moves > 0)
        fillEmptyCell();

    drawCells();
}

// end of game, evaluate result
function fullTable() {
    console.log('score:');
    console.log(score);
}
