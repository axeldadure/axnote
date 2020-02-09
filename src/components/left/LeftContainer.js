import React, { Component } from 'react';
import LeftNote from './LeftNote';

import './LeftContainer.css';

function LeftTop({handlePlusClick}) {
    return (
        <div className="leftTop">
            <div className="leftTopPlus" onClick={() => handlePlusClick()}>
                <img src="icons/plus.svg" alt="add note"/> 
            </div>
        </div>
    )
}

class LeftContainer extends Component {
    render() {
        const {handlePlusClick, notes, currentId, onClick} = this.props
        return (
        <div className="leftFrame">
            <LeftTop handlePlusClick={handlePlusClick} />
            {notes.map(note => (
                <LeftNote 
                key={note.id} 
                id={note.id} 
                current={currentId === note.id} 
                onClick={onClick}
                noteTitle={note.title}
                noteContent={note.content}
                />
            )).reverse()}
        </div>
        )
    }
}

export default LeftContainer;