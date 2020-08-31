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
                    return action.list;
                }
                return item;
            })
            // 如果存在 listNewIndex就证明进行了列表调换更新
            if ( action.listNewIndex >= 0 ) {
                // 拿出旧的位置
                let oldIndex = state.list.findIndex(item => item.id == action.list.id);
                // 拿出新位置上面之前存在的需要被替换的元素
                let oldList = state.list[action.listNewIndex];

                // 进行新旧位置的调换赋值
                state.list[oldIndex] = oldList
                state.list[action.listNewIndex] = action.list;
            }
            return state;
    }
    return state;
}