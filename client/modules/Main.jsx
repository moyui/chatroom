import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export const TopBar = (props) => {
    const { userName } = props;

    return (
        <aside>
            <h4>{ userName ? userName : '未知生物喵~' }</h4>
        </aside>
    )
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName
    }
};

export default withRouter(connect(mapStateToProps, null)(TopBar));
