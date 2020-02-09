import React from 'react';

import './RightTop.css';

function RightTop({currentId, handleDelete}) {
    return (
        <div className="rightTop">
            <div className="rightTopBin" onClick={() => handleDelete(currentId)}>
                <img src="icons/bin.svg" alt="delete note"/> 
            </div>
        </div>
    )
}

export default RightTop;