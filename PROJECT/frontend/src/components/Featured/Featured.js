import Expandable from '../ExpandableContent/Expandable';
import './Featured.css'


function Featured() {
  return (
    <div className="summary maincontent">
      <div className='canadianTour maincontent'>
        <h1>Canadian Tour</h1>
        <Expandable url={"tour"}/>
      </div>
      <div className='multicityTour maincontent'>
        <h1>Multi City Tour</h1>
        <Expandable url={"multi-city"}/>
      </div>
      <div className='multicityTour maincontent'>
        <h1>Popular</h1>
        <Expandable url={"popular"}/>
      </div>
    </div>
  );
}

export default Featured;