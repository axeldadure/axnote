import React from 'react';

import './LeftNote.css';

function LeftNote({id, important, current, onClick, noteTitle, noteContent, flagClick}) {
  return (
    <div className={"leftNoteCt " + (current ? "current":"") + (important ? " important":"")} onClick={() => onClick(id)}>
      <div className="leftNoteFlag" onClick={(e) => flagClick(id, e)}><img src="/icons/flag-red.svg" alt="flag"/></div>
      <div className="leftNoteTitle">
          {noteTitle}
      </div>
      <div className="leftNoteDesc">
          {noteContent}
      </div>
    </div>
  )
}

export default LeftNote;