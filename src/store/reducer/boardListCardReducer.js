export default function boardListCardReducer (state ={
    cards: []
}, action) {
    switch (action.type) {
        case "GET_BOARD_LIST_CARD_ALL":
            return {
                cards: action.cards
            }
    }
    return state;
}