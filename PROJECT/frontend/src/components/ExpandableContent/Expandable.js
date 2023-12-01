import React, {useState} from "react"
import CircularProgress from '@mui/material/CircularProgress';

export default function Expandable(url) {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [subData, setSubData] = useState([]);




    if (isError) {
        return (<h1>An Error Occured {":("} </h1>)
    }
    if (isLoading) {
        return (<CircularProgress></CircularProgress>)
    }




    return (
        <div>

        </div>
    )

}