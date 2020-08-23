export default function boardReducer (state = {
    boards: null
}, action){
    switch (action.type) {
        case "GET_BOARD":
            return {
                boards: action.boards
            }
        case "ADD_BOARD":
            return {
                boards: [...state.boards, action.data]
            }
        case "CLEAR_BOARD":
            return {
                boards: null
            }
        default:
            return state;
    }
}