function loginReducer(state = {
    id: null,
    name: null,
    token: null
}, action){
    switch (action.type) {
        case "LOGIN":
            return {
                id: action.id,
                name: action.name,
                token: action.token
            };
        case "LOGIN_OUT":
            return {
                id: "",
                name: "",
                token: null
            };
    }
    return state
}

export default loginReducer;