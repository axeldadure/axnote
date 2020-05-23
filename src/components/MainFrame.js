import React, { Component } from 'react';
import LeftContainer from './left/LeftContainer';
import RightContainer from './right/RightContainer';
import SavePopup from './SavePopup';
import Notes from '../data/Notes.json';
import plus from '../icons/plus.svg'

import './MainFrame.css';

let NOTES = Notes.notes;
let TAGS = Notes.tags;

class MainFrame extends Component {
    constructor(props) {
        super(props);
        this.state = this.setCurrentNote(2)
    }

    setCurrentNote(id, edited=false, newNote=false) {
        const currentNote= this.findInArray(NOTES, id);
        return {
            empty: false,
            currentId: currentNote.id,
            currentTitle: currentNote.title,
            currentContent: currentNote.content,
            currentDate: currentNote.date,
            currentTags: currentNote.tags,
            edited: edited,
            newNote: newNote,
            showSavePopup: false,
            targetId: null,
        }
    }

    findInArray(array, id) {
        return array.find(each => {return each.id === id})
    }

    findHighestId(array) {
        return Math.max.apply(Math, array.map(o => {return o.id;}))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const currentNote = this.findInArray(NOTES, this.state.currentId);
        currentNote.title = this.state.currentTitle;
        currentNote.content = this.state.currentContent;
        this.setState(this.setCurrentNote(this.state.currentId,false,false));
    }

    handleTitleChange = (newTitle) => {
        this.setState({currentTitle: newTitle});
    }
  
    handleContentChange = (newContent) => {
        this.setState({currentContent: newContent});
    }

    handlePlusClick = () => {
        const newID = this.findHighestId(NOTES) + 1
        const date = new Date();
        const newdate = ('0' + (date.getUTCMonth() + 1)).slice(-2) + "." + ('0' + date.getUTCDate()).slice(-2) + "." + date.getUTCFullYear();

        if (!this.state.edited) {
            NOTES.push({
                id: newID,
                title:"New Note",
                content: "",
                important: false,
                tags: [],
                date: newdate,
            });
            this.setState(this.setCurrentNote(newID, true, true))
        }
    }

    handleClickFromEmpty = () => {
        const date = new Date();
        const newdate = ('0' + (date.getUTCMonth() + 1)).slice(-2) + "." + ('0' + date.getUTCDate()).slice(-2) + "." + date.getUTCFullYear();
        NOTES.push({
            id: 1,
            title:"My First Note",
            content: "",
            important: false,
            tags: [],
            date: newdate,
        })
        this.setState(this.setCurrentNote(1, true))
    }

    handleNoteClick = (id) => {
        if (id !== this.state.currentId) {
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
    }

    flagClick = (id, e) => {
        e.stopPropagation(); 
        const toSetImportant = this.findInArray(NOTES, id);
        toSetImportant.important = !toSetImportant.important
        this.setState(this.setCurrentNote(this.state.currentId))
    }

    handlePopupSave = () => {
        const currentNote = this.findInArray(NOTES, this.state.currentId);
        currentNote.title = this.state.currentTitle;
        currentNote.content = this.state.currentContent;
        this.setState(this.setCurrentNote(this.state.targetId, false, false));
    }

    handlePopupDontSave = () => {
        if (this.state.newNote) {
            this.handleDelete(this.state.currentId)
        } else {
            this.setState(this.setCurrentNote(this.state.targetId));
        }
    } 

    handleDelete = (id) => {
        NOTES = NOTES.filter(note => {
           return note.id !== id;
        });
        if (NOTES.length > 0) {
            this.setState(this.setCurrentNote(this.findHighestId(NOTES)))
        }
        else {
            this.setState({empty: true})
        }
    }

    handleTagClick = (tagId) => {
        let newTags = this.state.currentTags
        if (newTags.includes(tagId)) {
            newTags = newTags.filter(tag => {
                return tag !== tagId;
            });
        }
        else {
            newTags.push(tagId);
        }
        this.findInArray(NOTES, this.state.currentId).tags = newTags;
        this.setState({currentTags: newTags})
    }

    handleAddTag = (newTag) => {
        const newTagId = this.findHighestId(TAGS)>0 ? this.findHighestId(TAGS) : 1;
        TAGS.push({ id:newTagId+1 , tagName:newTag});
        this.forceUpdate();
    }

    handleTagDelete = (tagId, e) => {
        e.stopPropagation(); 
        TAGS = TAGS.filter(tag => {
            return tag.id !== tagId;
         });

        NOTES.forEach(note => {
            note.tags = note.tags.filter(tag => {
                return tag !== tagId
            })
            console.log(note.tags)
        });
        this.forceUpdate();
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
        const {empty,currentId, currentTitle, currentContent, currentDate, currentTags, edited, showSavePopup} = this.state;
        return (
          <div className="mainFrame">

              {empty ? (
                <div className="mainFrameEmpty">
                    <div className="mainFrameEmptyIn" onClick={this.handleClickFromEmpty}>
                        <img src={plus} alt="add your first note" />
                        <span>Add your first note</span>
                    </div>
                </div>
              ):(
                <div className="mainFrameFull">
                    {showSavePopup && <SavePopup handlePopupDontSave={this.handlePopupDontSave} handlePopupSave={this.handlePopupSave}/>}
                    <LeftContainer 
                    handlePlusClick={this.handlePlusClick}
                    notes={NOTES} 
                    currentId={currentId} 
                    onClick={this.handleNoteClick}
                    flagClick={this.flagClick}
                    edited={edited}
                    handleAddTag={this.handleAddTag}
                    handleTagDelete={this.handleTagDelete} 
                    allTags={TAGS} />
    
                    <RightContainer 
                    currentId={currentId} 
                    currentTitle={currentTitle}
                    currentContent={currentContent}
                    currentDate={currentDate}
                    currentTags={currentTags}
                    allTags={TAGS}
                    handleTitleChange={this.handleTitleChange}
                    handleContentChange={this.handleContentChange}
                    handleDelete={this.handleDelete}
                    handleSubmit={this.handleSubmit}
                    handleTagClick={this.handleTagClick}
                    edited={edited} />
                </div>
              )}
          </div>
        )
    }
}

export default MainFrame;
