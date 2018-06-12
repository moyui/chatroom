import React from 'react';

import Button from './Button';

class IconButton extends Button {
    render() {
        const {
            width, height, icon, iconSize, onClick, style, 
        } = this.props;

        return (
            <div className="component-iconButton" style={Object.assign({ width, height }, style)} onClick={onClick}>
                <i className={`icon-${icon}`} />
            </div>
        )
    }
}

export default IconButton;