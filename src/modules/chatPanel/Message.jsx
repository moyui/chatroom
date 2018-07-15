import React from 'react';

import style from './Chat.css';

export const Message = (props) => {
    const { userName, time, content } = props;

    return (
        <div>
            <div class={style.tag}>
                <span>{userName}</span>
                <span>{time}</span>
            </div>
            <div class={style.content}>
                {content}
            </div>
        </div>
    )
}