export default function commentReducer (state={
    comment: {}
}, action ) {
    switch (action.type) {
        case "GET_COMMENT":
            return {
                comment: action.comment
            }
        case "ADD_COMMENT":

            if ( state.comment.rows.length >= 3 ) {
                state.comment.rows.pop();
            }

            state.comment.rows.unshift(action.newComment)

            return {
                comment: {...state.comment}
            }
            
    }

    return state;
}