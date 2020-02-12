import React, { Component, useState } from 'react';
import LeftNote from './LeftNote';
import LeftAddTag from './LeftAddTag';

import './LeftContainer.css';

function LeftTop({handlePlusClick, handleSearchChange, handleClearSearch, searchValue, tagsValue, handleTagClick, handleAddTag, handleTagDelete, allTags}) {

    const [tagsOpened, setTagsOpened] = useState(false);

    return (
        <div className="leftTop">
            <div className="leftTopTags">
                <div className="leftTopTagsClick" onClick={() => setTagsOpened(!tagsOpened)}>
                    <img src="/icons/tag.svg" alt="tag icon"/>
                </div>
                <div className={"leftTopTagsCt" + (tagsOpened ? " tagsOpened":"")}>
                    {allTags.map(tag => (
                        <div className={"leftTopTagCt" + (tagsValue.includes(tag.id) ? " tagOn" : "")} 
                        key={tag.id} 
                        onClick={() => handleTagClick(tag.id)}
                        value={tag.id}><span>{tag.tagName}</span>
                        <div className="leftTopTagCtDelete" onClick={(e) => handleTagDelete(tag.id, e)}></div>
                        </div>
                    ))}
                    <LeftAddTag handleAddTag={handleAddTag} />
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

    handleTagClick = (value) => {
        const parsedValue = parseInt(value)
        this.setState(prevState => {
            if(prevState.tagsValue.includes(parsedValue)) {
              return { tagsValue: prevState.tagsValue.filter(item => item !== parsedValue) };
            }
            return { tagsValue: [...prevState.tagsValue, parsedValue] };
          })
    }

    render() {
        const {handlePlusClick, notes, currentId, onClick, flagClick, edited, handleAddTag, handleTagDelete, allTags} = this.props;

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
            handleTagClick={this.handleTagClick}
            handleAddTag={handleAddTag}
            handleTagDelete={handleTagDelete}
            allTags={allTags} />

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