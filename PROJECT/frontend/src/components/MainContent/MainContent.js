import './MainContent.css'
import sidebarLinks from '../../links.js'
import Shows from '../Shows/Shows.js'
import Summary from '../Summary/Summary.js'
import BuyTickets from '../BuyTickets/BuyTickets.js'

function MainContent({selectedId}) {

  const title = sidebarLinks[selectedId].title;

  if (title == "SHOWS"){
    return <Shows /> 
  } else if (title == "BUY TICKETS") {
    return <BuyTickets />
  } else if (title == "SUMMARY") {
    return <Summary />
  } else {
    <div className="maincontent">Page not found</div>
  }

}

export default MainContent;