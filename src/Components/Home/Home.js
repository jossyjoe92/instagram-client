import React, {useEffect} from 'react';
import Post from '../Post/Post'
import SideComponent from './SideComponent';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Home() {
  const [{user,showTopNav,showSearchUser}, dispatch ] = useStateValue ()

useEffect(() => {
  if(showTopNav===false){
    dispatch({
      type:actionTypes.Set_Top_Nav,
      showTopNav: true
  })
  }
  if(showSearchUser===false){
    dispatch({
      type:actionTypes.Set_Search_User,
      showSearchUser: true
  })
  }

  return () => {
    dispatch({
      type:actionTypes.Set_Search_User,
      showSearchUser: false
  })
  };
}, []);


  return (
    <div className="app_posts">
        <div className="app_postsLeft">
          <Post />
        </div>
        <div className="app_postsRight" >
          <SideComponent />
       </div>
      
    </div>
  );
}

export default Home;
