import React, { Component } from 'react';

import IconButton from './IconButton';

class Input extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleClickClear = this.handleClickClear.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleIMEStart = this.handleIMEStart.bind(this);
        this.handleIMEEnd = this.handleIMEEnd.bind(this);
    }

    getValue() {
        return this.state.value.trim();
    }

    clear() {
        this.setState({
            value: '',
        });
    }

    handleInput(e) {
        this.setState({
            value: e.target.value,
        })
    }

    handleClickClear() {
        this.setState({
            value: '',
        })
        this.input.focus();
    }

    handleKeyDown(e) {
        const { onEnter } = this.props;
        if (e.key === 'Enter' && onEnter) {
            onEnter(this.state.value);
        }
    }

    handleIMEStart() {
        this.lockEnter = true;
    }

    handleIMEEnd() {
        this.loadEnter = false;
    }

    render() {
        const { value } = this.state;
        const { type, placeholder } = this.props;

        return (
            <div className="component-input">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onInput={this.handleInput}
                    ref={i => this.input = i}
                    onKeyDown={this.handleKeyDown}
                    onCompositionStart={this.handleIMEStart}
                    onCompositionEnd={this.handleIMEEnd}
                />
                <IconButton width={32} height={32} iconSize={18} icon="clear" onClick={this.handleClickClear} />
            </div>
        )
    }
}

export default Input;