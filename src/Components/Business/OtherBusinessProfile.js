import React, {useEffect,useState} from 'react'
import { useStateValue } from '../../StateProvider';
import {useParams} from 'react-router-dom'
import { actionTypes } from '../../reducer';
import PostGallery from '../Reuseables/PostGallery'
import Button from '@material-ui/core/Button';
import Footer from '../Reuseables/Footer'
import MobileDisplayCard from '../Reuseables/MobileDisplayCard';
import LargeScreenDisplayCard from '../Reuseables/LargeScreenDisplayCard';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

function OtherBusinessProfile() {
    const [{user}, dispatch ] = useStateValue ()
    const [profile, setProfile] = useState([])
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)

    const {id} = useParams()
    const[showFollow, setShowFollow]= useState(user?!user.businessSubscribed?.includes(id):true)
   

    useEffect(() => {
      
        fetch(`https://citiwide.herokuapp.com/business/${id}`,{
         
             headers:{
              "Authorization":"Bearer "+ localStorage.getItem("jwt")
             }
         }).then(res=>res.json())
         .then(result=>{
             console.log(result)
            setProfile(result)
             
         }).catch(err=>{
             console.log(err)
         }) 
        
     }, [])

    const subscribeBusiness=()=>{
        fetch('https://citiwide.herokuapp.com/subscribe',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              subscribeId:id
               
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
                   business:{
                       ...prevState.business,
                        subscribers:[...prevState.business.subscribers,result._id]
                    }
                }
            })
            setShowFollow(false)
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }

    const unSubscribeBusiness=()=>{
        fetch('https://citiwide.herokuapp.com/unsubscribe',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unsubscribeId:id
               
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
                const newFollowers = prevState.business.subscribers.filter(item=>item !== result._id)
                return {
                    ...prevState,
                    business:{
                        ...prevState.business,
                        subscribers:newFollowers
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
        <div className='business_profile' >
            
            <div className='business_profile_top'>
                <div className='business_profile_image'>
                    <img 
                    src={profile.business?.photo}
                    alt=''/>
                </div>
                <div className='profile_details'>
                    <h3>{profile.business?.name}</h3>
                    <h4>{profile.business?.email}</h4>
                    <h4>{profile.business?.address}</h4>
                    <h4>{profile.business?.phone}</h4>
                    <h4>{profile.business?.description}</h4>
                   <div className='profile_details_stats'>
                        <h4>{profile.posts?.length} posts</h4>
                        <h4>{profile.business?.subscribers.length} subscribers</h4>
                        
                    </div>
                    <div className='business_button'>
                        {showFollow? <Button fullWidth variant="contained" color="primary"  onClick={subscribeBusiness} style={{margin:'10px'}}>
                            Subscribe
                        </Button>: <Button fullWidth variant="contained" color="primary"  onClick={unSubscribeBusiness} style={{margin:'10px'}}>
                            unsubscribe
                        </Button>}
                    </div>
                </div>
            </div>

            <Hidden xsDown>
                <div className='business_gallery_header'>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        posts by {profile.business?.name}
                    </Typography>
                </div>
            
                    <div className='business_gallery'>
                        
                    {
                   profile.posts?.slice(0,6).map(post=><LargeScreenDisplayCard key={post._id} post={post} gallery={true} />)
                    }  
                    </div>
                </Hidden>
            <Hidden smUp>
            <div className='business_gallery_header' style={{marginBottom:'10px',marginLeft:'5px'}}>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        posts by {profile.business?.name}
                    </Typography>
                </div>
            <div>
                {
                profile.posts?.slice(0,6).map(post=><MobileDisplayCard key={post._id} post={post} />)
                
                }
            </div>
            </Hidden>
  {/*
            <div className='gallery'>
                <PostGallery 
                postData={profile?.business}
                profile={true}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={profile?.posts}
                product={true}
                /> 
            </div>

  */}
            
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default OtherBusinessProfile
