import './User.css';
import React, { useEffect, useState } from "react";
import {Input, Space} from "antd";
import SwitchUser from './components/SwitchUser/SwitchUser';

export default function User() {
    const [initUser, setInitUser] = useState({userid: 0, customername: '', city: '', password: ''});
    const [user, setUser] = useState({userid: 1, customername: '', city: '', username: '', password: ''});
    const [userID, setUserID] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);


    useEffect(()=>{
            fetch(`${process.env.REACT_APP_URL}/user/${userID}`).then(
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
    }, [userID])



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
            alert("User delete failed! Please try again.")
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

        fetch(`${process.env.REACT_APP_URL}/update/${userID}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
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
                            setUser(initUser)
                        } else {
                            alert("User update successful!")
                            setInitUser(user);
                            setIsLoading(false);
                        }
                        
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
                        alert("User update successful!")
                        
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

    return (
        <div className="container">
            <a href="/" className="home">HOME</a>
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
            <button onClick={handleUpdateUser}>UPDATE USER</button>
            <button onClick={handleDeleteUser}>DELETE USER</button>
            <button onClick={handleRefreshUser}>REFRESH USER</button>
            <SwitchUser userID={userID} setUserID={setUserID} />
        </div>
    )
}