import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Header from "../../components/Header";
import { useGetBoardApi, useAddBoardApi } from "../../store/action/board";
import { useSelector } from "react-redux";
import Modal from "../../components/Message";

export default function IndexView() {
    // 状态
    let [value, setValue] = useState("");
    // 获取当前用户的所有面集合信息 请求
    const getBoardsApi = useGetBoardApi();
    // 添加一条面板数据 请求
    const addBoardApi = useAddBoardApi();
    // 获取当前用户的面板数据
    let boards = useSelector(state => state.boardReducer);
    
    useEffect(() => {
        if (boards == null) {
            getBoardsApi();
        }
    }, []);

    async function addBoardHandle (name) {
        if (name.trim().length === 0) {
            Modal.info({
                message: "面板名称不能为空",
                ty: "error"
            })
        }else{
            let res = await addBoardApi(name);
            if (res) {
                setValue("");
                Modal.info({
                    message: "创建成功",
                    ty: "success"
                })
            }
        }
    }

    return (
        <div id="home">
            {/* 公用头部 */}
            <Header />
            <main>
                <h2>
                    <span className="icon icon-board"></span>
                我的看板
            </h2>
                <ul className="board-items">
                    {
                        boards?.map(item => {
                            return (
                                <li 
                                    key={item.id}
                                    className="board-item">
                                    <Link 
                                        to={`/board/${item.id}`}
                                        className="title"
                                    >
                                    {item.name}</Link>
                                </li>
                            )
                        })
                    }
                    <li className="board-item create-new-board">
                        <textarea 
                            value = {value}
                            className = "title form-field-input" 
                            placeholder = "点击创建新看板"
                            onChange = { ({target}) => {
                                setValue(target.value);
                            }}
                            onBlur = { () => {
                                addBoardHandle(value);
                            } }
                        >
                        </textarea>
                    </li>
                </ul>
            </main>
        </div>
    )
}