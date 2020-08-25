import http from "../http";
import { useDispatch } from "react-redux";

export function useGetBoardListCardsApi () {

    const dispatch = useDispatch();

    return async function (boardListId) {

        let res = await http.get(`/card`, {
            params: {
                boardListId
            }
        });
    }
}