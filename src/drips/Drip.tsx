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
        }, 4550);
    }

    render() {
        return (
            <div>
                <div
                    className="Drip"
                    style={{
                        top: this.props.yPos,
                        left: this.props.xPos
                    }}>
                </div>
                <div
                    className="Drip Sub-1"
                    style={{
                        top: this.props.yPos,
                        left: this.props.xPos
                    }}>
                </div>
                <div
                    className="Drip Sub-2"
                    style={{
                        top: this.props.yPos,
                        left: this.props.xPos
                    }}>
                </div>
                <div
                    className="Drip Sub-3"
                    style={{
                        top: this.props.yPos,
                        left: this.props.xPos
                    }}>
                </div>
            </div>
        );
    }
}

export default Drip;