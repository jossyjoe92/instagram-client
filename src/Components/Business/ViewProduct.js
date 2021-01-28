import React,{useEffect,useRef,useState} from 'react'
import {useParams,useHistory,Link} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import TimeAgo from 'timeago-react';
import PostGallery from '../Reuseables/PostGallery'
import Footer from '../Reuseables/Footer'
import './Business.css'
import LargeScreenDisplayCard from '../Reuseables/LargeScreenDisplayCard';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MobileDisplayCard from '../Reuseables/MobileDisplayCard';
import LargeScreenBusinessPost from '../Reuseables/LargeScreenBusinessPost'
import Hidden from '@material-ui/core/Hidden';
import MobileBusinessPost from '../Reuseables/MobileBusinessPost'

function ViewProductPost() {  
    const inputRef =useRef(null)
    const history = useHistory()
    const [{user}, dispatch ] = useStateValue ()
    const {id} = useParams()
    const [comment,setComment]= useState('')
    const [postData, setPostData] = useState([])
    const[businessPosts, setBusinessPosts] = useState(null)
    
    const[imageBlur,setImageBlur]= useState(false)
    const [ blurId, setBlurId] = useState(null)
    const [step, setStep] = useState(1)

    
   // const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)

    useEffect(() => {
        
       fetch(`https://citiwide.herokuapp.com/businesspost/${id}`,{
        
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          setPostData(result.post)
            
        }).catch(err=>{
            console.log(err)
        }) 
       
    }, [id])

    useEffect(() => {
      if(postData.business===undefined){
          return
      }else{
        fetch(`https://citiwide.herokuapp.com/allbusinesspost/${postData.business._id}`,{
         
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           
         setBusinessPosts(result.posts)
          // setProfile(result)
            
        }).catch(err=>{
            console.log(err)
        }) 
      }
          
        
       
        
     }, [postData])

    const likePost=(id)=>{
        fetch('https://citiwide.herokuapp.com/business/likepost',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId :id
            })
        }).then(res=>res.json())
            .then(result =>{
                
                
                setPostData(result)
            }).catch(err=>{
                console.log(err)
            })
    
    }
    const unlikePost=(id)=>{
        fetch('https://citiwide.herokuapp.com/business/unlikepost',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId :id
            })
        }).then(res=>res.json())
            .then(result =>{
              
                setPostData(result)
            }).catch(err=>{
                console.log(err)
            })
    }
    const subscribeBusiness=(id)=>{
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
           
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }
    
    const unSubscribeBusiness=(id)=>{
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
          
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    }
    const makeComment = (text,postId)=>{
        if(!text){
            return
        }
         fetch('https://citiwide.herokuapp.com/business/comment',{
             method:'put',
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+ localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 text,
                 postId
                
             })
             }) 
             .then(res=>res.json())
            .then(result =>{
                setPostData(result)
                setComment('')
             
              })
              .catch(err => console.log(err));
      
     }
    const postBlur = (itemId)=> {
        setTimeout(function(){
        setBlurId(itemId)
        setImageBlur(true)
        }, 200)
    }
    const deletePost = (postId)=>{
        if(window.confirm('Are you sure to delete this post?')){
        fetch(`https://citiwide.herokuapp.com/deletebusinesspost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           
            history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    }

    return (
        <>
        {
            step===1 && 
             <Breadcrumbs aria-label="breadcrumb">
                <Link to={`/${postData.category}s`}>
                    {postData.category}
                </Link>
                <Link to={`/${postData.category}/${postData.subCategory}`}>
                    {postData.subCategory}
                </Link>
                <Typography color="textPrimary">{postData.title}</Typography>
            </Breadcrumbs>
        }
        
        <div className='viewpost'>
            <Hidden xsDown>
                <LargeScreenBusinessPost
                postData={postData} 
                setPostData={setPostData} 
                deletePost={deletePost}
                likePost={likePost}
                unlikePost={unlikePost}
                subscribeBusiness={subscribeBusiness}
                unSubscribeBusiness={unSubscribeBusiness}
                comment={comment}
                setComment={setComment}
                makeComment={makeComment}
                />
            </Hidden>
            <Hidden smUp>
                <MobileBusinessPost
                step={step}
                setStep={setStep}
                post={postData}
                likePost={likePost}
                unlikePost={unlikePost}
                deletePost={deletePost}
                subscribeBusiness={subscribeBusiness}
                unSubscribeBusiness={unSubscribeBusiness}
                comment={comment}
                setComment={setComment}
                makeComment={makeComment}
                />
            
                      
            </Hidden>
            {
                step===1 &&
                <>
                <hr />
                <Hidden xsDown>
                    <div style={{marginLeft:'-500px',marginTop:'-30px'}} className='business_gallery_header'>
                        <Typography variant="body2" color="textSecondary" component="p" >
                            more posts by {postData.business?.name}
                        </Typography>
                    </div>
                        <div className='business_gallery'>
                        {
                        businessPosts?.filter(post=>post._id !==postData._id).slice(0,6).map(post=><LargeScreenDisplayCard key={post._id} post={post} gallery={true} />)
                        }  
                        </div>
                    </Hidden>
                <Hidden smUp>
                    <div style={{marginLeft:'0px',marginTop:'-30px'}} className='business_gallery_header'>
                        <Typography variant="body2" color="textSecondary" component="p" >
                            more posts by {postData.business?.name}
                        </Typography>
                    </div>
                        <div>
                        {
                            businessPosts?.filter(post=>post._id !==postData._id).slice(0,6).map(post=><MobileDisplayCard 
                                key={post._id} post={post}  />
                        
                            )}
                    </div>
                    
               
                </Hidden>
                </>
            }
          



            {/*
             <div className='gallery'>
                <PostGallery 
                postData={postData}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={businessPosts}
                product={true}
                />
              
             
            </div>
            */}
           
           
            <div className='footer'>
                <Footer />
            </div>
        </div>
        </>
    )
}

export default ViewProductPost
