import React, {useState, useEffect, useMemo} from 'react';
import {useDebounce} from 'use-debounce';
import './userSearch.css';
import { useAuth } from "../Provider/authProvider"; 
import Amount from '../Amount/amount';
import jwt from "jsonwebtoken";

function UserSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState(false);
    const [amountComponent, setAmountComponent] = useState(false);
    const [senderName, setSenderName] = useState('')
    const {token} = useAuth();
    const memoizedToken = useMemo(() => token, [token]);
    const handleClick = () => {
      setAmountComponent(true)
    }
    const fetchResults = async() => {
        try{
            
            const request = await fetch(`http://localhost:3000/users/search?username=${debounceSearchQuery}`, {
                method: 'GET',
                headers: {
                   'Authorization': `Bearer ${memoizedToken}`
                },
            });
          
            if (request.ok) {
                const data = await request.json();
                setSearchResult(data.users);
              } else {
                console.error(`Error fetching user data. Status: ${request.status}`);
              }
            } catch (error) {
              console.error('Error:', error);
            } finally {
              setIsSearching(false);
            }
        }
    const [debounceSearchQuery] = useDebounce(searchQuery, 300);

    useEffect(() => {
        if(debounceSearchQuery.trim() !== ''){
            setIsSearching(true);
            fetchResults();
        } else {
            setSearchResult([]);
        }
    }, [debounceSearchQuery, memoizedToken])

    const handleFilter = (e) => {
      const searchWord = e.target.value;
      setSearchQuery(searchWord)
    }

    const handleUserSelect = (user) => {
      setSelectedUser(user);
      setSearchQuery(user.username);
      setSearchResult([]);
    }

    const handleCancel = () => {
      setSearchQuery('');
      setSearchResult([]);
      setSelectedUser(false);
      setAmountComponent(false);
    }

    useEffect(() => {
      if(token){
        const decodeToken = jwt.decode(token);
        setSenderName({
          username: decodeToken.username
        })
      }
    }, [token])

    return(
        <div className="search">
            <div className="searchInputs">
            <input
              type="text"
              placeholder="Search for a user"
              value={searchQuery}
              onChange={handleFilter}
            />
            </div>
            {(searchQuery.trim() !== '' || selectedUser) && (
        <div className="dataResult">
          <ul>
            {searchResult.map((user) => (
              <li className='dataItem' onClick={()=>{handleUserSelect(user)}}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
      {
        selectedUser && (
          <div className={`selectedUser ${selectedUser ? '' : 'active'}`} onClick={handleClick}>
            
          </div>
        )
      }

      {
        selectedUser && (
          <div className={`amountSend ${selectedUser ? 'active' : ''}`}> 
          <Amount senderName={senderName.username} receiverName={selectedUser.username}/> 
          </div>
        )
      }

      {
        selectedUser && (
          <button className="cancel"> 
          <i className="material-symbols-outlined" onClick={handleCancel}>
            cancel
          </i>
          </button>
        )
      }

       </div>
    )
}

export default UserSearch;