import React, { useRef, useEffect, useState  } from "react";
import { useEditBoardListApi } from "../store/action/boardList";
import { useGetBoardListCardsApi } from "../store/action/boardListCard"
import BoardListCard from "./BoardListCard";
import Modal from "../components/Message";

export default function BoardList(props) {

    let { name, id, boardId, addEventBoardMove, addEventBoardStart, addEventBoardUp, order, cards } = props;
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
    // 获取列表中所有卡片的信息
    // let getBoardListCardApi = useGetBoardListCardsApi();
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
    // 获取标题输入框
    let listText = useRef(null);
    // 获取列表阴影
    let listMask = useRef(null);
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
    function dragDown(e) {
        // 多给定一个条件减少重复渲染，因为不拖拽修改标题的时候点击也会触发更新，所以需要判断
        if (!isSelect){
            setDown(true);
            let rect = listHeader.current.getBoundingClientRect();
            dragOffset.current.x = e.clientX;
            dragOffset.current.y = e.clientY;
            eleOffset.current.left = rect.x;
            eleOffset.current.top = rect.y;
            addEventBoardStart(list.current.parentNode)
        }
    };
    // 拖拽
    function dragMove(e) {
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
    };
    // 抬起
    function dragUp() {
        if (!isDrag && isDown) {
            listText.current.select();
            setSelect(true);
        } else {
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
    }
    // 列表标题失去焦点处理事件
    async function textareaBlurHandle () {

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

    return (
        <div
            className={`list-wrap list-container ${addCard ? 'list-adding' : ''}`}
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
                        onMouseDown={ (e) => {
                            if (!isSelect) {
                                e.preventDefault();
                            }
                        }}
                        onChange={ ({target}) => {
                            setListValue(target.value);
                        }}
                        onBlur={textareaBlurHandle}
                    >{name}</textarea>
                    <div className="extras-menu">
                        <span className="icon icon-more"></span>
                    </div>
                </div>
                {/* 卡片列表内容 */}
                <BoardListCard cards={cards} />
                {/* 卡片列表尾部 */}
                <div className="list-footer">
                    <div className="list-card-add">
                        <span className="icon icon-add"></span>
                        <span>添加另一张卡片</span>
                    </div>
                    <div className="list-add-confirm">
                        <button className="btn btn-success">添加卡片</button>
                        <span className="icon icon-close"></span>
                    </div>
                </div>
            </div>
        </div>
    )
} 