import React, { Component } from 'react';


class Button extends Component {
    render () {
        const { onClick, children, type } = this.props;
        //renderprop
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