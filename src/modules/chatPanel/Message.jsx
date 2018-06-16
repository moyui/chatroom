import React from 'react';

export const Message = (props) => {
    const { userName, time, content } = props;

    return (
        <div>
            <div>
                <span>{userName}</span>
                <span>{time}</span>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}