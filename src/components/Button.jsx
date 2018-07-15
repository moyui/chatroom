import React, { Component } from 'react';

import './style.global.css';

class Button extends Component {
    render () {
        const { onClick, children, type } = this.props;

        return (
            <button 
                className={`component-button-${type}`}
                onClick={onClick}
            >
               {children}
            </button> 
        );
    }
}

export default Button;