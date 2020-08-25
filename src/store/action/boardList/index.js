import http from "../http"
import { useDispatch } from "react-redux";

/**
 * 获取当前面板下的所有列表信息
 */
export function useGetBoardListApi() {

    const dispatch = useDispatch();

    return async function (id) {

        let res = await http.get(`/list?boardId=${id}`);

        console.log("res:", res)
        
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
 * 修改面板列表的信息 （标题，排序 order）
 * id: 面板中某个列表 id
 * boardId: 当前面板 id
 * name: 面板中某个列表 name
 * order: 面板中某个列表 order
 * listNewIndex: 不属于需要上传到后端的字段，是为了标识列表移动后所在的索引位置
 */

export function useEditBoardListApi() {

    const dispatch = useDispatch();

    return async function (data) {

        try {
            let res = await http.put(`/list/${data.id}`, {
                boardId: data.boardId,
                name: data.name || "",
                order: data.order
            });

            dispatch({
                type: "UPDATE_BOARD_LIST",
                list: res.data,
                listNewIndex: (data.listNewIndex >= 0) ? data.listNewIndex : undefined
            })

            return res;

        } catch (e) {}
    }
}