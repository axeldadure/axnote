import React from 'react';
import './RightTags.css';

function RightTags({allTags, currentTags, handleTagClick}) {

    return (
        <div className="rightTopTags">
            {allTags.map(tag => (
                <div key={tag.id} className={"rightTopTag" + (currentTags.includes(tag.id) ? "" : " off")} onClick={() => handleTagClick(tag.id)}>{tag.tagName}</div>
            ))}
        </div>
    )
}

export default RightTags;
