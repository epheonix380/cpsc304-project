import './MainContent.css'
import sidebarLinks from '../../links.js'
import Shows from '../Shows/Shows.js'
import Summary from '../Summary/Summary.js'
import MyTickets from '../MyTickets/MyTickets.js'

function MainContent({selectedId}) {

  const title = sidebarLinks[selectedId].title;

  if (title === "SHOWS"){
    return <Shows /> 
  } else if (title === "MY TICKETS") {
    return <MyTickets />
  } else if (title === "SUMMARY") {
    return <Summary />
  } else {
    <div className="maincontent">Page not found</div>
  }

}

export default MainContent;