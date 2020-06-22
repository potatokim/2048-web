import React, {Component} from 'react';
import Game from "./Game";
import {addRandomTile} from "./Helpers";

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

interface AppState {
    gameState : GameState,
    score : number,
    tiles: number[][],
    moved : boolean,
    greatestTile : number,
    emptyTilesLeft : number
}
class App extends Component<{}, AppState> {

    constructor(props : object) {
        super(props);
        this.state = this.getStartingState();
        this.handleKeyLeft = this.handleKeyLeft.bind(this);
        this.handleKeyRight = this.handleKeyRight.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    getStartingState() : AppState {
        let tiles : number[][] = new Array(4)
            .fill(0)
            .map(
                () => new Array(4).fill(0)
            );
        addRandomTile(tiles, true);
        addRandomTile(tiles, true);
        return {
            gameState: GameState.RUNNING,
            score: 0,
            tiles: tiles,
            moved: false,
            greatestTile: 0,
            emptyTilesLeft: BOARD_SIDE * BOARD_SIDE,
        };
    }

    generateNewGame(): void {
        this.setState(() => {
            return this.getStartingState();
        });
    }

    handleKeyLeft() {

    }

    handleKeyRight() {

    }

    handleKeyDown() {
        console.log("123"); // stub
        // console.log(event.key); // stub
        // if (event.key === "ArrowDown") {
        //     console.log("Key Down");
        // }
    }

    handleKeyUp() {

    }

    render() {
        return (
            <div className="app">
                <div className="header">2048</div>
                <div className="score-block">Score: 0</div>
                <button className="reset-button" onClick={() => this.generateNewGame()}>New Game</button>
                <div>
                    <button onClick={() => this.handleKeyLeft}>Left</button>
                    <button onClick={() => this.handleKeyRight}>Right</button>
                    <button onClick={() => this.handleKeyDown}>Down</button>
                    <button onClick={() => this.handleKeyUp()}>Up</button>
                </div>
                <div> <Game gameState={this.state.gameState} tiles={this.state.tiles}/> </div>
            </div>
        );
    }
}

export default App;
