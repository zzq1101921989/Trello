import http from "../http"
import { useDispatch } from "react-redux";

/**
 * 获取当前面板下的所有列表信息
 */
export function useGetBoardListApi() {

    const dispatch = useDispatch();

    return async function (id) {

        let res = await http.get(`/list?boardId=${id}`);

        dispatch({
            type: "GET_BOARD_LIST",
            list: res.data
        })
    }
}

/**
 * 添加一个面板列表信息
 */
export function useAddBoardListApi() {

    const dispatch = useDispatch();

    return async function (data) {

        try {
            let res = await http.post("/list", data);

            dispatch({
                type: "ADD_BOARD_LIST",
                list: res.data
            })

            return res;

        } catch (e) { }
    }
}

/**
 * 修改面板列表的标题
 */

export function useEditBoardListNameApi() {

    const dispatch = useDispatch();

    return async function (data) {

        try {
            let res = await http.put(`/list/${data.id}`, {
                boardId: data.boardId,
                name: data.name,
            });
    
            dispatch({
                type: "UPDATE_BOARD_LIST",
                list: res.data
            })

            return res;

        } catch (e) {}
    }
}