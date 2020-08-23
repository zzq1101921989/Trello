import React, { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../store/action/login";

export default function LoginView() {

    // 定义状态
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    
    // 登录自定义 hooks
    let login = useLogin();
    
    return (
        <div id="register-login">
            <Link className="logo" to="/" />
            <div className="section-wrapper">
                <div className="account-form">
                    <h1>登录到 Trello</h1>
                    <form
                        id="register-form"
                        method="POST"
                        onSubmit={(e) => {
                            e.preventDefault();
                            // 登录
                            login({
                                name,
                                password
                            })
                        }}
                    >
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
                        <div className="btn-container">
                            <input type="submit" className="btn btn-success" value="登录" />
                            <Link className="btn" to="/register" >注册</Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}