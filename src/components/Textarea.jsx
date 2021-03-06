import React, { Component } from 'react';

import './style.global.css'

class Textarea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }

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

        return (
            <textarea
                className="component-textarea"
                value={value}
                onInput={this.handleInput}
                ref={i => this.input = i}
                onKeyDown={this.handleKeyDown}
                onCompositionStart={this.handleIMEStart}
                onCompositionEnd={this.handleIMEEnd}
            />
        )
    }
}

export default Textarea;