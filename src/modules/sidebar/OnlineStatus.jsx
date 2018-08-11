import React, { Component } from 'react';

class OnlineStatus extends Component {
    render() {
        const { status, className } = this.props;
        return (
            <div className={`module-main-sidebar-onlineStatus ${className}`}>
                <div className={status} />
            </div>
        );
    }
}

export default OnlineStatus;
