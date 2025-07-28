import React from "react";
import '../../styles/productDetails.css'


function Circle({pargraph, img, className}) {
    return(
        <div className={`circle d-flex flex-column align-items-center ${className}`}>
            <img src={img} />
            <p className="">{pargraph}</p>
        </div>
    )
}

export default Circle
