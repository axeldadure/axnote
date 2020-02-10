import React from 'react';
import Notes from '../../data/Notes'

import './RightTags.css';

const tags = Notes.tags;

function RightTags({currentTags, handleTagClick}) {

    return (
        <div className="rightTopTags">
            {tags.map(tag => (
                <div key={tag.id} className={"rightTopTag" + (currentTags.includes(tag.id) ? "" : " off")} onClick={() => handleTagClick(tag.id)}>{tag.tagName}</div>
            ))}
        </div>
    )
}

export default RightTags;
