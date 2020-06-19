import React, {Component} from "react";
interface TileProps {
    value: number,
    style: object
}

interface TileState {
    value : number // stub
}

class Tile extends Component<TileProps, TileState> {
    constructor(props : any) {
        super(props);
        this.state = {
            value: 0
        } // stub
    }

    render() {
        return (
            <div className="tile" style={this.props.style}>{this.props.value}</div>
        );
    }
}

export default Tile;