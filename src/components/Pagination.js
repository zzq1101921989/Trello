import React, { useMemo } from "react";

function Pagination(props) {

    let { count, page, setPageHandle } = props;

    let countPage = Math.ceil(count / 3);

    let showPage = 5;

    let arr = useMemo( function handlePageNumber () {

        let start = page - 2 > 0 ? page - 2 : 1;
        let end = start + (showPage - 1);

        if ( end > countPage ) {
            end = countPage
            if ( end - (showPage-1) >= 1 ) {
                start = end - (showPage-1)
            }
        }

        let arr = [];

        for (let i = start; i <= end; i++) {
            arr.push(i);        
        }

        return arr;

    }, [count, page ])

    return (
        <div className="comment-pagination">
            <div className="pagination">
                <span 
                    onClick={() => {
                        if (page > 1) {
                            setPageHandle(1)
                        }
                    }} 
                >首页</span>
                <span 
                    onClick={() => {
                        if (page > 1) {
                            setPageHandle(page - 1)
                        }
                    }} 
                >上一页</span>
                {
                    (page - (showPage - 1)) > 1 ? 
                    <span
                        onClick={()=>{
                            setPageHandle(page - showPage)
                        }}
                    >...</span> : ''
                }
                {
                    arr.map((item, index) => {
                        return <span 
                                key={index}
                                className={`${item == page? 'current-page' : ''}`}
                                onClick={()=>{
                                    if (item != page) {
                                        setPageHandle(item)
                                    }
                                }}    
                            >{item}</span>
                    })
                }
                {
                     -(-page) + (showPage - 1) < countPage ? 
                     <span
                         onClick={()=>{
                             setPageHandle(-(-page) + showPage)
                         }}
                     >...</span> : ''
                }
                <span
                    onClick={() => {
                        if (page < countPage) {
                            setPageHandle(-(-page) + 1)
                        }
                    }}
                >下一页</span>
                <span
                    onClick={() => {
                        if (page < countPage) {
                            setPageHandle(countPage)
                        }
                    }} 
                >尾页</span>
            </div>
        </div>
    )
}

export default React.memo(Pagination);
// export default Pagination;