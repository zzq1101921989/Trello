import React, {useState} from "react"
import { useAddCommentApi } from "../store/action/comment";
import { useHistory } from "react-router-dom";
import Modal from "./Message";

function AddComment(props) {

    const { boardListCardId } = props;

    const history = useHistory();

    let [ comment, setComment ] = useState('');

    let addCommentApi = useAddCommentApi();

    function addCommentHandle (value) {

        if (!value.trim().length) {

            Modal.info({
                ty: "error",
                message: "请输入评论的内容"
            })

        } else {
            try {
                addCommentApi({
                    boardListCardId,
                    content: value
                });
                Modal.info({
                    ty: "success",
                    message: "评论成功"
                });
                history.push("?comPage=1")
                setComment('')

            } catch (e) {}
        }
    }

    return (
        <>
            <div className="title">
                <div className="title-icon">
                    <i className="icon icon-activity"></i>
                </div>
                <div className="title-text">
                    <h3>评论</h3>
                </div>
            </div>
            <div className="comment-post">
                <div className="avatar">
                    <span>Z</span>
                </div>
                <div className="comment-content-box editing">
                    <textarea
                        className="comment-content-input"
                        placeholder="添加评论……"
                        value={comment}
                        onChange={({ target }) => {
                            setComment(target.value);
                        }}
                    >
                    </textarea>
                    <button
                        className="btn btn-edit"
                        onClick={() => {
                            addCommentHandle(comment)
                        }}
                    >保存</button>
                </div>
            </div>
        </>
    )
}

export default React.memo(AddComment);