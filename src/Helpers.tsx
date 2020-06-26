import {AppState} from "./GameContainer";

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

export interface Coordinate {
    x : number,
    y : number
}

export const BOARD_SIDE : number = 4;
export const EMPTY_TILE_VALUE : number = 0;
export const TARGET : number = 2048;

export function Coordinate(x : number, y : number) : Coordinate {
    return {x, y};
}

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

    addTile(currState, Coordinate(x, y), tileValueIs2);
}

function addTile(currState : AppState, c : Coordinate, tileValueIs2 : boolean) {
    let tiles : number[][] = currState.tiles;
    if (tiles[c.x][c.y] !== EMPTY_TILE_VALUE) {
        alert("ERROR");
    } else {
        if (tileValueIs2) {
            tiles[c.x][c.y] = 2;
        } else {
            tiles[c.x][c.y] = (Math.random() < 0.5) ? 2 : 4;
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
                let i : number = findMergeableTile(tiles, Coordinate(x, y), MoveDirection.LEFT);
                if (i !== -1) {
                    currState.moved = true;
                    handleMerge(currState, Coordinate(x, y), i, true);
                }
                gravityLeft(currState, Coordinate(x, y));
            }
        }
    }
}

function gravityLeft(currState : AppState, c : Coordinate) : void {
    let tiles : number[][] = currState.tiles;
    while (c.x > 0 && tiles[c.x-1][c.y] === EMPTY_TILE_VALUE) {
        currState.moved = true;
        moveTileValue(tiles, c, Coordinate(c.x-1, c.y));
        c.x--;
    }
}

export function moveRight(currState : AppState) : void {
    let tiles : number[][] = currState.tiles;
    for (let y : number = 0; y < BOARD_SIDE; y++) {
        for (let x : number = BOARD_SIDE - 1; x >= 0; x--) {
            if (tiles[x][y] !== EMPTY_TILE_VALUE) {
                let i : number = findMergeableTile(tiles, Coordinate(x, y), MoveDirection.RIGHT);
                if (i !== -1) {
                    currState.moved = true;
                    handleMerge(currState, Coordinate(x, y), i, true);
                }
                gravityRight(currState, Coordinate(x, y));
            }
        }
    }
}

function gravityRight(currState : AppState, c : Coordinate) : void {
    let tiles : number[][] = currState.tiles;
    while (c.x < BOARD_SIDE - 1 && tiles[c.x+1][c.y] === EMPTY_TILE_VALUE) {
        currState.moved = true;
        moveTileValue(tiles, c, Coordinate(c.x+1, c.y));
        c.x++;
    }
}

export function moveUp(currState : AppState) : void {
    let tiles : number[][] = currState.tiles;
    for (let x : number = 0; x < BOARD_SIDE; x++) {
        for (let y : number = 0; y < BOARD_SIDE; y++) {
            if (tiles[x][y] !== EMPTY_TILE_VALUE) {
                let i : number = findMergeableTile(tiles, Coordinate(x, y), MoveDirection.UP);
                if (i !== -1) {
                    currState.moved = true;
                    handleMerge(currState, Coordinate(x, y), i, false);
                }
                gravityUp(currState, Coordinate(x, y));
            }
        }
    }
}

function gravityUp(currState : AppState, c : Coordinate) : void {
    let tiles : number[][] = currState.tiles;
    while (c.y > 0 && tiles[c.x][c.y-1] === EMPTY_TILE_VALUE) {
        currState.moved = true;
        moveTileValue(tiles, c, Coordinate(c.x, c.y-1));
        c.y--;
    }
}

export function moveDown(currState : AppState) : void {
    let tiles : number[][] = currState.tiles;
    for (let x : number = 0; x < BOARD_SIDE; x++) {
        for (let y : number = BOARD_SIDE - 1; y >= 0; y--) {
            if (tiles[x][y] !== EMPTY_TILE_VALUE) {
                let i : number = findMergeableTile(tiles, Coordinate(x, y), MoveDirection.DOWN);
                if (i !== -1) {
                    currState.moved = true;
                    handleMerge(currState, Coordinate(x, y), i, false);
                }
                gravityDown(currState, Coordinate(x, y));
            }
        }
    }
}

