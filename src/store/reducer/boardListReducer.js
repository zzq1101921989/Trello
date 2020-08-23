export default function boardListReducer (state = {
    list: []
}, action) {
    switch (action.type) {
        case "GET_BOARD_LIST":
            return {
                list: [...state.list, ...action.list]
            }
        case "ADD_BOARD_LIST":
            return {
                list: [...state.list, action.list]
            }
        case "UPDATE_BOARD_LIST":
            state.list = state.list.map(item =>{
                if (item.id == action.list.id) {
                    return item = action.list
                }
                return item;
            })
            return state;
    }
    return state;
}