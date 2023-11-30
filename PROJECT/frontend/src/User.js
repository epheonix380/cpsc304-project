import './User.css';
import React, { useEffect, useState } from "react";
import {Input, Space} from "antd";

export default function User() {
    const [user, setUser] = useState([{customername: '', city: '', username: '', password: ''}]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    let name, city, username, password, userid;

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
    username = user[0].username;
    password = user[0].password;
    userid = user[0].userid;

    let newName = name, newCity = city, newUsername = username, newPassword = password;

    if (isLoading) {
        return <div className="maincontent">Loading...</div>;
    }

    if (isError) {
        return <div className="maincontent">Error: {isError}</div>;
    }

    const onChange = (e, type) => {
        const value = e.target.value;
        if (type === "name") {
            newName = value;
        } else if (type === "city") {
            newCity = value;
        } else if (type === "username") {
            newUsername = value;
        } else if (type === "password") {
            newPassword = value;
        }
    }

    const onClick = (e) => {
        const newUser = {customername: newName, city: newCity, username: newUsername, password: newPassword};

        fetch(`${process.env.REACT_APP_URL}/update/1`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        }).then(
            (response) => {
                response.json().then(
                    (jsonResponse) => {
                        console.log(jsonResponse);
                        if (jsonResponse.data.error &&
                            jsonResponse.data.error ===
                            "SQLITE_CONSTRAINT: UNIQUE constraint failed: Customer.username") {
                            alert("You have entered a username that already exists! Please try again.")
                        }
                        setIsLoading(false);
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
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
        setTimeout(10000);
        window.location.reload();
    }

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