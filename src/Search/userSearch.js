import React, {useState, useEffect, useMemo} from 'react';
import {useDebounce} from 'use-debounce';
import './userSearch.css';
import { useAuth } from "../Provider/authProvider"; 
import Amount from '../Amount/amount';

function UserSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState(false);
    const [amountComponent, setAmountComponent] = useState(false);
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

    // const filteredData = searchResult.filter((value) => {
    //   return value.username.includes(searchQuery);
    // })

    const handleUserSelect = (user) => {
      setSelectedUser(user);
      setSearchQuery(user.username);
      setSearchResult([]);
    }

    // const clearSelectedUser = () => {
    //   setSelectedUser(null);
    //   setSearchQuery(''); // Clear search query when unselecting a user
    // };

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
          <div className={`amountSend ${selectedUser ? 'active' : ''}`}> <Amount /> 
          </div>
        )
      }

       </div>
    )
}

export default UserSearch;