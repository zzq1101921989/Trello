import http from "../http";
import { useHistory } from "react-router-dom";
import Modal from "../../../components/Message";

function useRegister() {

    const history = useHistory();

    return async function (data) {
        
        if (data.name.trim().length <= 0 || data.password.trim().length <= 0) {
            return Modal.info({
                message: "请填写正确的用户名或密码",
                ty: "error"
            })
        };
        if (data.password !== data.rePassWord) {
            return Modal.info({
                message: "两次密码不一致",
                ty: "error"
            })
        }
        try {
            await http.post("/user/register", data);
            Modal.info({
                message: "注册成功, 请点击登录",
                ty: "success"
            })
            history.push("/login");
            
        } catch (err) {
            return Modal.info({
                message: err.response.data.errorDetails,
                ty: "error"
            })
        }
    }
}

export { useRegister }