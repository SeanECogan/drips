import React from 'react';

type DripProps = {
    id: number,
    xPos: number,
    yPos: number
};

const Drip = ({ id, xPos, yPos }: DripProps) => {
    return (
        <div>
            <p>This is drip {id}. It is located at {xPos}, {yPos}.</p>
        </div>
    );
}

export default Drip;