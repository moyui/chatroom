import React, { Compoent } from 'react';

let singleton = null;
const container = document.createElement('div');
document.body.appendChild(container);

class Toast extends Compoent {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            content: '',
        }

        /**
         * 确保单例模式
         */
        singleton = this;
    }

    
}