import React from "react";
interface TileProps {
    value: number,
    style: object,
}

function Tile(props : TileProps) {
    return (
        <div
            className="tile"
            style={props.style}
        >
            {props.value}
        </div>
    );
}
export default Tile;