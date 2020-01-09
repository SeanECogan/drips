import React from 'react';

import './Drip.css';

type DripProps = {
    id: number,
    xPos: number,
    yPos: number,
    onDripRemoval: Function
};

class Drip extends React.Component<DripProps, {}> {
    removalTimeout : (NodeJS.Timeout | null) = null;

    componentDidMount() {
        this.removalTimeout = setTimeout(() => {
            this.props.onDripRemoval(this.props.id);
        }, 4200);
    }

    componentWillUnmount() {
        if (this.removalTimeout) {
            clearTimeout(this.removalTimeout);
        }
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
            </div>
        );
    }
}

export default Drip;