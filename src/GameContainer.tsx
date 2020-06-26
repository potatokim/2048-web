import React, {Component} from "react";
import GameComponent from "./Components/GameComponent";
import {
    addRandomTile,
    BOARD_SIDE,
    GameState,
    MoveDirection,
    moveDown,
    moveLeft,
    moveRight,
    moveUp
} from "./Helpers";

export interface AppState {
    gameState       : GameState,
    score           : number,
    tiles           : number[][],
    moved           : boolean,
    greatestTile    : number,
    emptyTilesLeft  : number
}
class GameContainer extends Component<{}, AppState> {

    constructor(props : object) {
        super(props);
        this.state = this.getStartingState();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() : void {
        document.addEventListener("keydown", (event : KeyboardEvent) => this.handleKeyDown(event));
        // document.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() : void {
        // document.removeEventListener("keydown", this.handleKeyDown); // cannot work because of anonymous function
    }

    handleKeyDown(event : KeyboardEvent) : any {
        switch (event.key) {
            case "ArrowLeft":   this.move(this.state, MoveDirection.LEFT);  return;
            case "ArrowUp":     this.move(this.state, MoveDirection.UP);    return;
            case "ArrowDown":   this.move(this.state, MoveDirection.DOWN);  return;
            case "ArrowRight":  this.move(this.state, MoveDirection.RIGHT); return;
            default:
        }
    }

    getStartingState() : AppState {
        let tiles : number[][] = new Array(4)
            .fill(0)
            .map(
                () => new Array(4).fill(0)
            );
        let startingState : AppState = {
            gameState: GameState.RUNNING,
            score: 0,
            tiles: tiles,
            moved: false,
            greatestTile: 2,
            emptyTilesLeft: BOARD_SIDE * BOARD_SIDE,
        };
        addRandomTile(startingState, true);
        addRandomTile(startingState, true);
        return startingState;
    }

    generateNewGame() : void {
        this.setState(() => {
            return this.getStartingState();
        });
    }

    move(currState : Readonly<AppState>, m : MoveDirection) : void {
        if (this.state.gameState === GameState.RUNNING) {
            let updatedState : AppState = Object.assign({}, currState);
            updatedState.moved = false;

            switch (m) {
                case MoveDirection.LEFT:
                    moveLeft(updatedState);
                    break;
                case MoveDirection.UP:
                    moveUp(updatedState);
                    break;
                case MoveDirection.DOWN:
                    moveDown(updatedState);
                    break;
                case MoveDirection.RIGHT:
                    moveRight(updatedState);
                    break;
                default:
            }
            if (updatedState.moved) {
                addRandomTile(updatedState, false);
            }

            this.setState(() => {
                return updatedState;
            });
        }
    }

    render() {
        return (
            <GameComponent
                gameState={this.state.gameState}
                score={this.state.score}
                tiles={this.state.tiles}
                generateNewGame={this.generateNewGame}/>
        );
    }
}

export default GameContainer;