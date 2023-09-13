import React, {useState, useEffect} from 'react';
import {useDebounce} from 'use-debounce';
import './userSearch.css';
import { useAuth } from "../Provider/authProvider"; 

function UserSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [debounceSearchQuery] = useDebounce(searchQuery, 2000);
    const {token} = useAuth();
    console.log(token)
    const fetchResults = async() => {
        try{
            setIsSearching(true);
            const request = await fetch("http://localhost:3000/users/search?username=${debounceSearchQuery}", {
                method: 'GET',
                headers: {
                   'Authorization': `Bearer ${token}`
                },
            });
            console.log(request.headers);
            if (request.ok) {
                const data = await request.json();
                setSearchResult(data.username);
              } else {
                console.error(`Error fetching user data. Status: ${request.status}`);
              }
            } catch (error) {
              console.error('Error:', error);
            } finally {
              setIsSearching(false);
            }
        }

    useEffect(() => {
        if(debounceSearchQuery.trim() != ''){
            fetchResults();
        } else {
            setSearchResult([]);
        }
    }, [debounceSearchQuery])

    console.log(debounceSearchQuery)

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
        </div>
    )
}

export default UserSearch;