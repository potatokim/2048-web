import React, {Component} from "react";
import {BOARD_SIDE, GameState} from "../Helpers";
import Tile from "./Tile";

interface BoardProps {
    tiles       : number[][]
}

class Board extends Component<BoardProps, {}> {
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

        return (
            <div className="board">
                {tiles.map((tileValue : number) => {
                    return <Tile
                        key={i++}
                        value={tileValue}
                        style={this.chooseTileStyle(tileValue)}
                    />;
                })}
            </div>
        );
    }
}

export default Board;