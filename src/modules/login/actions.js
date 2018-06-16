const setUser = (user) => {
    return {
        type: 'SETUSER',
        data: user
    }
}

export default {
    setUser
}