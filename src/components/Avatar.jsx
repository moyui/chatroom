import React from 'react';

const avaterFallback = 'https://cdn.suisuijiang.com/fiora/avatar/0.jpg';
const failTimes = new Map();

function handleError(e) {
    const times = failTimes.get(e.target) || 0;
    if (times >= 2) {
        return;
    }
    e.target.src = avaterFallback;
    failTimes.set(e.target, times + 1);
}

const Avatar = ({ size = 60, className = '', ...props }) => (
    <img
        className={`component-avatar ${className}`}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        onError={handleError}
        {...props}
    />
);

export default Avatar;