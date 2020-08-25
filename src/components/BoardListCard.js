import React from "react";

export default function BoardListCard(props) {

    let { cards } = props;

    return (
        cards ? cards.map(item => {
            return (
                <div key={item.id} className="list-cards">
                    <div className="list-card">
                        <div className="list-card-cover"
                            style={{
                                "backgroundImage": 'url("https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png")'
                            }}></div>
                        <div className="list-card-title">{item.name}</div>
                        <div className="list-card-badges">
                            { item.description ? <div className="badge">
                                <span className="icon icon-description"></span>
                            </div> : null }
                            <div className="badge">
                                <span className="icon icon-comment"></span>
                                <span className="text">
                                    {
                                    item.comment.length ? item.comment.length : 0 
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
                    <div className="list-card-add-form">
                        <textarea className="form-field-input" placeholder="为这张卡片添加标题……"></textarea>
                    </div>
                </div>
            )
        }) : null
    )
}