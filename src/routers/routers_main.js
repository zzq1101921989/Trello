import React, {lazy} from "react";
import { Redirect } from "react-router-dom";

const Home = lazy( () => import("../views/indexView") );
const Board = lazy( () => import("../views/boardView") );
const Card = lazy( () => import("../views/cardView") );
const Register = lazy( () => import("../views/registerView") );
const Login = lazy( () => import("../views/loginView") );
const View404 = lazy( () => import("../views/notFontView") );

const routers_main = [
    {
        path: ['/', "/index"],
        exact: true,
        name: "首页",
        render(props) {
            if (localStorage.getItem("user")) {
                return <Home {...props} />
            }else{
                return <Redirect to="/login" />
            }
        },
    },{
        path: '/board/:id(\\d+)',
        exact: false,
        name: "面板",
        render(props) {
            let { id } = props.match.params;
            if ( typeof Number(id) === "number" && localStorage.getItem("user") ) {
                return <Board {...props} />
            } else if (!localStorage.getItem("user")) {
                return <Redirect to="/login" />
            }
            return <View404/>
        },
    },{
        path: '/board/:id(\\d+)/list/:listId(\\d+)/card/:cardId(\\d+)',
        exact: true,
        name: "面板详情",
        render(props) {
            let { id, listId, cardId } = props.match.params;
            if (typeof Number(id) === "number" && typeof Number(listId) === "number" && typeof Number(cardId) === "number"  && localStorage.getItem("user")) {
                return <Card {...props} />
            }else if (!localStorage.getItem("user")) {
                return <Redirect to="/login" />
            }
            return <View404/>
        },
    },{
        path: '/register',
        exact: true,
        name: "注册",
        render(props) {
            return <Register/>
        },
    },{
        path: '/login',
        exact: true,
        name: "登录",
        render(props) {
            return <Login/>
        },
    },{
        name: "404页面",
        render(props) {
            return <View404/>
        },
    }
];

export default routers_main;