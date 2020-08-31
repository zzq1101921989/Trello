import http from "../http";
import { useDispatch } from "react-redux";

// export function useGetBoardListCardsApi () {

//     const dispatch = useDispatch();

//     return async function (boardListId) {

//         let res = await http.get(`/card`, {
//             params: {
//                 boardListId
//             }
//         });
//     }
// }


/**
 * 创建一张卡片
 * 参数：data.boardListId:当前创建的卡片是在哪一个列表下
 * 参数：data.name:当前卡片的卡片名字
 * 参数：data.description:当前卡片的卡片描述 可传可不传
 */

export function useAddBoardListCardApi() {

    const dispatch = useDispatch();

    return async function (data) {

        try {

            let res = await http.post('/card', data);

            dispatch({
                type: "ADD_BOARD_LIST_CARD",
                card: res.data
            })

        } catch (e) { }
    }
}

/**
 * 修改卡片的信息
 * id: 卡片的 id 
 * data.boardListId：面板列表 id
 * data.name ：卡片名字
 * data.description: 卡片描述
 * data.order: 卡片排序大小
 */

export function useEditBoardListCardDataApi() {

    const dispatch = useDispatch();

    return async function (id, data, type) {

        let res = await http.put(`/card/${id}`, data)

        if (type == "title") {

            dispatch({
                type: 'UPDATE_BOARD_LIST_CARD_TITLE',
                newCardName: res.data.name,
                cardId: id
            });

        } else if (type == "des") {

            dispatch({
                type: 'UPDATE_BOARD_LIST_CARD_DES',
                newCardDes: res.data.description,
                cardId: id
            });

        }
    }
}


/**
 * 添加附件
 */
export function useAddCardAttachmentApi () {

    const dispatch = useDispatch();

    return async function (data) {

        let form = new FormData();
        form.append("boardListCardId", data.boardListCardId);
        form.append("attachment", data.file);

        let res = await http.post("/card/attachment", form);

        dispatch({
            type: "UPDATE_BOARD_LIST_CARD_ATTACHMENT",
            boardListCardId: data.boardListCardId,
            newAtt: res.data
        })

    }
}

/**
 * 删除附件
 */
export function useRemoveAttachmentApi () {

    const dispatch = useDispatch();

    return async function (cardAttachmentId, boardListCardId) {

        await http.delete(`/card/removeAttachment/${cardAttachmentId}`);

        dispatch({
            type: "REMOVE_BOARD_LIST_CARD_ATTACHMENT",
            cardAttachmentId,
            boardListCardId
        })
    }

}



/**
 * 设置封面
 * attachmentId: 附件id
 * boardListCardId 卡片id
 * imgPath 当前设置成封面的 附件图片路劲
 */
export function useSetCardCoverImgApi () {

    const dispatch = useDispatch();

    return async function (attachmentId, boardListCardId, imgPath) {

        await http.put(`/card/attachment/cover/${attachmentId}`);

        dispatch({
            type: "SET_BOARD_LIST_CARD_COVER",
            attachmentId,
            boardListCardId,
            imgPath
        })
    }
}

/**
 * 取消封面
 * attachmentId: 附件id
 * boardListCardId 卡片id
 */
export function useRemoveCardCoverImgApi () {

    const dispatch = useDispatch();

    return async function (attachmentId, boardListCardId) {

        await http.delete(`/card/attachment/cover/${attachmentId}`)

        dispatch({
            type: "REMOVE_BOARD_LIST_CARD_COVER",
            boardListCardId,
        })
    }

}