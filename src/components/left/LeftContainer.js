import React, { Component } from 'react';
import LeftNote from './LeftNote';

import './LeftContainer.css';

function LeftTop({handlePlusClick, handleSearchChange, handleClearSearch, searchValue}) {
    return (
        <div className="leftTop">
            <div className="leftTopSearch">
                <input type="text" value={searchValue} onChange={(event) => handleSearchChange(event.target.value)} placeholder="Search..." maxLength="100"/>
                {searchValue.length > 0 && <div class="leftTopClearSearch" onClick={() => handleClearSearch()}><img src="icons/plus.svg" alt="clear search"/></div>}
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
            searchValue: ""
        }
    }

    handleSearchChange = (searchValue) => {
        this.setState({searchValue: searchValue});
    }

    handleClearSearch = () => {
        this.setState({searchValue: ""});
    }

    render() {
        const {handlePlusClick, notes, currentId, onClick, flagClick, edited} = this.props;
        const notesFiltered = notes.filter(note => {
            return note.title.toLowerCase().includes(this.state.searchValue.toLowerCase());
        });
        return (
        <div className={"leftFrame" + (edited ? " inEditing":"")}>
            <LeftTop 
            handlePlusClick={handlePlusClick} 
            handleSearchChange={this.handleSearchChange} 
            handleClearSearch={this.handleClearSearch} 
            searchValue={this.state.searchValue}/>
            <div class="leftNotesCt">
                {notesFiltered.length === 0 && <div className="searchNoResults">Sorry, no notes matches the search...</div>}

                {notesFiltered.map(note => (
                    <LeftNote 
                    key={note.id} 
                    id={note.id} 
                    important={note.important}
                    current={currentId === note.id} 
                    onClick={onClick}
                    noteTitle={note.title}
                    noteContent={note.content}
                    flagClick={flagClick}
                    />
                )).reverse()}
            </div>
        </div>
        )
    }
}

export default LeftContainer;