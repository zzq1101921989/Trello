import React from "react";
import { Link } from "react-router-dom"

export default function CardView() {
    return (
        <div className="window-overlay" style={{
            display: "block"
        }}>
            <div className="popup">
                <div className="popup-header">
                    <div className="popup-title">
                        <div className="popup-title-icon">
                            <span className="icon icon-card"></span>
                        </div>
                        <div className="popup-title-text">
                            <textarea 
                                className="form-field-input"
                                value="平台规划"
                            ></textarea>
                        </div>
                        <div className="popup-title-detail">
                            在列表 Done 中
                        </div>
                    </div>
                    <Link to="/" className="popup-header-close">
                        <i className="icon icon-close"></i>
                    </Link>
                </div>
                <div className="popup-content">
                    <div className="window-module">
                        <div className="title">
                            <div className="title-icon">
                                <span className="icon icon-description"></span>
                            </div>
                            <div className="title-text">
                                <h3>描述</h3>
                                <button className="btn btn-edit">编辑</button>
                            </div>
                        </div>
                        <p className="description">
                            <textarea 
                                className="form-field-input"
                                value="To Do"
                            ></textarea>
                        </p>
                    </div>
                    <div className="window-module">
                        <div className="title">
                            <div className="title-icon">
                                <i className="icon icon-attachment"></i>
                            </div>
                            <div className="title-text">
                                <h3>附件</h3>
                            </div>
                        </div>
                        <ul className="attachments">
                            <li className="attachment">
                                <div className="attachment-thumbnail" style={{
                                    "backgroundImage": "url('https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png')"
                                }}></div>
                                <p className="attachment-detail">
                                    <span className="attachment-thumbnail-name"><strong>icon_nav_button.png</strong></span>
                                    <span className="attachment-thumbnail-descriptions">
                                        <span className="datetime">2019年12月29日晚上11点04分</span>
                                        <span> - </span>
                                        <u>删除</u>
                                    </span>
                                    <span className="attachment-thumbnail-operation">
                                        <i className="icon icon-card-cover"></i>
                                        <u>移除封面</u>
                                    </span>
                                </p>
                            </li>
                            <li className="attachment">
                                <div className="attachment-thumbnail" style={{
                                    "backgroundImage": "url('https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png')"
                                }}></div>
                                <p className="attachment-detail">
                                    <span className="attachment-thumbnail-name"><strong>icon_nav_button.png</strong></span>
                                    <span className="attachment-thumbnail-descriptions">
                                        <span className="datetime">2019年12月29日晚上11点04分</span>
                                        <span> - </span>
                                        <u>删除</u>
                                    </span>
                                    <span className="attachment-thumbnail-operation">
                                        <i className="icon icon-card-cover"></i>
                                        <u>移除封面</u>
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <div>
                            <button className="btn btn-edit">添加附件</button>
                        </div>
                    </div>
                    <div className="window-module">
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
                                <textarea className="comment-content-input" placeholder="添加评论……"></textarea>
                                <button className="btn btn-edit">保存</button>
                            </div>
                        </div>
                        <ul className="comments">
                            <li className="comment">
                                <div className="avatar">
                                    <span>Z</span>
                                </div>
                                <div className="description">
                                    <div className="header">
                                        <strong>zMouse</strong>
                                        <span> at </span>
                                        <i>2019年12月29日晚上11点04分</i>
                                    </div>
                                    <div className="content">
                                        非常不错！！
                                    </div>
                                </div>
                            </li>
                            <li className="comment">
                                <div className="avatar">
                                    <span>Z</span>
                                </div>
                                <div className="description">
                                    <div className="header">
                                        <strong>zMouse</strong>
                                        <span> at </span>
                                        <i>2019年12月29日晚上11点04分</i>
                                    </div>
                                    <div className="content">
                                        非常不错！！
                                    </div>
                                </div>
                            </li>
                            <li className="comment">
                                <div className="avatar">
                                    <span>Z</span>
                                </div>
                                <div className="description">
                                    <div className="header">
                                        <strong>zMouse</strong>
                                        <span> at </span>
                                        <i>2019年12月29日晚上11点04分</i>
                                    </div>
                                    <div className="content">
                                        非常不错！！
                                    </div>
                                </div>
                            </li>
                            <li className="comment">
                                <div className="avatar">
                                    <span>Z</span>
                                </div>
                                <div className="description">
                                    <div className="header">
                                        <strong>zMouse</strong>
                                        <span> at </span>
                                        <i>2019年12月29日晚上11点04分</i>
                                    </div>
                                    <div className="content">
                                        非常不错！！
                                    </div>
                                </div>
                            </li>
                            <li className="comment">
                                <div className="avatar">
                                    <span>Z</span>
                                </div>
                                <div className="description">
                                    <div className="header">
                                        <strong>zMouse</strong>
                                        <span> at </span>
                                        <i>2019年12月29日晚上11点04分</i>
                                    </div>
                                    <div className="content">
                                        非常不错！！
                                    </div>
                                </div>
                            </li>
                            <li className="comment">
                                <div className="avatar">
                                    <span>Z</span>
                                </div>
                                <div className="description">
                                    <div className="header">
                                        <strong>zMouse</strong>
                                        <span> at </span>
                                        <i>2019年12月29日晚上11点04分</i>
                                    </div>
                                    <div className="content">
                                        非常不错！！
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="comment-pagination">
                            <div className="pagination">
                                <span>首页</span>
                                <span>上一页</span>
                                <span>...</span>
                                <span>4</span>
                                <span>5</span>
                                <span className="current-page">6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>...</span>
                                <span>下一页</span>
                                <span>尾页</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}