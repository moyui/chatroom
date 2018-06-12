import React, { Component } from 'react';

class Button extends Component {
    render () {
        const { onClick, children, type } = this.props;

        return (
            <button 
                className={`compoent-button-${type}`}
                onClick={onClick}
            >
               {children}
            </button> 
        );
    }
}

export default Button;