import React from "react";

export default function PopupMenu(props) {

    let { items } = props;

    return (
        <div className="popup-content">
            <ul className="popup-menu-list">
                {
                    items?.map( (item, index) => {
                        return (
                            item.separator ? 
                            <li key={ index } className="separator"></li> : 
                            <li 
                                key={ index } 
                                onClick = { item.handler }
                            ><span>{ item.name }</span></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}