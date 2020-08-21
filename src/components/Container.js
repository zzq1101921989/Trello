import React, {Fragment, useEffect} from "react";
import Header from "./Header"

export default function Container (props) {

    const { children } = props

    return (
        <Fragment>
            <Header></Header>
            { children }
        </Fragment>
    )
}