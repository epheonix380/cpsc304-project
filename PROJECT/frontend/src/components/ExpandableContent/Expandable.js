import React, {useEffect, useState} from "react"
import CircularProgress from '@mui/material/CircularProgress';
import FeaturedCard from "../FeaturedCard/FeaturedCard";

export default function Expandable(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);


    useEffect(()=>{
        fetch(`${process.env.REACT_APP_URL}/${props.url}`).then((res)=>{
            console.log(`${process.env.REACT_APP_URL}/${props.url}`)
            if (!res.ok) {
                setIsError(true);
              }
              // console.log(response);
              res.json().then((res)=>{
                const {data:__data} = res;
                console.log(__data)
                setData(__data);
                setIsLoading(false);
              })
        })
    },[props])

    if (isError) {
        return (<h1>An Error Occured {":("} </h1>)
    }
    if (isLoading) {
        return (<CircularProgress></CircularProgress>)
    }
    console.log({data});
    return (
        <div className="carosel">
            {data.map((res)=>(<FeaturedCard show={res}/>))}
        </div>
    )

}