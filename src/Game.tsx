import React, {Component} from "react";
import Tile from "./Tile";
import {BOARD_SIDE, GameState} from "./App";

class Game extends Component<{gameState: GameState, tiles: number[][]}, {}> {

    chooseTileStyle(tileValue : number) : {color: string, backgroundColor: string} {
        switch (tileValue) {
            case 2:     return {color: "black", backgroundColor: "white"};
            case 4:     return {color: "black", backgroundColor: "papayawhip"};
            case 8:     return {color: "white", backgroundColor: "navajowhite"};
            case 16:    return {color: "white", backgroundColor: "coral"};
            case 32:    return {color: "white", backgroundColor: "lightcoral"};
            case 64:    return {color: "white", backgroundColor: "indianred"};
            case 128:   return {color: "white", backgroundColor: "gold"};
            case 256:   return {color: "white", backgroundColor: "gold"};
            case 512:   return {color: "white", backgroundColor: "gold"};
            case 1024:  return {color: "white", backgroundColor: "gold"};
            case 2048:  return {color: "white", backgroundColor: "gold"};
            default:    return {color: "whitesmoke", backgroundColor: "whitesmoke"};
        }
    }

    render() {
        let i : number = 0;
        let tiles : number[] = [];
        for (let y = 0; y < BOARD_SIDE; y++) {
            for (let x = 0; x < BOARD_SIDE; x++) {
                tiles.push(this.props.tiles[x][y]);
            }
        }
        i = 0;
        return (
            <div className="game">
                {tiles.map((tileValue : number) => {
                    return <Tile
                        key={i++}
                        value={tileValue}
                        style={this.chooseTileStyle(tileValue)}
                        // onKeyDown={() => this.handleKeyDown()}
                        // onClick={() => this.handleKeyDown()}
                    />;
                })}
            </div>
        );
    }
}

export default Game;