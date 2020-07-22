import React, { Suspense } from "react"
import { Switch, Route } from "react-router-dom"
import routers_main from "../routers/routers_main"

export default function InitRouter() {
    return (
        <Suspense fallback={<div>loading...</div>} >
            <Switch>
                {
                    routers_main.map(item => {
                        return (
                            <Route
                                key={item.name}
                                path={item.path}
                                exact={item.exact}
                                render={item.render}
                            />
                        )
                    })
                }
            </Switch>
        </Suspense>
    )
}