function gravityDown(currState : AppState, c : Coordinate) : void {
    let tiles : number[][] = currState.tiles;
    while (c.y < BOARD_SIDE - 1 && tiles[c.x][c.y+1] === EMPTY_TILE_VALUE) {
        currState.moved = true;
        moveTileValue(tiles, c, Coordinate(c.x, c.y+1));
        c.y++;
    }
}

function findMergeableTile(tiles : number[][], c : Coordinate, m : MoveDirection) : number {
    let tileXYValue : number = tiles[c.x][c.y];
    switch (m) {
        case MoveDirection.UP:
            for (let i : number = c.y+1; i < BOARD_SIDE; i++) {
            if (tiles[c.x][i] !== tileXYValue && tiles[c.x][i] !== EMPTY_TILE_VALUE)
                break;
            if (tiles[c.x][i] === tileXYValue)
                return i;
        }
            break;
        case MoveDirection.DOWN:
            for (let i : number = c.y-1; i >= 0; i--) {
            if (tiles[c.x][i] !== tileXYValue && tiles[c.x][i] !== EMPTY_TILE_VALUE)
                break;
            if (tiles[c.x][i] === tileXYValue)
                return i;
        }
            break;
        case MoveDirection.LEFT:
            for (let i : number = c.x+1; i < BOARD_SIDE; i++) {
            if (tiles[i][c.y] !== tileXYValue && tiles[i][c.y] !== EMPTY_TILE_VALUE)
                break;
            if (tiles[i][c.y] === tileXYValue)
                return i;
        }
            break;
        case MoveDirection.RIGHT:
            for (let i : number = c.x-1; i >= 0; i--) {
            if (tiles[i][c.y] !== tileXYValue && tiles[i][c.y] !== EMPTY_TILE_VALUE)
                break;
            if (tiles[i][c.y] === tileXYValue)
                return i;
        }
            break;
        default:
            console.log("ERROR");
    }
    return -1;
}

function handleMerge(currState : AppState, c : Coordinate,  i : number, isHorizontal : boolean) : void {
    let tiles : number[][] = currState.tiles;
    if (isHorizontal)
        mergeAndClearTiles(tiles, c, Coordinate(i, c.y));
    else
        mergeAndClearTiles(tiles, c, Coordinate(c.x, i));

    currState.score += tiles[c.x][c.y];
    currState.emptyTilesLeft++;

    if (tiles[c.x][c.y] === TARGET)
        currState.gameState = GameState.WON;
}

function moveTileValue(tiles : number[][], src : Coordinate, dest : Coordinate) : void {
    tiles[dest.x][dest.y] = tiles[src.x][src.y];
    tiles[src.x][src.y] = EMPTY_TILE_VALUE;
}

function mergeAndClearTiles(tiles : number[][], toMerge : Coordinate, toClear : Coordinate) : void {
    if (tiles[toMerge.x][toMerge.y] !== tiles[toClear.x][toClear.y]) {
        console.log("ERROR");
    }
    else {
        tiles[toMerge.x][toMerge.y] *= 2;
        clear(tiles, toClear);
    }
}

function clear(tiles : number[][], c : Coordinate) : void {
    tiles[c.x][c.y] = EMPTY_TILE_VALUE;
}

function isThereAnyAvailableMove(tiles : number[][]) : boolean {
    for (let y : number = 0; y < BOARD_SIDE; y++) {
        for (let x : number = 0; x < BOARD_SIDE; x++) {
            if (findMergeableTile(tiles, Coordinate(x, y), MoveDirection.UP)    !== -1 ||
                findMergeableTile(tiles, Coordinate(x, y), MoveDirection.DOWN)  !== -1 ||
                findMergeableTile(tiles, Coordinate(x, y), MoveDirection.LEFT)  !== -1 ||
                findMergeableTile(tiles, Coordinate(x, y), MoveDirection.RIGHT) !== -1)
                return true;
        }
    }
    return false;
}