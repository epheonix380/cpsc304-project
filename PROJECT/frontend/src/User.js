import './User.css';
import React, { useEffect, useState } from "react";
import {Input, Space} from "antd";

export default function User() {
    const [initUser, setInitUser] = useState({userid: 0, customername: '', city: '', password: ''});
    const [user, setUser] = useState({userid: 0, customername: '', city: '', password: ''});
    // refactor to add username
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // refactor to add username

    useEffect(()=>{
            fetch(`${process.env.REACT_APP_URL}/user/1`).then(
                (response) => {
                    response.json().then(
                        (jsonResponse) => {
                            const data = jsonResponse.data;
                            console.log(data);
                            setUser(data[0]);
                            setInitUser(data[0]);
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

    const onChange = (e, type) => {
        setUser({
            ...user,
            [type]:e.target.value,
        });
    }

    const onClick = async (e) => {
        await fetch(`${process.env.REACT_APP_URL}/update/user`,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(async (res)=>{
            console.log(res);
            const {success} = await res.json();
            console.log(success);
            if (success) {
                setInitUser(user);
                alert("Success!");
            } else {
                setUser(initUser);
                alert("Failure!");
            }
        })
    }
    // TODO: handle for if username already exists in DB

    return (
        <div className="container">
            <h1> Welcome, {initUser.customername}! Your userid is {initUser.userid}.</h1>

            <h3> Contact details: </h3>
            <p> City: {initUser.city} </p>
            <p> Username: {initUser.username} </p>
            <p> Password: {initUser.password} </p>

            <h3> Update contact details: </h3>
            <p> New Name: </p> <Space.Compact><Input value={user.customername} showCount maxLength={30}
                                                     onChange={(e) => onChange(e, "customername")} /></Space.Compact>
            <p> New City: </p> <Space.Compact><Input value={user.city} showCount maxLength={30}
                                                     onChange={(e) => onChange(e, "city")} /></Space.Compact>
            <p> New Username: </p> <Space.Compact><Input value={user.username} showCount maxLength={16}
                                                         onChange={(e) => onChange(e, "username")} /></Space.Compact>
            <p> New Password: </p> <Space.Compact><Input value={user.password} showCount maxLength={64}
                                                         onChange={(e) => onChange(e, "password")} /></Space.Compact>
            <p/>
            <button onClick={onClick}>UPDATE USER</button>
        </div>
    )
}