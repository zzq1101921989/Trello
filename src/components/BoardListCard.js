import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BoardListCard(props) {

    let { cards, boardId, boardListId } = props;

    // 环境变量获取
    const { staticPath } = useSelector(state => state.serverPath);

    return (
        cards ? cards.map(item => {
            return (
                <Link 
                    key={item.id} 
                    className="list-cards"
                    to={`/board/${boardId}/list/${boardListId}/card/${item.id}`}
                >
                    <div className="list-card">
                        {
                            item.coverPath 
                            ? 
                            <div className="list-card-cover"
                                style={{
                                    "background": `url(${staticPath}${item.coverPath}) no-repeat center center`,
                                    "backgroundSize": "100%"
                                }}> 
                            </div> : ""
                        }
                        <div className="list-card-title">{item.name}</div>
                        <div className="list-card-badges">
                            { item.description ? <div className="badge">
                                <span className="icon icon-description"></span>
                            </div> : null }
                            <div className="badge">
                                <span className="icon icon-comment"></span>
                                <span className="text">
                                    {
                                    item.commentCount ? item.commentCount : 0 
                                    }
                                </span>
                            </div>
                            <div className="badge">
                                <span className="icon icon-attachment"></span>
                                <span className="text">
                                    {
                                    item.attachments.length ? item.attachments.length : 0 
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        }) : null
    )
}