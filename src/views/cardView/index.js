import React, { useEffect, useRef, useMemo, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEditBoardListCardDataApi, useAddCardAttachmentApi } from "../../store/action/boardListCard";
import Modal from "../../components/Message";
import Attachment from "../../components/Attachment";
import AddComment from "../../components/AddComment";
import Comment from "../../components/Comment";
import Pagination from "../../components/Pagination";
import { useGetCommentApi } from "../../store/action/comment";
import qs from "qs";

export default function CardView() {

    const history = useHistory();

    // id:boardId  
    const { id, listId, cardId } = useParams();
    
    // 处理 search
    const {search} = useLocation();
    let {comPage=1} = qs.parse(search.substr(1))

    const listsData = useSelector(state => state.boardListReducer);
    const cardsData = useSelector(state => state.boardListCardReducer);
    const commentData = useSelector(state => state.commentReducer);

    // 用于记录不同，以此为依据进行更新
    let cardName = useRef('');
    let cardDescription = useRef('');

    let uploadAtt = useRef(null);
    let desEdit = useRef(null);

    // 受控
    let [ cardTitle, setCardTitle ] = useState("");
    let [ description, setDescription ] = useState("");

    // 修改卡片 Api
    let editCardApi = useEditBoardListCardDataApi();
    // 添加附件Api
    let uploadAttachmentApi = useAddCardAttachmentApi();
    // 获取评论 Api
    let getCommentApi = useGetCommentApi();

    // 筛选 列表 卡片 卡片附件
    function filterData () {
        const list = listsData.list?.find(item => item.id == listId);
        const card = cardsData.cards?.find(item => item.id == cardId);
        return { list, card };
    }
    // 防止组件多次更新带来的函数重复执行
    let { list, card  } = useMemo( filterData, [ listsData, cardsData ]);

    // listsData, cardsData 这两个数据有更新，并且 filterData 筛选出数据出来的时候在进行set
    useEffect ( () => {
        if ( card ) {
            cardName.current = card.name;
            cardDescription.current = card.description;
            setCardTitle(card.name);
            setDescription(card.description);
        }
    }, [ listsData, cardsData ] );

    // 第一次请求评论或者请求的评论都是同一个
    useEffect( () => {
        if (
            !commentData.comment.boardListCardId 
            || 
            commentData.comment.boardListCardId != cardId 
            ) {
            getCommentApi({
                page: comPage,
                boardListCardId: cardId
            })
        }
    }, [])

    // 更新卡片标题，更新卡片描述 
    function editCard (newValue, oldValue, type) {
       
        if (newValue !== oldValue && type == "title") {

            try {
                editCardApi ( cardId, {
                    boardListId: Number(listId),
                    name: newValue
                }, type)

                Modal.info({
                    ty: "success",
                    message: "修改标题成功"
                })

            } catch (e) {}

        } else if ( newValue !== oldValue && type == "des" ) {

            try {
                editCardApi ( cardId, {
                    boardListId: Number(listId),
                    description: newValue
                }, type)

                Modal.info({
                    ty: "success",
                    message: "修改描述成功"
                })

            } catch (e) {}

        }   
    }
    // 上传附件
    function uploadFileHandle (e) {

        let file = e.target.files[0]
       
        try {
            uploadAttachmentApi({
                boardListCardId: cardId,
                file
            })
            Modal.info({
                ty:"success", 
                message: "上传成功"
            })
            uploadAtt.current.value = "";
        } catch (e) {}

    }
    // 页面组件点击获取评论数据
    function setPageHandle (num) {
        let url = "?" + qs.stringify( {'comPage': num} )
        history.push(url);
        getCommentApi({
            page: num,
            boardListCardId: cardId
        })
    }

    return (
        <div className="window-overlay" style={{
            display: "block"
        }}>
            <div className="popup">
                <div className="popup-header">
                    <div className="popup-title">
                        <div className="popup-title-icon">
                            <span className="icon icon-card"></span>
                        </div>
                        <div className="popup-title-text">
                            <textarea 
                                className="form-field-input"
                                value={cardTitle}
                                onChange={ ( { target } ) => {
                                    setCardTitle(target.value)
                                }}
                                onBlur={({target}) => {
                                    editCard(target.value, cardName.current, "title");
                                }}
                            >{cardName.current}</textarea>
                        </div>
                        <div className="popup-title-detail">
                            在列表 {list?.name} 中
                        </div>
                    </div>
                    <div 
                        className="popup-header-close"
                        onClick={ () => {
                            history.push(`/board/${id}`)
                        } }
                    >
                        <i className="icon icon-close"></i>
                    </div>
                </div>
                <div className="popup-content">
                    <div className="window-module">
                        <div className="title">
                            <div className="title-icon">
                                <span className="icon icon-description"></span>
                            </div>
                            <div className="title-text">
                                <h3>描述</h3>
                                <button 
                                    className="btn btn-edit"
                                    onClick={()=>{
                                        desEdit.current.focus();
                                    }}
                                >编辑</button>
                            </div>
                        </div>
                        <p className="description">
                            <textarea 
                                ref={desEdit}
                                value={description}
                                className="form-field-input"
                                onChange={ ( { target } ) => {
                                    setDescription(target.value)
                                } }
                                onBlur={ ( { target } ) => {
                                    editCard(target.value, cardDescription.current, "des");
                                }}
                            >{ cardDescription.current }</textarea>
                        </p>
                    </div>
                    <div className="window-module">
                        <div className="title">
                            <div className="title-icon">
                                <i className="icon icon-attachment"></i>
                            </div>
                            <div className="title-text">
                                <h3>附件</h3>
                            </div>
                        </div>
                        <ul className="attachments">
                            {
                                card?.attachments.map(item => {
                                    return <Attachment 
                                        key={item.id} 
                                        attachment={item}
                                    />
                                })
                            }
                        </ul>
                        <div>
                            <button 
                                className="btn btn-edit"
                                onClick={() => {
                                    uploadAtt.current.click();
                                }}
                            >添加附件</button>
                            <input 
                                ref={uploadAtt}
                                type="file" 
                                style={{display: "none"}} 
                                onChange = { (e) => {
                                    uploadFileHandle(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className="window-module">
                        <AddComment boardListCardId={cardId} />
                        <Comment comments={commentData.comment.rows} />
                        <Pagination 
                            count={commentData.comment.count} 
                            page={comPage}
                            setPageHandle={setPageHandle}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}