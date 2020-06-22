import React, {Component} from 'react';
import './App.css';
import Game from "./Game";

export enum GameState {
    STARTED,
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

class App extends Component<{}, {gameState : GameState, tiles: number[][]}> {

    constructor(props : object) {
        super(props);
        this.state = {
            gameState: GameState.STARTED,
            tiles: new Array(4)
                .fill(0)
                .map(
                    () => new Array(4).fill(0)
                )
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount(): void {
        this.generateNewGame();
    }

    generateNewGame(): void {
        this.setState(() => {
            let updatedTiles : number[][] = new Array(4)
                .fill(0)
                .map(
                    () => new Array(4).fill(0)
                );
            this.addRandomTile(updatedTiles, true);
            this.addRandomTile(updatedTiles, true);
            return {
                gameState: GameState.RUNNING,
                tiles: updatedTiles
            }
        });
    }

    addRandomTile(tiles : number[][], tileValueIs2 : boolean) {
        let x, y : number;
        do {
            x = this.generateRandomNumber(0, BOARD_SIDE);
            y = this.generateRandomNumber(0, BOARD_SIDE);
        } while (tiles[x][y] !== EMPTY_TILE_VALUE);
        this.addTile(tiles, x, y, tileValueIs2);
    }

    addTile(tiles : number[][], x : number, y : number, tileValueIs2 : boolean) {
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

    /* Return a random integer from min up to max (excluding max) */
    generateRandomNumber(min : number, max : number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    handleKeyDown() {
        console.log("123"); // stub
        // console.log(event.key); // stub
        // if (event.key === "ArrowDown") {
        //     console.log("Key Down");
        // }
    }

    render() {
        return (
            <div className="app">
                <div className="header">2048</div>
                <div className="score-block">Score: 0</div>
                <button className="reset-button" onClick={() => this.generateNewGame()}>New Game</button>
                <div> <Game gameState={this.state.gameState} tiles={this.state.tiles}/> </div>
            </div>
        );
    }
}

export default App;
