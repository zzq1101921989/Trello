import http from "../http";
import { useDispatch } from "react-redux";


/**
 * 获取当前评论
 */
export function useGetCommentApi () {

    const dispatch = useDispatch();

    return async function (data) {

        let res = await http.get('/comment', {
            params: {
                page: data.page,
                boardListCardId: Number(data.boardListCardId)
            }
        })

        dispatch({
            type: "GET_COMMENT",
            comment: res.data
        })
    }   

}

/**
 * 添加评论
 */
export function useAddCommentApi () {
    
    const dispatch = useDispatch();

    return async function (data) {

        let res = await http.post('/comment', data);

        dispatch({
            type: "ADD_COMMENT",
            newComment: res.data
        })
        dispatch({
            type: "ADD_COMMENT_COUNT",
            newCommentId: res.data.boardListCardId
        })
    }
    
}