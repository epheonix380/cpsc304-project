import './MainContent.css'
import sidebarLinks from '../../links.js'
import Shows from '../Shows/Shows.js'
import Featured from '../Featured/Featured.js'
import MyTickets from '../MyTickets/MyTickets.js'

function MainContent({selectedId}) {

  const title = sidebarLinks[selectedId].title;

  if (title === "SHOWS"){
    return <Shows /> 
  } else if (title === "MY TICKETS") {
    return <MyTickets />
  } else if (title === "FEATURED") {
    return <Featured />
  } else {
    <div className="maincontent">Page not found</div>
  }

}

export default MainContent;