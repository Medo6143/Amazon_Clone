import React from "react";
import '../../styles/ProductDetails.css'


function Circle({pargraph, img}) {
    return(
        <div className="circle d-flex flex-column align-items-center">
            <img src={img} alt="" />
            <p className="">{pargraph}</p>
        </div>
    )
}

export default Circle