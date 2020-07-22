import React from "react";
import { Link } from "react-router-dom";

export default function View404() {
    return (
        <div id="notFound">
            <header>
                <div className="left">
                    <Link to="/" className="btn btn-icon">
                        <i className="icon icon-home"></i>
                    </Link>
                    <Link to="" className="btn btn-icon">
                        <i className="icon icon-board"></i>
                        <span className="txt">看板</span>
                    </Link>
                </div>
                <Link to="/" className="logo"></Link>
                <div className="right">
                    <Link to="" className="btn btn-icon">
                        <i className="icon icon-add"></i>
                    </Link>
                    <button className="avatar">
                        <span>Z</span>
                    </button>
                </div>
            </header>
            <main>
                <h1>页面不存在.</h1>
                <div>
                    <Link to="register.html">注册</Link> | <Link to="login.html">登录</Link>
                </div>

            </main>
        </div>
    )
}