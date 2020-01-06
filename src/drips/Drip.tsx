import React from 'react';

import './Drip.css';

type DripProps = {
    id: number,
    xPos: number,
    yPos: number,
    onDripRemoval: Function
};

class Drip extends React.Component<DripProps, {}> {
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
                    top: (this.props.yPos - 50),
                    left: (this.props.xPos - 50)
                }}>
                <span>Drip {this.props.id}</span>
            </div>
        );
    }
}

export default Drip;