const setMessage = (message) => {
    return {
        type: 'SETMESSAGE',
        data: message
    }
}

export default {
    setMessage
}