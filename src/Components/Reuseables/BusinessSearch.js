import React, {useState} from 'react';
import SearchIcon from "@material-ui/icons/Search"
import './Reuseables.css'
import Autosuggest from 'react-autosuggest';
import {Link} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';

function BusinessSearch({service}) {

  const [{user,showTopNav}, dispatch ] = useStateValue ()
 
  const [suggestions,setSuggestions]= useState([])
  const [search, setSearch]= useState('')

  const fetchUsers = (query) =>{
   if(!service){
    fetch('https://citiwide.herokuapp.com/search/Product',{
      method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    query
                    
                })
            }).then(res=>res.json())
            .then(data=>{
          
                setSuggestions(data.post)
            }).catch(err=>{
                console.log(err)
            })
    
   }else{
    fetch('https://citiwide.herokuapp.com/search/Service',{
      method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    query
                    
                })
            }).then(res=>res.json())
            .then(data=>{
             
                setSuggestions(data.post)
            }).catch(err=>{
                console.log(err)
            })
    

   }
 
  }

  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.title;
   
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div className='suggestion_result'>
      <Link to={`/viewproduct/${suggestion._id}`}>
        {suggestion.title}
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
  
 
  const ProductInputProps = {
    placeholder: 'Search Product e.g Samsung tv',
    value:search,
    onChange: onChange
  };

  const ServiceInputProps = {
    placeholder: 'Search Services e.g Hotel name',
    value:search,
    onChange: onChange
  };
  return (
 
        <div className="search">
            <form >
           
      {
        service?<Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={ServiceInputProps}
      />:
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={ProductInputProps}
            />
      }
            
           
         </form>
            <SearchIcon className="searchIcon" />
        </div>
  );
}

export default BusinessSearch;
