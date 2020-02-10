import React from 'react';

import './RightTop.css';

function RightTop({currentId, currentDate, handleDelete, edited}) {
    return (
        <div className="rightTop">
            <div className={"rightSave" + (edited ? "" : " off")}>
                <input type="submit" value="" />
            </div>
            <div className="rightTopDate">Note created on the {currentDate}</div>
            <div className="rightTopBin" onClick={() => handleDelete(currentId)}>
                <img src="icons/bin.svg" alt="delete note"/> 
            </div>
        </div>
    )
}

export default RightTop;