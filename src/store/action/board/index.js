import React from "react";
import http from "../http";
import { useDispatch } from "react-redux";

/**
 * 获取所有面板信息
 */
function useGetBoardApi () {

    const dispatch = useDispatch();

    return async function () {

        let res =  await http.get("/board")

        dispatch({
            type: "GET_BOARD",
            boards: res.data
        })
    }   
}

/**
 * 添加一个面板信息
 */
function useAddBoardApi () {

    const dispatch = useDispatch();

    return async function (name) {
        let res =  await http.post("/board", {
            name
        })

        dispatch({
            type: "ADD_BOARD",
            data: res.data
        })
        
        console.log(res);

        return res;
    }
}


export { useGetBoardApi, useAddBoardApi };