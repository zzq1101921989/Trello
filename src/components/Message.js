import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";


function modalTypeHandle (type) {
    switch (type) {
        case "success":
            return "message-success";
        case "error":
            return "message-error";
        case "warning":
            return "message-warning";
    }
}

export default function Modal(props) {

    let {
        block = false,
        message = "提示错误信息",
        ty = "success",
        onCancel = function () { }
    } = props;

    return (
        <TransitionGroup
            appear={true}
            component={null}
        >
            <CSSTransition
                in={block}
                classNames="message-fade"
                timeout={1500}
                onEntered={(el) => {
                    el.addEventListener('transitionend', function(){
                        el.parentNode.remove();
                    }, false);
                }}
                // // 组件卸载直接在 DOM 中删除
                // unmountOnExit
            >
                <div className={`message ${modalTypeHandle(ty)} is-center`}>
                    <p className="message-content">提示信息：{message}</p>
                    <i
                        className="icon icon-close"
                        onClick={() => {
                            onCancel();
                        }}
                    ></i>
                </div>
            </CSSTransition>
        </TransitionGroup>
    )
}

['confirm', 'info', 'success', 'error', 'warning'].forEach(item => {

    Modal[item] = (...props) => {

        let div = document.createElement('div');
        document.body.appendChild(div);

        let currentConfig = Object.assign({}, ...props);

        // 关闭并且删除节点
        const destroy = () => {

            let { onCancel } = currentConfig;

            // 调用自定义闯入的方法
            onCancel && onCancel();

        }

        const render = (config) => {
            ReactDOM.render(<Modal
                {...config}
                block={true}
                onCancel={destroy}
            />, div);
        }

        render(currentConfig);
    }
})