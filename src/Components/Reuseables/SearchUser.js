import React, {useState} from 'react';
import SearchIcon from "@material-ui/icons/Search"
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import './Reuseables.css'
import SideComponent from '../Home/SideComponent'
import Autosuggest from 'react-autosuggest';
import {Link} from 'react-router-dom'


function SearchUser({mobile}) {
  const [{user,showTopNav}, dispatch ] = useStateValue ()
  const [suggestions,setSuggestions]= useState([])
  const [search, setSearch]= useState('')

  const fetchUsers = (query) =>{
   
    fetch('https://citiwide.herokuapp.com/search-users',{
      method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    query
                })
            }).then(res=>res.json())
            .then(data=>{
             
                setSuggestions(data.user)
            }).catch(err=>{
                console.log(err)
            })
    
  }

  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;
   
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div className='suggestion_result'>
      <Link to={suggestion._id !==user._id ? `/profile/${suggestion._id}`:'/profile'}>
        <img src={suggestion.photo} className='suggestion_result_image' alt='' />
        {suggestion.name}
      </Link>
    </div>
  );
 const onSuggestionsFetchRequested = ({ value }) => {
    
  fetchUsers(value)
   
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  const  onSuggestionsClearRequested = () => {
    setSuggestions( [])
     
  };
 
 const onChange = (event, { newValue }) => {
   setSearch(newValue)
  };
  
 
  const inputProps = {
    placeholder: 'Search User',
    value:search,
    onChange: onChange
  };

  return  (
      
        

         <form >
            <SearchIcon className="searchUserIcon" />

            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
           
         </form>
        
     
    
  )
}

export default SearchUser;
