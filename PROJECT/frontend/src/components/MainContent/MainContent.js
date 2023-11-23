import './MainContent.css'
import sidebarLinks from '../../links.js'
import Shows from '../Shows/Shows.js'

function MainContent({selectedId}) {

  const title = sidebarLinks[selectedId].title;

  if (title == "SHOWS"){
    return <Shows /> 
  } else {
    return <div className="maincontent">{selectedId}</div>
  }

}

export default MainContent;