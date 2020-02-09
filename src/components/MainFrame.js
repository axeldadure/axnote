import React, { Component } from 'react';
import LeftContainer from './left/LeftContainer';
import RightContainer from './right/RightContainer';
import SavePopup from './SavePopup';
import Notes from '../data/Notes.json';

import './MainFrame.css';

let NOTES = Notes.notes

class MainFrame extends Component {
    constructor(props) {
        super(props);
        this.state = this.setCurrentNote(this.findHighestId(NOTES))
    }

    setCurrentNote(id) {
        const currentNote= this.findInArray(NOTES, id);
        return {
            currentId: currentNote.id,
            currentTitle: currentNote.title,
            currentContent: currentNote.content,
            edited: false,
            showSavePopup: false,
            targetId: null,
        }
    }

    findInArray(array, id) {
        return array.find(each => {return each.id === id})
    }

    findHighestId(array) {
        return Math.max.apply(Math, array.map(function(o) { return o.id; }))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const currentNote = this.findInArray(NOTES, this.state.currentId);
        currentNote.title = this.state.currentTitle;
        currentNote.content = this.state.currentContent;
        this.setState(this.setCurrentNote(this.state.currentId));
    }

    handleTitleChange = (newTitle) => {
        this.setState({currentTitle: newTitle});
    }
  
    handleContentChange = (newContent) => {
        this.setState({currentContent: newContent});
    }

    handlePlusClick = () => {
        const newID = this.findHighestId(NOTES) + 1
        NOTES.push({
            id: newID,
            title:"New Note",
            content: "",
            important: false,
            tags: [],
            date: null
        })
        this.setState(this.setCurrentNote(newID))
    }

    handleNoteClick = (id) => {
        if (!this.state.edited) {
            this.setState(this.setCurrentNote(id))
        }
        else {
            this.setState({
                targetId: id,
                showSavePopup: true
            })
        }
    }

    handlePopupSave = () => {
        const currentNote = this.findInArray(NOTES, this.state.currentId);
        currentNote.title = this.state.currentTitle;
        currentNote.content = this.state.currentContent;
        this.setState(this.setCurrentNote(this.state.targetId));
    }

    handlePopupDontSave = () => {
        this.setState(this.setCurrentNote(this.state.targetId));
    } 

    handleDelete = (id) => {
        NOTES = NOTES.filter(note => {
            return note.id !== id;
        });
        this.setState(this.setCurrentNote(this.findHighestId(NOTES)))
    }

    componentDidUpdate(prevProps, prevState) {
        const {currentId, currentTitle, currentContent} = this.state
        if (currentId === prevState.currentId) {
          const conditions = (currentTitle !== prevState.currentTitle || currentContent !== prevState.currentContent)
          if (conditions && this.state.edited === false) {
            this.setState({edited: true});
          } 
        }
      }

    render() {
        const {currentId, currentTitle, currentContent, edited, showSavePopup} = this.state;
        return (
          <div className="mainFrame">

              {showSavePopup && <SavePopup handlePopupDontSave={this.handlePopupDontSave} handlePopupSave={this.handlePopupSave}/>}
              <LeftContainer 
              handlePlusClick={this.handlePlusClick}
              notes={NOTES} 
              currentId={currentId} 
              onClick={this.handleNoteClick}/>

              <RightContainer 
              currentId={currentId} 
              currentTitle={currentTitle}
              currentContent={currentContent}
              handleSubmit={this.handleSubmit}
              handleTitleChange={this.handleTitleChange}
              handleContentChange={this.handleContentChange}
              handleDelete={this.handleDelete}
              handleSubmit={this.handleSubmit}
              edited={edited} />
          </div>
        )
    }
}

export default MainFrame;
