import React, {useState, useEffect, useMemo} from 'react';
import {useDebounce} from 'use-debounce';
import './userSearch.css';
import { useAuth } from "../Provider/authProvider"; 

function UserSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const {token} = useAuth();
    const memoizedToken = useMemo(() => token, [token]);
    console.log(memoizedToken)
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
    }, [debounceSearchQuery, fetchResults, token])

    return(
        <div className="search">
            <div className="searchInputs">
            <input
              type="text"
              placeholder="Search for a user"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
            {/* {isSearching && <p>Searching...</p>} */}
            {searchResult.length > 0 && (
        <div className="dataResults">
          <h2>Search Results:</h2>
          <ul>
            {searchResult.map((user) => (
              <li>{user.username}</li>
            ))}
          </ul>
        </div>
      )}

       </div>
    )
}

export default UserSearch;