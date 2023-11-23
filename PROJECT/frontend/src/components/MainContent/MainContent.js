import './MainContent.css'
import sidebarLinks from '../../links.js'

function MainContent({selectedId}) {
  return (
    <div className="maincontent">
      {selectedId}
    </div>
  );
}

export default MainContent;