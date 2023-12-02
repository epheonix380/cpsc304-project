import './FeaturedCard.css'
// import Modal from "../Modal/Modal";
import React, {useState, useEffect} from "react";
import { Modal} from "antd";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ShowCard from '../ShowCard/ShowCard';

function FeaturedCard({show}) {

    const {eventid, type, eventname, author, description} = show;

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [content, setContent] = useState("");


    const showModal = () => {setIsModalOpen(true)};
    const handleCancel = () => {setIsModalOpen(false)};

    useEffect(()=>{
          fetch(`${process.env.REACT_APP_URL}/event/${eventid}`).then((res)=>{
              if (!res.ok) {
                  setIsError(true);
                }
                // console.log(response);
                res.json().then((res)=>{
                  const {data:__data} = res;
                  console.log(__data);
                  setData(__data);
                  setIsLoading(false);
                })
          })
  },[eventid])

  useEffect(()=>{
    const handleOk = () => {
      if (selected == null) {
        alert("Please select a show")
      } else {
        setContent(
          <ShowCard show={selected} modalOpen={true} onPurchase={()=>{
            setContent(<FeaturedCard show={show}/>)
          }}/>
        )
      }
    }

    const handleChange = (event) => {
      setSelected(event.target.value);
    }

    if (data.length>0) {
      console.log({data});
      setContent(
        <>
            <Modal title={eventname} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{author}</p>
                <p>{description}</p>
                <p>Select a Venue</p>
                <Select
                  onChange={handleChange}
                >
                  {data.map((res)=>{
                    return <MenuItem value={res}>{res.venuename} @ {res.starttime} in {res.city}</MenuItem>
                  })}
                </Select>
  
            </Modal>
            <div className="showcard" onClick={showModal}>
                <h3>{eventname}</h3>
                <p className="author">{author}</p>
                <p className="location">
                    {description}
                </p>
            </div>
        </>
  
    )
    }
  },[author, data, description, eventname, isModalOpen, selected, show])

  return content;
}

export default FeaturedCard;