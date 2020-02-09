import React from 'react';

import './SavePopup.css';

function SavePopup({handlePopupDontSave, handlePopupSave}) {
  return (
    <div className="savePopupCt">
        <div className="savePopupIn">
            <span className="savePopupTitle">You did not save the changes to your note, do you wish to save it ?</span>
            <div className="savePopupBtns">
                <button className="savePopupBtnNo" onClick={() => handlePopupDontSave()}>No, thanks</button>
                <button className="savePopupBtnYes" onClick={() => handlePopupSave()}>Yes, save</button>
            </div>
        </div>
    </div>
  )
}

export default SavePopup;