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
    let wonLostLabelStyle : {className : string, text : string};
    if (props.gameState === GameState.WON) {
        wonLostLabelStyle = {
            className: "won-label",
            text: "You Win!"
        };
    } else if (props.gameState === GameState.LOST) {
        wonLostLabelStyle = {
            className: "lost-label",
            text: "You Lost."
        };
    } else {
        wonLostLabelStyle = {
            className: "running-label",
            text: "",
        };
    }
    return (
        <div className="app">
            <div className="game">
                <div className="header">2048</div>
                <div className="status-block">
                    <label className="score-block">Score: {props.score}</label>
                    <br />
                    <button className="reset-button" onClick={() => props.generateNewGame()}>New Game</button>
                    <label className={wonLostLabelStyle.className}>{wonLostLabelStyle.text}</label>
                </div>
                <div> <Board tiles={props.tiles}/> </div>
            </div>
        </div>
    );
}

export default GameComponent;