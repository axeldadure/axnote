import React, { Component } from 'react';
import RightTop from './RightTop';

import './RightContainer.css';

class RightContainer extends Component {
  render () {
    const {
      currentId,
      currentTitle, 
      currentContent,
      handleTitleChange, 
      handleContentChange,
      handleDelete,
      handleSubmit,
      edited} = this.props
    return (
      <div className="rightFrame">
        <form onSubmit={(event) => handleSubmit(event)}>
          <RightTop currentId={currentId} handleDelete={handleDelete}/>
          <div className="rightTextCt">
              <div className="rightTextFlex">
                <div className="rightTextInput">
                  <input value={currentTitle} onChange={(event) => handleTitleChange(event.target.value)} placeholder="Your note's title" maxLength="70"/>
                </div>

                <div className="rightTextTextarea">
                  <textarea value={currentContent} onChange={(event) => handleContentChange(event.target.value)} placeholder="Your note's content"/>
                </div>
              </div>
          </div>
          
          <div className={"rightSave" + (edited ? "" : " off")}>
                <input type="submit" value="" />
              </div>
        </form>
      </div>
    )
  }
}

export default RightContainer;