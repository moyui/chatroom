const userReducer = (state = {
    userName: '未知生物喵~',
    email: '貌似木有邮箱'
}, action) => {
    switch (action.type) {
        case 'SETUSER': {
            return Object.assign({}, state, {
                userName: action.userName,
                email: action.email
            });
        }
        default: return state;
    }
}

export default userReducer;