import './User.css';
import React, { useEffect, useState } from "react";
import {Input, Space} from "antd";

export default function User() {
    const [user, setUser] = useState([{userid: 0, customername: '', city: '', password: ''}]);
    // refactor to add username
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    let name = "*John", city, username, password, userid;
    let newName, newCity, newUsername, newPassword;
    const [newUser, setNewUser] = useState([{userid: 0, customername: '', city: '', password: ''}]);
    // refactor to add username

    useEffect(()=>{
            fetch(`${process.env.REACT_APP_URL}/user/1`).then(
                (response) => {
                    response.json().then(
                        (jsonResponse) => {
                            const data = jsonResponse.data;
                            setUser(data);
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


    name = user[0].customername;
    city = user[0].city;
    username = 'username here';
    password = user[0].password;
    userid = user[0].userid;

    if (isLoading) {
        return <div className="maincontent">Loading...</div>;
    }

    if (isError) {
        return <div className="maincontent">Error: {isError}</div>;
    }

    const onChange = (e, type) => {
        if (type === "name") {
            newName = e;
        } else if (type === "city") {
            newCity = e;
        } else if (type === "username") {
            newUsername = e;
        } else if (type === "password") {
            newPassword = e;
        }
    }

    const onClick = (e) => {
        setNewUser({userid: userid, customername: newName, city: newCity, password: newPassword})
        // refactor to add username
        window.location.reload();
        console.log(e);
    }
    // TODO: handle for if username already exists in DB

    return (
        <div className="container">
            <h1> Welcome, {name}! Your userid is {userid}.</h1>

            <h3> Contact details: </h3>
            <p> City: {city} </p>
            <p> Username: {username} </p>
            <p> Password: {password} </p>

            <h3> Update contact details: </h3>
            <p> New Name: </p> <Space.Compact><Input showCount maxLength={30}
                                                     onChange={(e) => onChange(e, "name")} /></Space.Compact>
            <p> New City: </p> <Space.Compact><Input showCount maxLength={30}
                                                     onChange={(e) => onChange(e, "city")} /></Space.Compact>
            <p> New Username: </p> <Space.Compact><Input showCount maxLength={16}
                                                         onChange={(e) => onChange(e, "username")} /></Space.Compact>
            <p> New Password: </p> <Space.Compact><Input showCount maxLength={64}
                                                         onChange={(e) => onChange(e, "password")} /></Space.Compact>
            <p/>
            <button onClick={onClick}>UPDATE USER</button>
        </div>
    )
}