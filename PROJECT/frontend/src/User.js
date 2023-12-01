import './User.css';
import React, { useEffect, useState } from "react";
import {Input, Space} from "antd";
import SwitchUser from './components/SwitchUser/SwitchUser';

export default function User() {
    const [user, setUser] = useState([{userid: 1, customername: '', city: '', username: '', password: ''}]);
    const [userID, setUserID] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    let name, city, username, password, userid;

    name = user[0].customername;
    city = user[0].city;
    username = user[0].username;
    password = user[0].password;
    userid = user[0].userid;

    useEffect(()=>{
            fetch(`${process.env.REACT_APP_URL}/user/${userID}`).then(
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
    }, [userID])


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

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        const jsonResponse = await response.json();
        const data = jsonResponse.data
        console.log(data);
        return data;
      } catch(error){
            console.log(error);
      }    
  };


  const changeUser = async() => {
            const remainingUsers = await fetchUsers();
            const nextUser = remainingUsers[0];
            setUserID(nextUser.userid);
        };

    const handleDeleteUser = (e) => {
        if (userID === 1) {
            return;
        }
        const deleteUser = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_URL}/delete/${userID}`, {
                method: "DELETE"
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log(response);
            const jsonResponse = await response.json();
            const data = jsonResponse.data
                console.log(data);
            alert("User delete successful!")
          } catch(error){
            console.log(error);
          }
        };
        

        const deleteAndChangeUser = async() => {
            await deleteUser();
            await changeUser();
        }
        deleteAndChangeUser();
        
    }

    const handleUpdateUser = (e) => {
        const newUser = {customername: newName, city: newCity, username: newUsername, password: newPassword};
        console.log(userID);
        console.log(newUser);

        fetch(`${process.env.REACT_APP_URL}/update/${userID}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        }).then(
            (response) => {
                response.json().then(
                    (jsonResponse) => {
                        if (jsonResponse.data.error) {
                            if (jsonResponse.data.error ===
                                "SQLITE_CONSTRAINT: UNIQUE constraint failed: Customer.username") {
                                alert("You have entered a username that already exists! Please try again.")
                            } else if (jsonResponse.data.error === "Invalid name") {
                                alert("You have entered an invalid name! Please try again.")
                            } else if (jsonResponse.data.error === "Invalid city") {
                                alert("You have entered an invalid city! Please try again.")
                            } else if (jsonResponse.data.error === "Invalid username") {
                                alert("You have entered an invalid username! Please try again.")
                            } else if (jsonResponse.data.error === "Invalid password") {
                                alert("You have entered an invalid password! Please try again.")
                            } // lol pls refactor
                        }
                        alert("User update successful!")
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
    }

    const handleRefreshUser = () => {
        window.location.reload();
    }

    return (
        <div className="container">
            <a href="/" className="home">HOME</a>
            <h1> Welcome, {name}! Your userID is {userid}.</h1>

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
            <button onClick={handleUpdateUser}>UPDATE USER</button>
            <button onClick={handleDeleteUser}>DELETE USER</button>
            <button onClick={handleRefreshUser}>REFRESH USER</button>
            <SwitchUser userID={userID} setUserID={setUserID} />
        </div>
    )
}