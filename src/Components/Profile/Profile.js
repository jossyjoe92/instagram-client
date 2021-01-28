import React, {useEffect,useState,useRef} from 'react'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import './Profile.css'
import {useHistory,Link} from 'react-router-dom'
import PostModal from '../Reuseables/PostModal';
import PostGallery from '../Reuseables/PostGallery';
import Footer from '../Reuseables/Footer'
import Loader from 'react-loader-spinner'
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Dialog from '@material-ui/core/Dialog';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

function Profile() {
    
    const [{user}, dispatch ] = useStateValue ()
    const [myPics, setMyPics] = useState([])
    const [image, setImage] = useState(null)
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [open, setOpen] = useState(false);
 const history = useHistory()
 const [comment,setComment]= useState('')

 const [postData, setPostData] = useState([])

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

    useEffect(() => {
       if(!image){
           return
       }
       else if(image)
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
            localStorage.setItem("user",JSON.stringify({...user,photo:data.url}))
            dispatch({
                type:actionTypes.Set_USER,
                user: {...user,
                    photo:data.url}
            })
             fetch('https://citiwide.herokuapp.com/updatephoto',{
      method:'put',
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
         
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
                
        
    }, [image])

   

    //click on a post open Modal
    const showPostModal = (id)=>{
       handleOpen()
     
        fetch(`https://citiwide.herokuapp.com/post/${id}`,{
         
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          setPostData(result.post)
            
        }).catch(err=>{
            console.log(err)
        }) 
       
    }
       
    

    const updatePic = (file)=>{
        setImage(file)
        
    }

    const postBlur = (itemId)=> {
        setTimeout(function(){
        setBlurId(itemId)
        setImageBlur(true)
        }, 200)
    }


    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div className='profile' >
            <div className='profile_top'>
                <div className='profile_image'>
                    {isLoading?
                        <div ><img src={user?.photo} alt=''/><Loader className='loader' type="TailSpin" color="#00BFFF" height={40} width={40} /> </div>:
                            <img src={user?.photo} alt=''/>
                     }
                   
                  
					<input type="file" accept="image/*"  id="input" onChange={e=>updatePic(e.target.files[0])} />
					<div className="label">
                        <label className="image-upload" htmlFor="input">
                            <AddAPhotoIcon className='addphoto_icon' />
					    </label>
                    </div>
			
                    
                </div>
                <div className='profile_details'>
                    <div className='profile_details_name'>
                        <h3>{user?.name}</h3>
                        <Button
                            
                            variant="outlined"
                            color="default"
                            //className={classes.button}
                            onClick={()=>history.push('/editprofile')}
                        > Edit Profile  </Button>
                    </div>
                    <h4>{user?.email}</h4>
                    
                    <div className='profile_details_stats'>
                        <h4>{myPics?.length} posts</h4>
                        <h4>{user?user.followers.length:0} followers</h4>
                        <h4>{user?user.following?.length:0} following</h4>
                    </div>

                    <p style={{fontSize:'12px'}}><strong>Bio:</strong> <span style={{fontSize:'12px'}}>{user?.about}</span></p>
                    <div className='business_button'>
                        {user?.businessRegistered? <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={()=>history.push('./businessprofile')}
                            > Business Profile  </Button>:<Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                //className={classes.submit}
                                onClick={()=>history.push('./registerbusiness')}
                            >Register a Business </Button>}
                    </div>
                   
                </div>
            </div>


           
          
            <div className='gallery'>
            <Hidden smDown>
                <div className='business_gallery_header'>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        posts by {user?.name}
                    </Typography>
                </div>
                <PostGallery 
                showPostModal={showPostModal}
                postData={postData}
                profile={true}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={myPics}
                />
                
             </Hidden>
             <Hidden mdUp>
                <div className='business_gallery_header'>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        posts by {user?.name}
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
                    userPosts={myPics}
                    />
            </Hidden>
            </div>


        
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
            maxWidth='lg'>
                <div style={{ overflow: "hidden", height: "100%", width: "100%" }}>
                <PostModal
                        postData={postData}
                        setPostData={setPostData} />
               </div>
            </Dialog>
               
        


            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
