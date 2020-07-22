export default function messageData (state = {
    message: null,
    type: "success",
}, action) {
    switch (action.type) {
        case "SUCCESS":
            return {
                type: "success",
                message: action.message
            }
        case "WARNING":
            return {
                type: "warning",
                message: action.message
            }
        case "ERROR":
            return {
                type: "error",
                message: action.message
            }
        default:
            return state
    }
    
}   