import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../store/action/register";

export default function RegisterView() {
    // 用户名状态
    let [name, setName] = useState("");
    // 用户密码状态
    let [password, setPassword] = useState("");
    // 用户再次输入密码
    let [rePassWord, setRePassword] = useState("");
    // 注册自定义 hook
    let register = useRegister();
    // 注册逻辑
    function registerHandle () {
        register({
            name,
            password,
            rePassWord
        })
    }
    return (
        <Fragment>
            <div id="register-login">
                <Link className="logo" to="/"></Link>
                <div className="section-wrapper">
                    <div className="account-form">
                        <h1>注册 Trello</h1>
                        <form
                            id="login-form"
                            method="POST"
                            onSubmit={(e) => {
                                e.preventDefault();
                                registerHandle();
                            }}>
                            <div>
                                <label>
                                    <input
                                        value={name}
                                        className="form-field"
                                        autoFocus="autofocus"
                                        placeholder="输入用户名"
                                        onChange={({ target }) => {
                                            setName(target.value)
                                        }}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        value={password}
                                        type="password"
                                        className="form-field"
                                        placeholder="输入密码"
                                        onChange={({ target }) => {
                                            setPassword(target.value)
                                        }}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        value={rePassWord}
                                        type="password"
                                        className="form-field"
                                        placeholder="再次确认密码"
                                        onChange={({ target }) => {
                                            setRePassword(target.value)
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="btn-container">
                                <input type="submit" className="btn btn-success" value="注册" />
                                <Link to="/login" className="btn">登录</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}