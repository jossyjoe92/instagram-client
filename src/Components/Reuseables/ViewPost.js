import React,{useEffect,useRef,useState} from 'react'
import Footer from './Footer'
import {useParams,useHistory,Link,useLocation} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import TimeAgo from 'timeago-react';
import PostModal from './PostModal';
import PostGallery from './PostGallery';
import './Reuseables.css'
import SinglePost from './SinglePost'
import Hidden from '@material-ui/core/Hidden';
import queryString from 'query-string';

function ViewPost({location}) {  
   
    const [{user,showTopNav}, dispatch ] = useStateValue ()
    const {id} = useParams()
    const [ blurId, setBlurId] = useState(null)
    const[userPosts, setUserPosts] = useState(null)
    const [postData, setPostData] = useState([])
    const[imageBlur,setImageBlur]= useState(false)
    const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)
     const [comment,setComment]= useState('')
     const [step, setStep] = useState(1)
   // const[showFollow, setShowFollow]= useState(user?!user.following.includes(id):true)
   const {comments}= queryString.parse(location.search);

   useEffect(() => {
     if(!comments){
         return
     }else{

         setStep(2)
     }
   }, [comments]);

   useEffect(() => {
 
  if(step>1){
    dispatch({
        type:actionTypes.Set_Top_Nav,
        showTopNav: false
    })
  }else{
    dispatch({
        type:actionTypes.Set_Top_Nav,
        showTopNav: true
    })
  }

  
  return () => {
    dispatch({
        type:actionTypes.Set_Top_Nav,
        showTopNav: true
  })
  };
}, [step]);

    useEffect(() => {
      
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
       
    }, [id])

    useEffect(() => {
        if(!postData.postedBy?._id){
            return
        }
        
            fetch(`https://citiwide.herokuapp.com/user/${postData.postedBy?._id}`,{
         
                headers:{
                 "Authorization":"Bearer "+ localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
             setUserPosts(result.posts)
              // setProfile(result)
                
            }).catch(err=>{
                console.log(err)
            }) 
        
       
        
     }, [postData])

    const likePost=(id)=>{
        fetch('https://citiwide.herokuapp.com/like',{
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
        fetch('https://citiwide.herokuapp.com/unlike',{
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
            /*
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
            */
            setShowFollow(true)
            })
            //setData(newData)
             .catch(err => console.log(err));
     
    } 
    const makeComment = (text,postId)=>{
        if(!text){
            return
        }
        fetch('https://citiwide.herokuapp.com/comment',{
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

    return (
        <div className='viewpost'>
            <Hidden xsDown>
                <PostModal postData={postData} setPostData={setPostData}/>
           </Hidden>
           <Hidden smUp>
                <SinglePost
                post={postData}
                likePost={likePost}
                unlikePost={unlikePost}
                step={step}
                setStep={setStep}
                comment={comment}
                setComment={setComment}
                makeComment={makeComment}
                
                />
            
            </Hidden>
            <Hidden smDown>
                <hr />
            </Hidden>
        {(step===1) &&
            <>
                <PostGallery 
                postData={postData}
                postBlur={postBlur}
                blurId={blurId}
                imageBlur={imageBlur}
                setImageBlur={setImageBlur}
                userPosts={userPosts}
                />
                <div className='viewpost_footer'>
                    <Footer />
                </div>
            </>
}
        </div>
    )
}

export default ViewPost
