import React from 'react';

import './Drip.css';

type DripProps = {
    id: number,
    xPos: number,
    yPos: number,
    onDripRemoval: Function
};

type DripState = {
    offset: number
};

class Drip extends React.Component<DripProps, DripState> {
    constructor(props: DripProps) {
        super(props);

        this.state = {
            offset: 0
        };
    }  
    
    componentDidMount() {
        setTimeout(() => {
            this.props.onDripRemoval(this.props.id);
        }, 2000);
    }

    render() {
        return (
            <div 
                className="Drip"
                style={{
                    top: this.props.yPos,
                    left: this.props.xPos
                }}>
            </div>
        );
    }
}

export default Drip;