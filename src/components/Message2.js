// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";

// class MessageT extends Component {

//     constructor (props) {
//         super(props);
//         this.state = {
//             message: "提示错误信息",
//             ty: "success",
//             block: false
//         }
//     }

//     open = (options) => {
//         this.setState({
//             ...options,
//             block: true
//         })
//     };
    
//     close = () => {
//         this.setState({
//             block: false
//         })
//     };

//     handlerType = (type) => {
//         switch (type) {
//             case "success":
//                 return "message-success";
//             case "error":
//                 return "message-error";
//             case "warning":
//                 return "message-warning";
//         }
//     }
    

//     render() {
//         console.log(this.state.block);
//         let {block, ty, message } = this.state;
//         return (
//             <CSSTransition
//                 in={block}
//                 classNames="message-fade"
//                 timeout={1500}
//                 onEntered={() => {
//                     this.close();
//                 }}
//                 // 组件卸载直接在 DOM 中删除
//                 unmountOnExit
//             >
//                 <div className={`message ${this.handlerType(ty)} is-center`}>
//                     <p className="message-content">提示信息：{message}</p>
//                     <i 
//                         className="icon icon-close"
//                         onClick = {()=>{
//                             this.close();
//                         }}
//                     ></i>
//                 </div>
//             </CSSTransition>
//         )
//     }
// }
// let div = document.createElement("div");
// document.body.appendChild(div);

// let Modal = ReactDOM.render(<MessageT />, div);


// export default Modal