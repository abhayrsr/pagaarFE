import React, {useState, useEffect} from 'react';
import './dashboard.css';
import { useAuth } from "../Provider/authProvider"; 
import jwt from 'jsonwebtoken';
import Send from '../Send/sendMoney';
import UserSearch from '../Search/userSearch';

var picture = require('./user.png');

window.onbeforeunload = function() {
    localStorage.clear();
 }

function Dashboard(){
    const{token} = useAuth();
    const [userData, setUserData] = useState({username: null, balance: null});
    const [searchComponent, setSearchComponent] = useState(false);

    const handleClick = () => {
        setSearchComponent(true);
    }
   
    useEffect(() => {
        if(token){
            const decodeToken = jwt.decode(token);
            setUserData({
                username: decodeToken.username,
                balance: decodeToken.balance
            })
        }
    }, [token]);

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
                <Send />
            </div>
            {searchComponent && (<div className="search">
                <UserSearch />
            </div>)}
            

        </div>
    )
}

export default Dashboard;