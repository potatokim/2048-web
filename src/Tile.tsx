import React, {Component} from "react";
interface TileProps {
    value: number,
    style: object,
    // onKeyDown: () => void, // stub
    // onClick: () => void
}

interface TileState { }

class Tile extends Component<TileProps, TileState> {
    render() {
        return (
            <div
                className="tile"
                style={this.props.style}
                // onKeyDown={() => this.props.onKeyDown()}
                // onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </div>
        );
    }
}

export default Tile;