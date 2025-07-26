import React from "react";
import '../../styles/ProductDetails.css'


function Circle({pargraph, img, className}) {
    return(
        <div className={`circle d-flex flex-column align-items-center ${className}`}>
            <img src={img} />
            <p className="">{pargraph}</p>
        </div>
    )
}

export default Circle