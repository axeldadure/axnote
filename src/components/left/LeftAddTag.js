import React, { Component } from 'react';

import './LeftAddTag.css';

class LeftAddTag extends Component {  
  constructor(props) {
        super(props);
        this.state = {
            tagValue: ''
        };
  }

  handleAddTag = (e) => {
    e.preventDefault();
    if (this.state.tagValue.length>0) {
        this.props.handleAddTag(this.state.tagValue);
        this.setState({tagValue: ""});
    }
  }

  handleChange = (event) => {
    this.setState({tagValue: (event.target.value).toLowerCase()});
  }

  render () {
    return (
        <div className="leftTopAddTag">
            <form onSubmit={this.handleAddTag}>
                <input type="text" className="leftTopAddTagTxt"
                value={this.state.tagValue} 
                onChange={this.handleChange} 
                placeholder="Add tag..." 
                maxLength="15"/>
                <div className={"leftTopAddTagSub" + (this.state.tagValue.length===0? " submitOff":"")}>
                    <input type="submit" value=""  />
                </div>
            </form>
        </div>
    )
  }
}

export default LeftAddTag;