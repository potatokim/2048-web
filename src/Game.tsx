import React, {Component} from "react";
import Tile from "./Tile";

class Game extends Component<{}, {tiles: number[]}> {
    constructor(props : object) {
        super(props);
        this.state = {
            tiles: [0, 0, 2, 8, 64, 16, 4, 4, 64, 512, 128, 128, 32, 256, 1024, 1024]
        }
    }

    chooseTileStyle(tileValue : number) : {color: string, backgroundColor: string} {
        switch (tileValue) {
            case 2:     return {color: "black", backgroundColor: "white"};              break;
            case 4:     return {color: "black", backgroundColor: "papayawhip"};         break;
            case 8:     return {color: "white", backgroundColor: "navajowhite"};        break;
            case 16:    return {color: "white", backgroundColor: "coral"};              break;
            case 32:    return {color: "white", backgroundColor: "lightcoral"};         break;
            case 64:    return {color: "white", backgroundColor: "indianred"};          break;
            case 128:   return {color: "white", backgroundColor: "gold"};               break;
            case 256:   return {color: "white", backgroundColor: "gold"};               break;
            case 512:   return {color: "white", backgroundColor: "gold"};               break;
            case 1024:  return {color: "white", backgroundColor: "gold"};               break;
            case 2048:  return {color: "white", backgroundColor: "gold"};               break;
            default:    return {color: "whitesmoke", backgroundColor: "whitesmoke"};    break;
        }
    }

    render() {
        return (
            <div className="game">
                {this.state.tiles.map((tileValue : number) => {
                    return <Tile value={tileValue} style={this.chooseTileStyle(tileValue)}/>;
                })}
            </div>
        );
    }
}

export default Game;