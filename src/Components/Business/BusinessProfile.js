import React, {useEffect,useState} from 'react'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import Loader from 'react-loader-spinner'
import {useHistory} from 'react-router-dom'
import './Business.css'
import PostGallery from '../Reuseables/PostGallery'
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Footer from '../Reuseables/Footer'
import MobileDisplayCard from '../Reuseables/MobileDisplayCard';
import LargeScreenDisplayCard from '../Reuseables/LargeScreenDisplayCard';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

function BusinessProfile() {
    const [{user}, dispatch ] = useStateValue ()
    const [ business,setBusiness] = useState()
    const [myPics, setMyPics] = useState([])
    const [image, setImage] = useState(null)
    const [displayPhoto,setDisplayPhoto]= useState()
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
 const history = useHistory()
 
  useEffect(()=>{
      if(user !== null){
        fetch(`https://citiwide.herokuapp.com/business/${user?.businessRegistered}`,{
        
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           setBusiness(result)
           setDisplayPhoto(result.business.photo)
        }).catch(err=>{
            console.log(err)
        }) 
      }
   
  },[user])
  /*
    useEffect(() => {
       fetch("https://citiwide.herokuapp.com/mypost",{
        
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           
           setMyPics(result.myposts)
           
        }).catch(err=>{
            console.log(err)
        }) 
       
    }, [])
*/
    useEffect(() => {
        if(image){
         setIsLoading(true)
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "jossyjoe")
         fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload",{
           method: "post",
           body: data
         })
         .then(res=>res.json())
         .then(data=>{
            setDisplayPhoto(data.url)
             fetch('https://citiwide.herokuapp.com/updatecoverphoto',{
      method:'put',
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
         Id:user.businessRegistered,
          imgUrl:data.url,
      })
      }) 
      .then(res=>res.json())
     .then(data =>{
      
       setIsLoading(false)
     
       })
       .catch(err => console.log(err));
            
           
         })
         .catch(err=>{
           console.log(err)
         })
                
        }
    }, [image])

    const updatePic = (file)=>{
        setImage(file)
        
    }

    const postBlur = (itemId)=> {
        setTimeout(function(){
        setBlurId(itemId)
        setImageBlur(true)
        }, 200)
    }
    return (
        <div className='business_profile' >{/* Business profile styles are in Profile/Profile.css*/}
            <div className='business_profile_top'>
                <div className='business_profile_image'>
                    {isLoading?
                    <div ><img src={business?.business.photo} alt=''/><Loader className='loader' type="TailSpin" color="#00BFFF" height={40} width={40} /> </div>: <img src={displayPhoto&&displayPhoto} alt=''/>}
                   
                  
					<input type="file" accept="image/*"  id="input" onChange={e=>updatePic(e.target.files[0])} />
					<div className="label">
                        <label className="image-upload" htmlFor="input">
                            <AddAPhotoIcon className='addphoto_icon'/>
					    </label>
                    </div>
			
                    
                </div>
                <div className='profile_details'>
                    <div className='profile_details_header'>
                        <div className='profile_details_name'>
                            <h3 style={{color:'lightskyblue'}}>{business?.business.name}</h3>
                            <Hidden smDown>
                                <div className='businessProfile_button'>
                                    <Button
                                        
                                        variant="outlined"
                                        color="default"
                                        //className={classes.button}
                                        onClick={()=>history.push('./registerbusiness/edit')}
                                    > Edit Business Profile  </Button>
                                </div>
                            </Hidden>
                           
                        </div>
                    </div>
                    <h4>{business?.business.email}</h4>
                    <h4>{business?.business.address}</h4>
                    <h4>{business?.business.phone}</h4> 
                    <h4>{business?.business.description}</h4> 
                    <Hidden mdUp>
                        <div className='businessProfile_button'>
                            <Button 
                                variant="outlined"
                                color="default"
                                //className={classes.button}
                                onClick={()=>history.push('./registerbusiness/edit')}
                            > Edit Business Profile  </Button>
                        </div>
                    </Hidden>         
                    <div className='profile_details_stats'>
                        <h4>{business?.posts.length} posts</h4>
                        <h4>{business?.business.subscribers.length} Subscribers</h4>
                    </div>
                    <div className='business_button businessProfile_button'>
                        <Button fullWidth variant="contained" color="primary" onClick={()=>history.push('./businesspost')}>
                            Post a product or service
                        </Button>
                    </div>
                </div>
            </div>
           
            <Hidden xsDown>
                <div className='business_gallery_header'>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        posts by {business?.business.name}
                    </Typography>
                </div>
            
                    <div className='business_gallery'>
                        
                    {
                    business?.posts.slice(0,6).map(post=><LargeScreenDisplayCard key={post._id} post={post} gallery={true} />)
                    }  
                    </div>
                </Hidden>
            <Hidden smUp>
            <div className='business_gallery_header'>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        posts by {business?.business.name}
                    </Typography>
                </div>
            <div>
                {
                    business?.posts.slice(0,6).map(post=><MobileDisplayCard 
                        key={post._id} post={post} />
                
                    )}
            </div>
            </Hidden>


            {/*
            
          <div className='gallery'>
                <PostGallery 
                postData={business?.business?.name}
                profile={true}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={business?.posts}
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

export default BusinessProfile
