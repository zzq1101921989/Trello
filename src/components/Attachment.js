import React from "react";
import { useSelector } from "react-redux";
import useDateHandle from "../util/dataTime";
import {useSetCardCoverImgApi, useRemoveCardCoverImgApi, useRemoveAttachmentApi} from "../store/action/boardListCard";
import Modal from "./Message";

function Attachment(props) {

    let { attachment } = props;
    // 设置封面Api
    const setCardCoverApi = useSetCardCoverImgApi();
    // 取消封面Api
    const removeCardCoverApi = useRemoveCardCoverImgApi();
    // 删除附件Api
    const removeAttachmentApi = useRemoveAttachmentApi();
    // 环境变量获取
    const { staticPath } = useSelector(state => state.serverPath);
    // 自定义处理日期的hook
    let newData = useDateHandle();

    // 设置、取消封面
    function coverImgHandle (id, boardListCardId, imgPath) {
        if (imgPath) {
            try {
                setCardCoverApi(id, boardListCardId, imgPath);
                Modal.info({
                    ty: 'success',
                    message: "设置封面成功"
                })
            } catch (e) {}
        } else {
            try {
                removeCardCoverApi(id, boardListCardId);
                Modal.info({
                    ty: 'success',
                    message: "取消封面成功"
                })
            } catch (e) {}
        }
    };

    // 删除附件
    function removeAttachment (attachmentId, boardListCardId) {
        try {
            removeAttachmentApi(attachmentId, boardListCardId);
            Modal.info({
                ty:"success",
                message: "删除成功"
            })
        } catch (e) {
            Modal.info({
                ty:"success",
                message: "删除失败"
            })
        }

    }

    return (
        <li className="attachment">
            <div className="attachment-thumbnail" style={{
                "backgroundImage": `url(${staticPath}${attachment.path})`
            }}></div>
            <p className="attachment-detail">
                <span className="attachment-thumbnail-name">
                    <strong>{attachment.detail.name}</strong>
                </span>
                <span className="attachment-thumbnail-descriptions">
                    <span className="datetime">{newData(attachment.createdAt)}</span>
                    <span> - </span>
                    <u onClick={()=>{
                        removeAttachment( Number(attachment.id), attachment.boardListCardId );
                    }} >删除</u>
                </span>
                <span className="attachment-thumbnail-operation">
                    <i className="icon icon-card-cover"></i>
                    {
                        attachment.isCover ? 
                        <u onClick={() => {
                            coverImgHandle ( Number(attachment.id), attachment.boardListCardId )
                        }} >移除封面</u> 
                        : 
                        <u onClick={ () => {
                            coverImgHandle ( Number(attachment.id), attachment.boardListCardId, attachment.path );
                        } } >设置封面</u>
                    }
                </span>
            </p>
        </li>
    )
}

export default React.memo(Attachment);