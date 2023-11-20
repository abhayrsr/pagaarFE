import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import './dashboard.css';
import { useAuth } from "../Provider/authProvider"; 
import jwt from 'jsonwebtoken';
import Send from '../Send/sendMoney';
import UserSearch from '../Search/userSearch';

var picture = require('./user.png');

function Dashboard(){
    const{token, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({username: null, balance: null});
    const [searchComponent, setSearchComponent] = useState(false);
  

    const handleClick = () => {
        setSearchComponent(!searchComponent);
    }
   
    useEffect(() => {
      if (!isAuthenticated) {
        console.log("x")
        return;
      }

        if(token){
            const decodeToken = jwt.decode(token);
            setUserData({
                username: decodeToken.username,
                balance: decodeToken.balance
            })
        }

        const handleBeforeUnload = () => {
            localStorage.clear();
          };
      
          window.addEventListener('beforeunload', handleBeforeUnload);
      
          return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
          };
        
    }, [token, isAuthenticated, navigate]);

    return(
        <div className="dashboard">
            <div className="title">
                <h2>Hello,</h2>
                <h1>{userData.username}</h1>
            </div>

            <div className="profile">
                <img className="profilePicture" src={picture} alt = "profilePhoto"/>
            </div>

            <div className="balance">
                <div className="amount">
                    <h2>${userData.balance}</h2>
                </div>
                <div className="total">
                    <h3>Total Balance</h3>
                </div>

            </div>
            <div className="sendButton" onClick={handleClick}>
               {searchComponent ? <button>unsend</button> :<Send />}
            </div>
            {searchComponent && (<div className="search">
                <UserSearch />
            </div>)}

        </div>
    )
}

export default Dashboard;