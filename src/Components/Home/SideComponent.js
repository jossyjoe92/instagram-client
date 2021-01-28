import React, {useState,useRef, useEffect} from 'react'
import { useStateValue } from '../../StateProvider';
import Footer from '../Reuseables/Footer'
import './SideComponent.css'
import {Link,useHistory} from 'react-router-dom'
import { actionTypes } from '../../reducer';
function SideComponent() {
    const [{user}, dispatch ] = useStateValue ()
    const [suggestedUsers,setSuggestedUser] = useState([])
    const [foundUser, setFoundUser] = useState([])
    const [open, setOpen] = useState(false);
    
   
    useEffect(() => {
      
       
       fetch('https://citiwide.herokuapp.com/users',{
           headers:{
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
     
          setSuggestedUser(result.users)
           
       }).catch(err=>{
           console.log(err)
       })
    }, [])

    const followUser=(id)=>{
        fetch('https://citiwide.herokuapp.com/follow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              followId:id
               
            })
            }) 
            .then(res=>res.json())
           .then(result =>{
            
            localStorage.setItem("user",JSON.stringify(result))
            dispatch({
                type:actionTypes.Set_USER,
                user: result
            })
         
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }

    const unFollowUser=(id)=>{
        fetch('https://citiwide.herokuapp.com/unfollow',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              unfollowId:id
               
            })
            }) 
            .then(res=>res.json())
           .then(result =>{
            
            localStorage.setItem("user",JSON.stringify(result))
            dispatch({
                type:actionTypes.Set_USER,
                user: result
            })

            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
     

    const findUser = (userId)=>{
        
           
                fetch(`https://citiwide.herokuapp.com/user/${userId}`,{
                    headers:{
                     "Authorization":"Bearer "+ localStorage.getItem("jwt")
                    }
                }).then(res=>res.json())
                .then(result=>{
                    
                        
                   setFoundUser(result)
                
                }).catch(err=>{
                    console.log(err)
                })
    
    }
    

    return (
        <>
            <div className='home_user_profile'>
                <Link to={'/profile'}>
                    <img src={user?.photo} alt={user?.name} />
                </Link>
                <div className='home_userInfo'>
                    <h6><strong>{user?.email}</strong></h6>
                    <h6>{user?.name}</h6>   
                </div>
                <p><strong>Switch</strong></p>
            </div>
            <div className='home_suggestedUsers'>
                <div className='home_sugUserHeader'>
                    <h4>Suggestions for you</h4>
                </div>
            {suggestedUsers.filter(users=>users._id !== user._id).map(sugUser=>{
                return(
                   
                    <div className='sugUser_profile' key={sugUser._id}>
                        <Link to={`/profile/${sugUser._id}`}>
                            <img src={sugUser?.photo} alt={sugUser?.name} />
                        </Link>
                        <div className='home_userInfo'>
                            <h6><strong>{sugUser?.email}</strong></h6>
                            <h6 className='sugesstedForYou'>suggested for you</h6>   
                        </div>
                        {user.following.includes(sugUser._id)?<p onClick={()=>unFollowUser(sugUser._id)}><strong>Following</strong></p>:
                        <p onClick={()=>followUser(sugUser._id)}><strong>Follow</strong></p>
                        
                        }
                    </div>
                   
                   )
                 })
             }
            </div>

          
        <Footer />
            
        </>
    )
}

export default SideComponent
