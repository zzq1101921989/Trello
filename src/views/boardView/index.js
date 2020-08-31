import React, { useEffect, useState, useRef, useMemo } from "react";
import { Route, useParams } from "react-router-dom"
import CardView from "../cardView";
import { useSelector } from "react-redux";
import {useGetBoardApi} from "../../store/action/board";
import { useGetBoardListApi, useAddBoardListApi, useEditBoardListApi } from "../../store/action/boardList";
import BoardList from "../../components/BoardList";
import Modal from "../../components/Message";

// 记录boardList的历史位置
let recordBoardListIndex;

export default function BoardView() {
    // 取出URL参数
    let { id } = useParams();
    // 取出所有的面板信息
    let board = useSelector(state => state.boardReducer);
    // 取出所有的面板数组下的累加的面板列表信息
    let boardList = useSelector(state => state.boardListReducer);
    // 添加列表显示和隐藏状态
    let [addList, setAddList] = useState({
        state: false,
        value: ""
    });

    // 获取添加卡片列表的input
    let addInput = useRef(null);
    // 通过URL参数 挑选出指定的面板信息
    let currentBoard = board.boards?.find(item => item.id == id);
    // 通过URL参数 挑选出和当前面板所对应的面板列表的信息
    let currentBoardList = boardList.list.filter(item => item.boardId == id);
    // 请求所有面板
    const getBoardsApi = useGetBoardApi();
    // 请求当前面板下的所有列表
    const getBoardsListApi = useGetBoardListApi();
    // 添加一条列表的请求
    const addBoardListApi = useAddBoardListApi();
    // 请求修改面板中某个列表的信息
    const updateBoardListApi = useEditBoardListApi();

      // 页面挂载执行事件
    useEffect(() => {
        loadingBoardListHandler();
    }, [])

    // 加载面板列表
    async function loadingBoardListHandler () {
        // 防止页面刷新之后，所有面板的信息状态丢失，所以需要判断并进行请求
        if (board.boards == null) {
            await getBoardsApi();
        }
        if (!currentBoardList.length) {
            await getBoardsListApi(id);
        }
    }

    // 添加列表的处理事件
    async function addListHandle () {
        if (!addList.value.trim().length) {
            Modal.info({
                ty: "error",
                message: "请输入添加列表的标题"
            })
        } else {    
            let res = await addBoardListApi({
                boardId: Number(id),
                name: addList.value
            })
            if (res) {
                Modal.info({
                    ty: "success",
                    message: "添加成功"
                })
                setAddList({
                    state: false,
                    value: ""
                })
            }
        }
    }
    
    // 监听board组件按下
    function addEventBoardStart (moveList) {

        let boardListArr = [...document.querySelectorAll(".list-wrap")];

        let currentIndex = boardListArr.findIndex(item => item == moveList);

        // 当按下的时候记录一下当前的初始移动位置
        recordBoardListIndex = currentIndex;
    }

    // 监听board组件移动
    function addEventBoardMove (moveList, x, y) {

        let boardListArr = [...document.querySelectorAll(".list-wrap")];

        let boardContainer = moveList.parentNode;

        let currentIndex = boardListArr.findIndex(item => item == moveList);

        boardListArr.forEach( (item, index) => {

            if (index !== currentIndex) {
                
                let clientRect = item.getBoundingClientRect();
                
                if ( 
                    x <= clientRect.right 
                    &&  
                    x >= clientRect.left
                    && 
                    y <= clientRect.bottom
                    &&
                    y >= clientRect.top
                    ) {
                    if (currentIndex < index) {
                        boardContainer.insertBefore(moveList, item.nextElementSibling);
                    } else {
                        boardContainer.insertBefore(moveList, item);
                    }
                }                
            }
        })
    }

    // 监听board组件抬起 (列表排序)
    async function addEventBoardUp (moveList) {
       
        let order;

        let boardListArr = [...document.querySelectorAll(".list-container")];

        let currentIndex = boardListArr.findIndex(item => item == moveList);

        // 判断位置有没有发生改变
        if ( currentIndex !== recordBoardListIndex ) {

            // 获取上一个和下一个的order数值
            let prevOrder = parseFloat(boardListArr[currentIndex - 1]?.dataset.order);
            let nextOrder = parseFloat(boardListArr[currentIndex + 1]?.dataset.order);

            // 根据 currentIndex 位置计算排序后的 order数值
            if ( currentIndex === 0 ) {
                order = nextOrder / 2;
            } else if ( currentIndex === boardListArr.length - 1 ) {
                order = prevOrder + 65535;
            } else {
                order = prevOrder + ( nextOrder - prevOrder ) / 2;
            }

            // 获取绑定在元素上的数据
            let listId =  parseFloat(boardListArr[currentIndex].dataset.id);
            let name = boardListArr[currentIndex].querySelector(".form-field-input").innerHTML;

            // 更新列表排序Api
            await updateBoardListApi({
                id: listId,
                boardId: parseInt(id),
                name,
                order,
                listNewIndex: currentIndex
            })
        }

    }

    return (    
        <div id="board">
            <main>
                <h2>
                    {currentBoard ? currentBoard.name : "加载中..."}
                    <span className="btn btn-icon">邀请</span>
                </h2>
                <div className="board">
                    {/* 卡片列表 */}
                    {currentBoardList?.map(item => {
                        return  <BoardList
                                    key={item.id}
                                    addEventBoardStart={addEventBoardStart}
                                    addEventBoardMove={addEventBoardMove}
                                    addEventBoardUp={addEventBoardUp}
                                    {...item}
                                />
                    })}
                    <div className={`list-wrap no-content ${ addList.state ? 'list-adding' : ''} `}>
                        <div 
                            className="list-add"
                            onClick = {() => {
                                setAddList({
                                    ...addList,
                                    state: true
                                });
                                setTimeout(() => {
                                    addInput.current.focus();
                                })
                            }}
                        >
                            <span className="icon icon-add"></span>
                            <span>添加另一个列表</span>
                        </div>
                        <div className="list">
                            <div className="list-cards">
                                <div className="list-card-add-form">
                                    <input className="form-field-input" 
                                    ref={addInput}
                                    value={addList.value}
                                    onChange={({target})=>{
                                        setAddList({
                                            ...addList,
                                            value: target.value
                                        })
                                    }}
                                    placeholder="为这张列表添加标题……" />
                                </div>
                            </div>
                            <div className="list-footer">
                                <div className="list-add-confirm">
                                    <button 
                                        className="btn btn-success"
                                        onClick={addListHandle}
                                    >添加列表</button>
                                    <span 
                                        className="icon icon-close"
                                        onClick={ () => {
                                            setAddList({
                                                ...addList,
                                                state: false
                                            });
                                        }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <div className="popup" style={{
                left: "930px",
                top: "98px",
                display: "block"
            }}>
                <div className="popup-header">
                    <span className="popup-title">Title</span>
                    <Link to="/" className="popup-header-close">
                        <i className="icon icon-close"></i>
                    </Link>
                </div>

                <div className="popup-content">
                    <ul className="popup-menu-list">
                        <li><span>添加卡…</span></li>
                        <li><span>复制列表…</span></li>
                        <li><span>移动列表</span></li>
                        <li><span>关注 </span></li>
                    </ul>
                    <hr />
                    <ul className="popup-menu-list">
                        <li><span>移动此列表中的所有卡片…</span></li>
                        <li><span>归档这个列表中的所有卡…</span></li>
                    </ul>
                    <hr />
                    <ul className="popup-menu-list">
                        <li><span>将此列表进行归档</span></li>
                    </ul>
                </div>
            </div> */}
            <Route
                path={"/board/:id(\\d+)/list/:listId(\\d+)/card/:cardId(\\d+)"}
                exact
                render={() => {
                    return <CardView />
                }}
            ></Route>
        </div>
    )
}