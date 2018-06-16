const messageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SETMESSAGE': {
            return [
                ...state,
                action.data
            ]
        }
        default: return state;
    }
}

export default messageReducer;