import http from "../http";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import Modal from "../../../components/Message";

export default function useLogin () {

    const history = useHistory();
    const dispatch = useDispatch();

    return async function (data) {

        if (data.name.trim().length <= 0 || data.password.trim().length <= 0) {
            return Modal.info({
                message: "请填写正确的用户名或密码",
                ty: "error"
            })
        };

        try {
            let res = await http.post("/user/login", data);

            console.log(res);

            dispatch({
                type: "LOGIN",
                id: res.data.id,
                name: res.data.name,
                token: res.headers.authorization
            })

            // 持久化存储
            localStorage.setItem("user", JSON.stringify({
                id: res.data.id,
                name: res.data.name,
                token: res.headers.authorization
            }))

            Modal.info({
                message: "登录成功",
                ty: "success"
            });

            history.push("/");
            
        } catch (err) {
            console.log(err)
        }
    }  
}