import React from "react";
import useDateHandle from "../util/dataTime";

function Comment(props) {

    let { comments } = props;

    let newDate = useDateHandle();

    return (
        <ul className="comments">
            {
                comments?.map(item => {
                    return (
                        <li 
                            className="comment"
                            key={item.id}
                        >
                            <div className="avatar">
                                <span>{item.user.name}</span>
                            </div>
                            <div className="description">
                                <div className="header">
                                    <strong>{item.user.name}</strong>
                                    <span> at </span>
                                    <i>{newDate(comments.createdAt)}</i>
                                </div>
                                <div className="content">{item.content}</div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

// export default React.memo(Comment);
export default Comment;