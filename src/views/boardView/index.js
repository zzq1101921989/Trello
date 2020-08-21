import React from "react";
import { Link, Route } from "react-router-dom"
import CardView from "../cardView";

export default function BoardView() {
    return (    
        <div id="board">
            <main>
                <h2>
                    test
                <span className="btn btn-icon">
                        邀请
                </span>
                </h2>
                <div className="board">
                    <div className="list-wrap">
                        <div className="list-placeholder"></div>
                        <div className="list">
                            <div className="list-header">
                                <textarea 
                                    className="form-field-input"
                                    value="To Do"
                                ></textarea>
                                <div className="extras-menu">
                                    <span className="icon icon-more"></span>
                                </div>
                            </div>
                            <div className="list-cards">
                                <div className="list-card">
                                    <div className="list-card-cover"
                                        style={{
                                            "backgroundImage": 'url("https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png")'
                                        }}></div>
                                    <div className="list-card-title">接口代码编写及测试</div>
                                    <div className="list-card-badges">
                                        <div className="badge">
                                            <span className="icon icon-description"></span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-comment"></span>
                                            <span className="text">2</span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-attachment"></span>
                                            <span className="text">5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-card">
                                    <div className="list-card-title">接口代码编写及测试</div>
                                    <div className="list-card-badges">
                                        <div className="badge">
                                            <span className="icon icon-description"></span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-comment"></span>
                                            <span className="text">2</span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-attachment"></span>
                                            <span className="text">5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-card">
                                    <div className="list-card-cover"
                                        style={{
                                            "backgroundImage": 'url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png)'
                                        }}></div>
                                    <div className="list-card-title">接口代码编写及测试</div>
                                    <div className="list-card-badges">
                                        <div className="badge">
                                            <span className="icon icon-description"></span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-comment"></span>
                                            <span className="text">2</span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-attachment"></span>
                                            <span className="text">5</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="list-card">
                                    <div className="list-card-title">接口代码编写及测试</div>
                                    <div className="list-card-badges">
                                        <div className="badge">
                                            <span className="icon icon-description"></span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-comment"></span>
                                            <span className="text">2</span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-attachment"></span>
                                            <span className="text">5</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="list-card">
                                    <div className="list-card-cover"
                                        style={{
                                            "backgroundImage": "url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png)"
                                        }}></div>
                                    <div className="list-card-title">接口代码编写及测试</div>
                                    <div className="list-card-badges">
                                        <div className="badge">
                                            <span className="icon icon-description"></span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-comment"></span>
                                            <span className="text">2</span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-attachment"></span>
                                            <span className="text">5</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="list-card">
                                    <div className="list-card-cover"
                                        style={{
                                            "backgroundImage": "url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png)"
                                        }}></div>
                                    <div className="list-card-title">接口代码编写及测试</div>
                                    <div className="list-card-badges">
                                        <div className="badge">
                                            <span className="icon icon-description"></span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-comment"></span>
                                            <span className="text">2</span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-attachment"></span>
                                            <span className="text">5</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="list-card">
                                    <div className="list-card-cover"
                                        style={{
                                            "backgroundImage": "url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png)"
                                        }}></div>
                                    <div className="list-card-title">接口代码编写及测试</div>
                                    <div className="list-card-badges">
                                        <div className="badge">
                                            <span className="icon icon-description"></span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-comment"></span>
                                            <span className="text">2</span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-attachment"></span>
                                            <span className="text">5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-card-add-form">
                                    <textarea className="form-field-input" placeholder="为这张卡片添加标题……"></textarea>
                                </div>
                            </div>
                            <div className="list-footer">
                                <div className="list-card-add">
                                    <span className="icon icon-add"></span>
                                    <span>添加另一张卡片</span>
                                </div>
                                <div className="list-add-confirm">
                                    <button className="btn btn-success">添加卡片</button>
                                    <span className="icon icon-close"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-wrap list-adding">
                        <div className="list-placeholder"></div>
                        <div className="list">
                            <div className="list-header">
                                <textarea className="form-field-input">To Do</textarea>
                                <div className="extras-menu">
                                    <span className="icon icon-more"></span>
                                </div>
                            </div>
                            <div className="list-cards">
                                <div className="list-card">
                                    <div className="list-card-title">接口代码编写及测试</div>
                                    <div className="list-card-badges">
                                        <div className="badge">
                                            <span className="icon icon-description"></span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-comment"></span>
                                            <span className="text">2</span>
                                        </div>
                                        <div className="badge">
                                            <span className="icon icon-attachment"></span>
                                            <span className="text">5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-card-add-form">
                                    <textarea className="form-field-input" placeholder="为这张卡片添加标题……"></textarea>
                                </div>
                            </div>
                            <div className="list-footer">
                                <div className="list-card-add">
                                    <span className="icon icon-add"></span>
                                    <span>添加另一张卡片</span>
                                </div>
                                <div className="list-add-confirm">
                                    <button className="btn btn-success">添加卡片</button>
                                    <span className="icon icon-close"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-wrap no-content list-adding">
                        <div className="list-add">
                            <span className="icon icon-add"></span>
                            <span>添加另一个列表</span>
                        </div>
                        <div className="list">
                            <div className="list-cards">
                                <div className="list-card-add-form">
                                    <input className="form-field-input" placeholder="为这张卡片添加标题……" />
                                </div>
                            </div>
                            <div className="list-footer">
                                <div className="list-add-confirm">
                                    <button className="btn btn-success">添加列表</button>
                                    <span className="icon icon-close"></span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
            <div className="popup" style={{
                left: "930px",
                top: "98px",
                display: "block"
            }}>
                <div className="popup-header">
                    <span className="popup-title">Title</span>
                    <Link to="/" className="popup-header-close">
                        <i className="icon icon-close"></i>
                    </Link>
                </div>

                <div className="popup-content">
                    <ul className="popup-menu-list">
                        <li><span>添加卡…</span></li>
                        <li><span>复制列表…</span></li>
                        <li><span>移动列表</span></li>
                        <li><span>关注 </span></li>
                    </ul>
                    <hr />
                    <ul className="popup-menu-list">
                        <li><span>移动此列表中的所有卡片…</span></li>
                        <li><span>归档这个列表中的所有卡…</span></li>
                    </ul>
                    <hr />
                    <ul className="popup-menu-list">
                        <li><span>将此列表进行归档</span></li>
                    </ul>
                </div>
            </div>
            <Route
                path={"/board/:id(\\d+)/list/:listId(\\d+)/card/:cardId(\\d+)"}
                exact
                render={() => {
                    return <CardView />
                }}
            ></Route>
        </div>
    )
}