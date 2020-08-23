import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Popup from "./Popup";
import PopupMenu from "./PopupMenu";
import Modal from "./Message"

function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    // 功能弹窗状态
    let [show, setShow] = useState(false);
    // 功能弹窗内容的 name和点击处理函数
    let menuList = useRef([
        {
            name: "注销",
            handler() {
                dispatch({
                    type: "LOGIN_OUT",
                });
                dispatch({
                    type: "CLEAR_BOARD",
                });
                Modal.info({
                    message: "退出成功",
                    ty: "success"
                });

                localStorage.removeItem("user");
                history.push("/login");
            }
        }
    ]);
    // 取出 用户信息
    let user = useSelector(state => state.loginReducer);

    useEffect(() => {   

        const userInfo = JSON.parse(localStorage.getItem("user"));

        if (userInfo) {
            dispatch({
                type: "LOGIN",
                id: userInfo.id,
                name: userInfo.name,
                token: userInfo.token
            });
        }
    }, [])

    return (
        <header>
            <div className="left">
                <Link to="/" className="btn btn-icon">
                    <i className="icon icon-home"></i>
                </Link>
                <Link to="/" className="btn btn-icon">
                    <i className="icon icon-board"></i>
                    <span className="txt">看板</span>
                </Link>
            </div>
            <Link to="/" className="logo"></Link>
            <div className="right">
                <Link to="" className="btn btn-icon">
                    <i className="icon icon-add"></i>
                </Link>
                <Popup
                    show={show}
                    setShow={setShow}
                    title={user.name}
                    content={<PopupMenu items={menuList.current} />}
                >
                    <button
                        className="avatar"
                        onClick={() => {
                            setShow(!show);
                        }}
                    >
                        <span>Z</span>
                    </button>
                </Popup>
            </div>
        </header>
    )
}

export default Header;