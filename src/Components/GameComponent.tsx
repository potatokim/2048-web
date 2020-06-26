import React from "react";
import Board from "./Board";
import {GameState} from "../Helpers";

interface GameProps {
    gameState           : GameState,
    score               : number,
    tiles               : number[][],
    generateNewGame     : () => void
}
function GameComponent(props : GameProps) {
    return (
        <div className="app">
            <div className="game">
                <div className="header">2048</div>
                <div className="status-block">
                    <label className="score-block">Score: {props.score}</label>
                    <br />
                    <button className="reset-button" onClick={() => props.generateNewGame()}>New Game</button>
                </div>
                <div> <Board gameState={props.gameState} tiles={props.tiles}/> </div>
            </div>
        </div>
    );
}

export default GameComponent;