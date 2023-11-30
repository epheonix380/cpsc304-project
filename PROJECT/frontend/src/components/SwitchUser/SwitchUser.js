import './SwitchUser.css'
import React, {useEffect, useState} from "react";
import {Modal, Select} from "antd";

function SwitchUser({user, setUser}) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    let chosenUser = user;

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_URL}/users`).then(
            (response) => {
                response.json().then(
                    (jsonResponse) => {
                        const data = jsonResponse.data;
                        setUsers(data);
                        setIsLoading(false);
                    }
                ).catch(
                    (err)=>{
                        setIsError(true)
                    }
                )

            }
        ).catch(
            (err)=>{
                console.log(err);
                setIsError(true)
            }
        )
    }, [])

    if (isLoading) {
        return <div className="maincontent">Loading...</div>;
    }

    if (isError) {
        return <div className="maincontent">Error: {isError}</div>;
    }

    const handleUserUpdate = (userid) => {
        chosenUser = users.find((u) => u.userid === userid);
    }

    return (
        <div>
            <h1>Would you like to switch to another user?</h1>
                <Select
                    options={users.map((u) => {
                        return {value: u.userid, label: `${u.userid}: ${u.customername}`};
                    })}
                    placeholder={"Choose an option"}
                    onChange={handleUserUpdate}
                />
                <button onClick={(e) => console.log(chosenUser)} id="switch-user">SWITCH USER</button>
        </div>
    );
}

export default SwitchUser;