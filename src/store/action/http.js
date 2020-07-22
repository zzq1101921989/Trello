import axios from "axios";
import Message from "../../components/Message2";
import Modal from "../../components/Message";

const http = axios.create({
    baseURL: "/api",
    withCredentials: true
});

http.interceptors.request.use(configs => {
    try {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user.token) {
            configs.headers.common.authorization = user.token;
        }
    } catch (e) { }

    return configs;
})

http.interceptors.response.use(response => {
    return response;
}, error => {
    console.dir(error);
    errorHandle(error)
    return Promise.reject(error);
});

// 调用弹窗
function errorHandle(error) {
    // if (error.status == 422) {
    //     Modal.info({
    //         message: error.response.data.errorDetails.map(item => {
    //             return item.violations
    //         }),
    //         ty: "error"
    //     })
    // }
    Modal.info({
        message: error.response.data.errorDetails,
        ty: "error"
    })
}

export default http;
