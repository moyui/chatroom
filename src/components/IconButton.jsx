import React from 'react';

import Button from './Button';

class IconButton extends Button {
    render() {
        const {
            width, height, icon, iconSize, onClick, style, children
        } = this.props;

        return (
            <button className="component-iconButton" style={Object.assign({ width, height }, style)} onClick={onClick}>
                <i className={`iconfont icon-${icon}`} style={{ fontSize: iconSize, lineHeight: `${height}px` }}/>{children}
            </button>
        )
    }
}

export default IconButton;