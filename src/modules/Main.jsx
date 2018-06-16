import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export const TopBar = (props) => {
    const { userName } = props;

    return (
        <header>
            <span>{ userName }</span>
            <span>{ email } </span>
        </header>
    )
}

const mapStateToProps = (state) => {
    const { user } = state

    return {
        userName: user.userName,
        email: user.email
    }
};

export default withRouter(connect(mapStateToProps, null)(TopBar));
