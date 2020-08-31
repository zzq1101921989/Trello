import React, { useRef, useEffect, useState, useCallback } from "react";
import { useEditBoardListApi } from "../store/action/boardList";
import { useAddBoardListCardApi } from "../store/action/boardListCard"
import BoardListCard from "./BoardListCard";
import Modal from "../components/Message";
import { useSelector } from "react-redux";
import Popup from "./Popup";
import PopupMenu from "./PopupMenu";

export default function BoardList(props) {

    let { name, id, boardId, addEventBoardMove, addEventBoardStart, addEventBoardUp, order } = props;

    // 根据 props解构的 id 也就是当前所渲染列表的 id 筛选出 对应列表中的 卡片
    let boardListCards = useSelector(state => state.boardListCardReducer);

    // 筛选卡片数据
    let cards = boardListCards.cards.filter(item => item.boardListId == id);

    // 定义列表删除区域显示状态
    let [popupState, setPopupState] = useState(false);
    // 定义标题 value
    let [listValue, setListValue] = useState(name);
    // 定义列表添加卡片状态
    let [addCard, setAddCard] = useState(false);
    // 定义按下相关的状态
    let [isDown, setDown] = useState(false);
    // 定义拖拽的状态
    let [isDrag, setDrag] = useState(false);
    // 定义输入框是否被选中状态
    let [isSelect, setSelect] = useState(false);
    // 修改标题 API
    let updateBoardListNameApi = useEditBoardListApi();
    // 添加卡片 API
    let addBoardListCardApi = useAddBoardListCardApi();
    // 保存偏移相关的变量
    let dragOffset = useRef({
        x: 0,
        y: 0
    })
    // 定义拖拽原理距离边界的距离
    let eleOffset = useRef({
        left: 0,
        top: 0
    })
    // 获取 list 父级 
    let list = useRef(null);
    // 获取拖拽头部
    let listHeader = useRef(null);
    // 获取添加列表标题输入框
    let listText = useRef(null);
    // 获取列表阴影
    let listMask = useRef(null);
    // 获取添加卡片输入框
    let addBoardListCardEle = useRef(null);
    // 列表功能小按钮
    let menu = useRef(null)
    // 生命周期
    useEffect(() => {
        listHeader.current.onmousedown = dragDown;
        document.onmousemove = dragMove;
        document.onmouseup = dragUp;
        return () => {
            listHeader.current.onmousedown = null;
            document.onmousedown = null;
            document.onmouseup = null;
        }
    }, [isDown, isDrag, isSelect]);

    // 按下
    let dragDown = useCallback(function dragDown(e) {
        // 多给定一个条件减少重复渲染，因为不拖拽修改标题的时候点击也会触发更新，所以需要判断
        if (!isSelect) {
            setDown(true);
            let rect = listHeader.current.getBoundingClientRect();
            dragOffset.current.x = e.clientX;
            dragOffset.current.y = e.clientY;
            eleOffset.current.left = rect.x;
            eleOffset.current.top = rect.y;
            addEventBoardStart(list.current.parentNode)
        }
    }, [isSelect]);

    // 拖拽
    let dragMove = useCallback(function dragMove(e) {
        if (isDown) {
            let x = e.clientX - dragOffset.current.x;
            let y = e.clientY - dragOffset.current.y;
            if (Math.abs(x) > 10 || Math.abs(y) > 10) {
                if (!isDrag) {
                    setDrag(true);
                    list.current.style.position = "fixed";
                    list.current.style.zIndex = 666;
                    list.current.style.transform = "rotate(5deg)";
                    listMask.current.style.height = list.current.offsetHeight + "px";
                }
                list.current.style.left = eleOffset.current.left + x + "px";
                list.current.style.top = eleOffset.current.top + y + "px";
                addEventBoardMove(list.current.parentNode, e.clientX, e.clientY);
            }
        }
    }, [isDown]);

    // 抬起
    let dragUp = useCallback(function dragUp(e) {
        if (!isDrag && isDown && e.path.includes(listText.current)) {
            listText.current.select();
            setSelect(true);
        } else if (e.path.includes(listHeader.current)) {
            list.current.style.position = 'relative';
            list.current.style.zIndex = 0;
            list.current.style.left = 0;
            list.current.style.top = 0;
            list.current.style.transform = 'rotate(0deg)';
            listMask.current.style.height = 0;

            addEventBoardUp(list.current.parentNode);
        }

        document.onmousedown = null;
        document.onmouseup = null;
        setDown(false);
        setDrag(false);
    }, [isDrag, isDown])

    // Menu功能列表
    let menuList = [
        {
            name: "删除",
            handler: function () {
                console.log("删除");
            }
        }
    ]

    // 列表标题失去焦点处理事件
    async function textareaBlurHandle() {

        let { innerHTML } = listText.current;

        if (listValue !== innerHTML) {

            let res = await updateBoardListNameApi({
                id,
                boardId,
                name: listValue
            })
            if (res.status == 201) {
                Modal.info({
                    ty: 'success',
                    message: "修改成功"
                });
                listText.current.innerHTML = listValue;
            }
        }
        setSelect(false);
    }
    // 添加卡片处理事件
    function addCardHandle() {

        let { value } = addBoardListCardEle.current;

        if (value.trim() === '') {

            addBoardListCardEle.current.focus();

        } else {

            let { value } = addBoardListCardEle.current;

            addBoardListCardApi({
                boardListId: id,
                name: value
            })

            Modal.info({
                message: "添加成功",
                ty: "success"
            });

            addBoardListCardEle.current.value = '';
        }
    }

    return (
        <div
            className={`list-wrap list-container`}
            data-order={order}
            data-id={id}
        >
            <div className="list-placeholder" ref={listMask}></div>
            <div className="list" ref={list}>
                {/* 卡片列表头部 */}
                <div className="list-header"
                    ref={listHeader}
                >
                    <textarea
                        className="form-field-input"
                        ref={listText}
                        onMouseDown={(e) => {
                            if (!isSelect) {
                                e.preventDefault();
                            }
                        }}
                        onChange={({ target }) => {
                            setListValue(target.value);
                        }}
                        onBlur={textareaBlurHandle}
                    >{name}</textarea>
                    <Popup
                        show={popupState}
                        setShow={setPopupState}
                        title="操作"
                        content={ <PopupMenu items={menuList} /> }
                    >
                        <div
                            className="extras-menu"
                            ref={menu}
                            onClick={(e) => {
                                setPopupState(!popupState)
                            }}
                        >
                            <span className="icon icon-more"></span>
                        </div>
                    </Popup>

                </div>
                {/* 卡片列表内容 */}
                <BoardListCard
                    cards={cards}
                    boardId={boardId}
                    boardListId={id}
                />
                {/* 卡片列表尾部 */}
                <div className={`list-footer ${addCard ? 'list-adding' : ''}`}>
                    <div
                        className="list-card-add"
                        onClick={() => {
                            setAddCard(true);
                            setTimeout(() => {
                                addBoardListCardEle.current.focus();
                            })
                        }}
                    >
                        <span className="icon icon-add"></span>
                        <span>添加另一张卡片</span>
                    </div>
                    <div className="list-card-add-form">
                        <textarea
                            className="form-field-input"
                            placeholder="为这张卡片添加标题……"
                            ref={addBoardListCardEle}
                        ></textarea>
                    </div>
                    <div className="list-add-confirm">
                        <button
                            className="btn btn-success"
                            onClick={addCardHandle}
                        >添加卡片</button>
                        <span
                            className="icon icon-close"
                            onClick={() => {
                                setAddCard(false);
                                addBoardListCardEle.current.value = ''
                            }}
                        ></span>
                    </div>
                </div>
            </div>
        </div>
    )
} 