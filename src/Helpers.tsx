import {AppState} from "./App";

export enum GameState {
    RUNNING,
    LOST,
    WON
}

export enum MoveDirection {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export const BOARD_SIDE : number = 4;
export const EMPTY_TILE_VALUE : number = 0;
export const TARGET : number = 2048;

/* Return a random integer from min up to max (excluding max) */
export function generateRandomNumber(min : number, max : number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function addRandomTile(currState : AppState, tileValueIs2 : boolean) {
    let tiles : number[][] = currState.tiles;
    let x, y : number;
    do {
        x = generateRandomNumber(0, BOARD_SIDE);
        y = generateRandomNumber(0, BOARD_SIDE);
    } while (tiles[x][y] !== EMPTY_TILE_VALUE);
    addTile(currState, x, y, tileValueIs2);
}

function addTile(currState : AppState, x : number, y : number, tileValueIs2 : boolean) {
    let tiles : number[][] = currState.tiles;
    if (tiles[x][y] !== EMPTY_TILE_VALUE) {
        alert("ERROR");
    } else {
        if (tileValueIs2) {
            tiles[x][y] = 2;
        } else {
            tiles[x][y] = (Math.random() < 0.5) ? 2 : 4;
        }
        currState.emptyTilesLeft--;
        if (currState.emptyTilesLeft === 0 && !isThereAnyAvailableMove(tiles))
            currState.gameState = GameState.LOST;
    }
}

export function moveLeft(currState : AppState) : void {
    let tiles : number[][] = currState.tiles;
    for (let y : number = 0; y < BOARD_SIDE; y++) {
        for (let x : number = 0; x < BOARD_SIDE; x++) {
            if (tiles[x][y] !== EMPTY_TILE_VALUE) {
                let i : number = findMergeableTile(tiles, x, y, MoveDirection.LEFT);
                if (i !== -1) {
                    currState.moved = true;
                    handleMerge(currState, x, y, i, true);
                }
                gravityLeft(currState, x, y);
            }
        }
    }
}

function gravityLeft(currState : AppState, x : number, y : number) : void {
    let tiles : number[][] = currState.tiles;
    while (x > 0 && tiles[x-1][y] === EMPTY_TILE_VALUE) {
        currState.moved = true;
        moveTileValue(tiles, x, y, x-1, y);
        x--;
    }
}

export function moveRight(currState : AppState) : void {
    let updatedState : AppState = Object.assign({}, currState);
    let tiles : number[][] = updatedState.tiles;
    for (let y : number = 0; y < BOARD_SIDE; y++) {
        for (let x : number = BOARD_SIDE - 1; x >= 0; x--) {
            if (tiles[x][y] !== EMPTY_TILE_VALUE) {
                let i : number = findMergeableTile(tiles, x, y, MoveDirection.RIGHT);
                if (i !== -1) {
                    currState.moved = true;
                    handleMerge(updatedState, x, y, i, true);
                }
                gravityRight(currState, x, y);
            }
        }
    }
}

function gravityRight(currState : AppState, x : number, y : number) : void {
    let tiles : number[][] = currState.tiles;
    while (x < BOARD_SIDE - 1 && tiles[x+1][y] === EMPTY_TILE_VALUE) {
        currState.moved = true;
        moveTileValue(tiles, x, y, x+1, y);
        x++;
    }
}

export function moveUp(currState : AppState) : void {
    let updatedState : AppState = Object.assign({}, currState);
    let tiles : number[][] = updatedState.tiles;
    for (let x : number = 0; x < BOARD_SIDE; x++) {
        for (let y : number = 0; y < BOARD_SIDE; y++) {
            if (tiles[x][y] !== EMPTY_TILE_VALUE) {
                let i : number = findMergeableTile(tiles, x, y, MoveDirection.UP);
                if (i !== -1) {
                    currState.moved = true;
                    handleMerge(updatedState, x, y, i, false);
                }
                gravityUp(currState, x, y);
            }
        }
    }
}

function gravityUp(currState : AppState, x : number, y : number) : void {
    let tiles : number[][] = currState.tiles;
    while (y > 0 && tiles[x][y-1] === EMPTY_TILE_VALUE) {
        currState.moved = true;
        moveTileValue(tiles, x, y, x, y-1);
        y--;
    }
}

export function moveDown(currState : AppState) : void {
    let updatedState : AppState = Object.assign({}, currState);
    let tiles : number[][] = updatedState.tiles;
    for (let x : number = 0; x < BOARD_SIDE; x++) {
        for (let y : number = BOARD_SIDE - 1; y >= 0; y--) {
            if (tiles[x][y] !== EMPTY_TILE_VALUE) {
                let i : number = findMergeableTile(tiles, x, y, MoveDirection.DOWN);
                if (i !== -1) {
                    currState.moved = true;
                    handleMerge(updatedState, x, y, i, false);
                }
                gravityDown(currState, x, y);
            }
        }
    }
}

function gravityDown(currState : AppState, x : number, y : number) : void {
    let tiles : number[][] = currState.tiles;
    while (y < BOARD_SIDE - 1 && tiles[x][y+1] === EMPTY_TILE_VALUE) {
        currState.moved = true;
        moveTileValue(tiles, x, y, x, y+1);
        y++;
    }
}

function findMergeableTile(tiles : number[][], x : number, y : number, m : MoveDirection) : number {
    let tileXYValue : number = tiles[x][y];
    switch (m) {
        case MoveDirection.UP:
            for (let i : number = y+1; i < BOARD_SIDE; i++) {
            if (tiles[x][i] !== tileXYValue && tiles[x][i] !== EMPTY_TILE_VALUE)
                break;
            if (tiles[x][i] === tileXYValue)
                return i;
        }
            break;
        case MoveDirection.DOWN:
            for (let i : number = y-1; i >= 0; i--) {
            if (tiles[x][i] !== tileXYValue && tiles[x][i] !== EMPTY_TILE_VALUE)
                break;
            if (tiles[x][i] === tileXYValue)
                return i;
        }
            break;
        case MoveDirection.LEFT:
            for (let i : number = x+1; i < BOARD_SIDE; i++) {
            if (tiles[i][y] !== tileXYValue && tiles[i][y] !== EMPTY_TILE_VALUE)
                break;
            if (tiles[i][y] === tileXYValue)
                return i;
        }
            break;
        case MoveDirection.RIGHT:
            for (let i : number = x-1; i >= 0; i--) {
            if (tiles[i][y] !== tileXYValue && tiles[i][y] !== EMPTY_TILE_VALUE)
                break;
            if (tiles[i][y] === tileXYValue)
                return i;
        }
            break;
        default:
            console.log("ERROR");
    }
    return -1;
}

function handleMerge(currState : AppState, x : number,  y : number,  i : number, isHorizontal : boolean) : void {
    let tiles : number[][] = currState.tiles;
    if (isHorizontal)
        mergeAndClearTiles(tiles, x, y, i, y);
    else
        mergeAndClearTiles(tiles, x, y, x, i);

    currState.score += tiles[x][y];
    currState.emptyTilesLeft++;
    if (tiles[x][y] === TARGET)
        currState.gameState = GameState.WON;
}

function moveTileValue(tiles : number[][], srcX : number, srcY : number, destX : number, destY : number) : void {
    tiles[destX][destY] = tiles[srcX][srcY];
    tiles[srcX][srcY] = EMPTY_TILE_VALUE;
}

function mergeAndClearTiles(tiles : number[][], mergedX : number, mergedY : number, clearedX : number, clearedY : number) : void {
    if (tiles[mergedX][mergedY] !== tiles[clearedX][clearedY]) {
        console.log("ERROR");
    }
    else {
        tiles[mergedX][mergedY] *= 2;
        clear(tiles, clearedX, clearedY);
    }
}

function clear(tiles : number[][], x : number, y : number) : void {
    tiles[x][y] = EMPTY_TILE_VALUE;
}

function isThereAnyAvailableMove(tiles : number[][]) : boolean {
    for (let y : number = 0; y < BOARD_SIDE; y++) {
        for (let x : number = 0; x < BOARD_SIDE; x++) {
            if (findMergeableTile(tiles, x, y, MoveDirection.UP)    !== -1 ||
                findMergeableTile(tiles, x, y, MoveDirection.DOWN)  !== -1 ||
                findMergeableTile(tiles, x, y, MoveDirection.LEFT)  !== -1 ||
                findMergeableTile(tiles, x, y, MoveDirection.RIGHT) !== -1)
                return true;
        }
    }
    return false;
}