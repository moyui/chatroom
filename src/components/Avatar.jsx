import React from 'react';

const avaterFallback = 'https://cdn.suisuijiang.com/fiora/avatar/0.jpg';
const failTimes = new Map();

function noop() {};

function handleError(e) {
    const times = failTimes.get(e.target) || 0;
    if (times >= 2) {
        return;
    }
    e.target.src = avaterFallback;
    failTimes.set(e.target, times + 1);
}

const Avatar = ({ src, size = 60, onClick = noop, className = '' }) => (
    <img
        className={`component-avatar ${className}`}
        src={src}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        onClick={onClick}
        onError={handleError}
    />
);

export default Avatar;