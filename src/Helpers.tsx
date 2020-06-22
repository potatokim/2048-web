/* Return a random integer from min up to max (excluding max) */
import {BOARD_SIDE, EMPTY_TILE_VALUE} from "./App";

export function generateRandomNumber(min : number, max : number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function addRandomTile(tiles : number[][], tileValueIs2 : boolean) {
    let x, y : number;
    do {
        x = generateRandomNumber(0, BOARD_SIDE);
        y = generateRandomNumber(0, BOARD_SIDE);
    } while (tiles[x][y] !== EMPTY_TILE_VALUE);
    addTile(tiles, x, y, tileValueIs2);
}

export function addTile(tiles : number[][], x : number, y : number, tileValueIs2 : boolean) {
    if (tiles[x][y] !== EMPTY_TILE_VALUE) {
        alert("ERROR");
    } else {
        if (tileValueIs2) {
            tiles[x][y] = 2;
        } else {
            tiles[x][y] = (Math.random() < 0.5) ? 2 : 4;
        }
    }
}