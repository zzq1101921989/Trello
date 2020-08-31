import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

export default function Popup(props) {

    let { children, show, setShow, title, content } = props

    // 获取功能弹窗
    let popupRef = useRef(null);
    // 获取功能弹窗父级容器
    let container = useRef(null);
    // 关闭按钮
    let close = useRef(null);

    useEffect(() => {

        let Rect = popupRef.current.getBoundingClientRect();

        if (Rect.right > window.innerWidth) {

            popupRef.current.style.left = - Rect.width + container.current.offsetWidth + "px";
            
        } else {
            popupRef.current.style.top = container.current.offsetHeight + "px"
            popupRef.current.style.left = - Rect.width + 26 + "px";
            popupRef.current.style.width = "200px"
        }
    }, [show]);

    useEffect(() => {
        window.addEventListener("click", closeFn);
        return () => {
            window.removeEventListener("click", closeFn);
        }
    }, [])

    function closeFn(e) {
        // 1. 冒泡队列中存在关闭按钮
        // 2. 冒泡队列中不存在功能弹窗容器
        // 3. 冒泡队列中包含功能弹窗容器中的子类
        if (
            e.path.includes(close.current)
            ||
            !e.path.includes(container.current)
            ||
            e.path.includes(document.querySelector(".popup-menu-list"))) {
            setShow(false)
        }
    }

    return (
        <div className="popup-container" ref={container}>
            <div>
                {children}
            </div>
            <div className="popup"
                style={{
                    display: show ? "block" : "none"
                }}
                ref={popupRef}
            >
                <div className="popup-header">
                    <span className="popup-title">{title}</span>
                    <a
                        ref={close}
                        className="popup-header-close"
                    >
                        <i className="icon icon-close"></i>
                    </a>
                </div>
                {content}
            </div>
        </div>
    )
}