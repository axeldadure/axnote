import React, { Component } from 'react';
import _ from 'underscore'
import LeftNote from './LeftNote';
import Notes from '../../data/Notes.json';

import './LeftContainer.css';

function LeftTop({handlePlusClick, handleSearchChange, handleClearSearch, searchValue, tagsValue, handleTagsChange}) {
    return (
        <div className="leftTop">
            <div className="leftTopTags">
                <div className="leftTopTagsClick"></div>
                <div className="leftTopTagsCt">
                    <select value={tagsValue} onClick={(event) => handleTagsChange(event.target.value)} multiple={true}>
                        {Notes.tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.tagName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="leftTopSearch">
                <input type="text" value={searchValue} onChange={(event) => handleSearchChange(event.target.value)} placeholder="Search..." maxLength="100"/>
                {searchValue.length > 0 && <div className="leftTopClearSearch" onClick={() => handleClearSearch()}><img src="icons/plus.svg" alt="clear search"/></div>}
            </div>
            <div className="leftTopPlus" onClick={() => handlePlusClick()}>
                <img src="icons/plus.svg" alt="add note"/> 
            </div>
        </div>
    )
}

class LeftContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tagsValue: [1,2,3,4],
            searchValue: "",
        }
    }

    handleSearchChange = (searchValue) => {
        this.setState({searchValue: searchValue});
    }

    handleClearSearch = () => {
        this.setState({searchValue: ""});
    }

    handleTagsChange = (value) => {
        const parsedValue = parseInt(value)
        this.setState(prevState => {
            if(prevState.tagsValue.includes(parsedValue)) {
              return { tagsValue: prevState.tagsValue.filter(item => item !== parsedValue) };
            }
            return { tagsValue: [...prevState.tagsValue, parsedValue] };
          })
    }

    render() {
        const {handlePlusClick, notes, currentId, onClick, flagClick, edited} = this.props;

        const notesByTag = notes.filter(note => (note.tags.reduce((result, current) => {
            return this.state.tagsValue.includes(current) || result;
          }, false)) || note.tags.length===0);

        const notesBySearchTag = notesByTag.filter(note => {
            return note.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
        });

        return (
        <div className={"leftFrame" + (edited ? " inEditing":"")}>
            <LeftTop 
            handlePlusClick={handlePlusClick} 
            handleSearchChange={this.handleSearchChange} 
            handleClearSearch={this.handleClearSearch} 
            searchValue={this.state.searchValue}
            tagsValue={this.state.tagsValue}
            handleTagsChange={this.handleTagsChange}/>

            <div className="leftNotesCt">
                {notesBySearchTag.length === 0 && <div className="searchNoResults">Sorry, no notes matches the search...</div>}

                {notesBySearchTag.map(note => (
                    <LeftNote 
                    key={note.id} 
                    id={note.id} 
                    important={note.important}
                    current={currentId === note.id} 
                    onClick={onClick}
                    noteTitle={note.title}
                    noteContent={note.content}
                    noteTags={note.tags}
                    flagClick={flagClick}
                    />
                )).reverse()}
            </div>
        </div>
        )
    }
}

export default LeftContainer;