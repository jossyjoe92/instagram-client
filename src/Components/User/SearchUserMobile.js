import React from 'react';
import SearchUser from '../Reuseables/SearchUser'
import SideComponent from '../Home/SideComponent'
import './User.css'


function SearchUserMobile() {
  return (
  <div className='searchUser'>
     <div className='searchUser_form'>
          <SearchUser mobile={true} />
      </div>
        

        <div className='searchUser_suggestions'>
            <SideComponent />
            
        </div>
       
      </div>
  );
}

export default SearchUserMobile;
