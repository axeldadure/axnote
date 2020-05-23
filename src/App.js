import React, {useState} from 'react';
import TopBar from './components/TopBar';
import MainFrame from './components/MainFrame';

import './App.css';

function App() {

  const [popupMobile, setPopup] = useState(true);

  return (
    <div>
      {popupMobile && (
      <div className="popUpMobile">
        <div className="popUpMobileIn">
          <span>This site is made for bigger screen.<br />Your screen is too small, please open this app on a computer</span>
          {/* <div className="popUpOkay" onClick={() => setPopup(false)}>Okay</div> */}
        </div>
      </div>)}
      <TopBar />
      <MainFrame />
    </div>
  )
}

export default App;
