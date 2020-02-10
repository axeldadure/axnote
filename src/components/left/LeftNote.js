import React from 'react';
import Notes from '../../data/Notes'

import './LeftNote.css';

const tags = Notes.tags;

function LeftNote({id, important, current, onClick, noteTitle, noteContent, noteTags, flagClick}) {

  const tagsFiltered = tags.filter(tag => {
    return noteTags.includes(tag.id);
  });

  return (
    <div className={"leftNoteCt " + (current ? "current":"") + (important ? " important":"")} onClick={() => onClick(id)}>
      <div className="leftNoteFlag" onClick={(e) => flagClick(id, e)}><img src="/icons/flag-red.svg" alt="flag"/></div>
      <div className="leftNoteTitle">
          {noteTitle}
      </div>
      <div className="leftNoteDesc">
          {noteContent}
      </div>
      {tagsFiltered.length > 0 && (
      <div className="leftNoteTags">
          {tagsFiltered.map(tag => (
              <div key={tag.id} className="leftNoteTag">{tag.tagName}</div>
          ))}
      </div>)}
    </div>
  )
}

export default LeftNote;