import React, {Component} from 'react';
import Game from "./Game";
import {addRandomTile, BOARD_SIDE, GameState, MoveDirection, moveDown, moveLeft, moveRight, moveUp} from "./Helpers";

export interface AppState {
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
        this.handleKeyLeft  = this.handleKeyLeft.bind(this);
        this.handleKeyRight = this.handleKeyRight.bind(this);
        this.handleKeyDown  = this.handleKeyDown.bind(this);
        this.handleKeyUp    = this.handleKeyUp.bind(this);
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

    generateNewGame() : void {
        this.setState(() => {
            return this.getStartingState();
        });
    }

    handleKeyLeft(currState : Readonly<AppState>) : void {
        let updatedState : AppState = moveLeft(currState);
        this.setState(() => {
            return updatedState;
        });
    }

    handleKeyRight(currState : Readonly<AppState>) : void {
        let updatedState : AppState = moveRight(currState);
        this.setState(() => {
            return updatedState;
        });
    }

    handleKeyDown(currState : Readonly<AppState>) : void {
        console.log("123"); // stub
        // console.log(event.key); // stub
        // if (event.key === "ArrowDown") {
        //     console.log("Key Down");
        // }
        let updatedState : AppState = moveDown(currState);
        this.setState(() => {
            return updatedState;
        });
    }

    handleKeyUp(currState : Readonly<AppState>) : void {
        let updatedState : AppState = moveUp(currState);
        this.setState(() => {
            return updatedState;
        });
    }

    // move(currState : Readonly<AppState>, m : MoveDirection) : void {
    //     let updatedState : AppState;
    //     moved = false;
    //     switch (m) {
    //         case MoveDirection.LEFT:
    //             updatedState = moveLeft(currState);
    //             moved = true;
    //             break;
    //         case MoveDirection.UP:
    //             moveUp();
    //             moved = true;
    //             break;
    //         case MoveDirection.DOWN:
    //             moveDown();
    //             moved = true;
    //             break;
    //         case MoveDirection.RIGHT:
    //             moveRight();
    //             moved = true;
    //             break;
    //         default:
    //             moved = false;
    //     }
    //     this.setState(() => {
    //         return updatedState;
    //     });
    // }

    render() {
        return (
            <div className="app">
                <div className="header">2048</div>
                <div className="score-block">Score: {this.state.score}</div>
                <button className="reset-button" onClick={() => this.generateNewGame()}>New Game</button>
                <div>
                    <button onClick={() => this.handleKeyLeft(this.state)}> Left</button>
                    <button onClick={() => this.handleKeyRight(this.state)}>Right</button>
                    <button onClick={() => this.handleKeyDown(this.state)}> Down</button>
                    <button onClick={() => this.handleKeyUp(this.state)}>   Up</button>
                </div>
                <div> <Game gameState={this.state.gameState} tiles={this.state.tiles} /> </div>
            </div>
        );
    }
}

export default App;
