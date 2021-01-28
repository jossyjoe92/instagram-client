import React, {useEffect,useState,useRef} from 'react'
import { useStateValue } from '../../StateProvider';
import {useParams} from 'react-router-dom'
import { actionTypes } from '../../reducer';
import PostGallery from '../Reuseables/PostGallery';
import Footer from '../Reuseables/Footer'
import './Profile.css'
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

function Profile() {
    const [{user}, dispatch ] = useStateValue ()
    const [profile, setProfile] = useState([])
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)
    const [postData, setPostData] = useState([])
    const {id} = useParams()
    const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)
   

    useEffect(() => {

        fetch(`https://citiwide.herokuapp.com/user/${id}`,{
         
             headers:{
              "Authorization":"Bearer "+ localStorage.getItem("jwt")
             }
         }).then(res=>res.json())
         .then(result=>{
          //console.log(result)
            setProfile(result)
             
         }).catch(err=>{
             console.log(err)
         }) 
        
     }, [])

    const followUser=()=>{
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
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,result._id]
                    }
                }
            })
            setShowFollow(false)
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }

    const unFollowUser=()=>{
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
            setProfile((prevState)=>{
                const newFollowers = prevState.user.followers.filter(item=>item !== result._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollowers
                    }
                }
            })
            setShowFollow(true)
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }

    const postBlur = (itemId)=> {
        setTimeout(function(){
        setBlurId(itemId)
        setImageBlur(true)
        }, 200)
    }

    
           
        
    return (
        <div className='profile' >
            <div className='profile_top'>
                <div className='profile_image'>
                    <img 
                    src={profile.user?.photo}
                    alt=''/>
                </div>
                <div className='profile_details'>
                    <h3>{profile.user?.name}</h3>
                    <h4>{profile.user?.email}</h4>
                    <div className='profile_details_stats'>
                        <h4>{profile.posts?.length} posts</h4>
                        <h4>{profile.user?.followers.length} followers</h4>
                        <h4>{profile.user?.following.length} following</h4>
                    </div>
                    <p>{profile.user?.about}</p>
                    <div className='follow_button'>
                    {showFollow? 
                        <Button 
                            fullWidth
                            variant="contained"
                            color="primary"
                            //className={classes.button}
                            onClick={followUser} 
                        >follow</Button> 
                  :  <Button 
                            fullWidth
                            variant="contained"
                            color="primary"
                            //className={classes.button}
                            onClick={unFollowUser}
                        >unfollow</Button> }
                    </div>
                </div>
            </div>

            <div className='gallery'>
            <Hidden mdUp>
                <div className='business_gallery_header'>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        posts by {profile.user?.name}
                    </Typography>
                </div>
                <PostGallery 
                    mobile={true}
                    profile={true}
                    postData={postData}
                    postBlur={postBlur}
                    blurId={blurId}
                    imageBlur={imageBlur}
                    setImageBlur={setImageBlur}
                    userPosts={profile.posts}
                    />
            </Hidden>
            <Hidden smDown>
                <div className='business_gallery_header'>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        posts by {profile.user?.name}
                    </Typography>
                </div>
            <PostGallery 
                postData={postData}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={profile.posts}
                />
                </Hidden>
            </div>
            {/*
                    <div id="modal3" className="modal" ref={postModal}  >
                    <PostModal
                    postData={postData}
                    setPostData={setPostData} />
                    </div>

            */}
           
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
