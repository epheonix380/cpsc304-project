import './App.css';
import MainContent from './components/MainContent/MainContent.js';
import Navbar from './components/Navbar/Navbar.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import { useState } from 'react'
import sidebarLinks from './links.js'

function App() {

  const [selectedId, setSelectedId] = useState(sidebarLinks[0].id);

  function handleClick(e, id){
    setSelectedId(id);
  }


  return (
    <div className="App">
      <Navbar />
      <div className="not-navbar">
        <Sidebar links={sidebarLinks} onLinkClick={handleClick}/>
        <MainContent selectedId={selectedId}/>
      </div>
    </div>
  );
}

export default App;
