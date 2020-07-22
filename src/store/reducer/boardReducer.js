export default function boardReducer (state = null, action){
    switch (action.type) {
        case "GET_BOARD":
            return [
                ...action.boards
            ]
        case "ADD_BOARD":
            return [
                ...state,
                action.data
            ]
        // case "DELETE_BOARD":
        //     return state.filter((item, index) => {
        //         return 
        //     })
    }
    return state
}