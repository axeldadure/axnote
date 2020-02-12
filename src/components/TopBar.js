import React from 'react';
import git from '../icons/git.svg'
import './TopBar.css';

function TopBar() {
  return (
    <div className="topBar">
      <div className="topBarLeft">axNote <span>v1.0</span></div>
      <div className="topBarRight">
        <a href="http://axeldadure.com/" target="_blank" rel="noopener noreferrer">a simple ReactJS app made by Axel Dadure</a>
        <a href="https://github.com/axeldadure/axnote" target="_blank" className="lienGit" rel="noopener noreferrer"><img src={git} alt="git icon"/></a>
      </div>
    </div>
  )
}

export default TopBar;