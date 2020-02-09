import React from 'react';

import './LeftNote.css';

function LeftNote({id, current, onClick, noteTitle, noteContent}) {
  return (
    <div className={"leftNoteCt "+ (current ? "current":"")} onClick={() => onClick(id)}>
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