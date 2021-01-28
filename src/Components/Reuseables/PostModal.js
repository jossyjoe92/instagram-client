import React, {useRef,useState,useEffect} from 'react';
import './Reuseables.css'
import TimeAgo from 'timeago-react';
import {Link,useHistory} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import TextField from '@material-ui/core/TextField';

import DotMenuComponent from './DotMenuComponent'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
});

const PostModal = ({postData,setPostData,product}) =>{
    const history= useHistory()
    const classes = useStyles();
     const [{user}, dispatch ] = useStateValue ()
    const [comment,setComment]= useState('')
 const inputRef1 =useRef(null)
 const inputRef2 =useRef(null)
 const [postComments, setPostComments] = useState([])
const [showComment,setShowComment] = useState({display:'none'})
 

useEffect(() => {
    if(showComment.display==='none'){
        return
    }
    const element = inputRef2.current;
    element.focus();
}, [showComment]);

  useEffect(() => {
      if(!postData){
          return
      }
    setPostComments(postData.comments)
    return () => {
       
      };
  }, [postData]);
  

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
       console.log(result)
          
        setPostComments(result.comments)
        setComment('')
        
         })
         .catch(err => console.log(err));
 
}
const deletePost = (postId)=>{
    if(window.confirm('Are you sure to delete this post?')){
    fetch(`https://citiwide.herokuapp.com/deletepost/${postId}`,{
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
  return (
      <>
      
    <div className='viewpost_post'>
                <img src={postData?.photo} alt='img' />
                <div className='viewpost_sidecomment'>
                    <div className='viewpost_user_profile'>{/*style is in sideComponent.css*/}
                        {product? <>
                          <Link to={postData.business?._id !==user?.businessRegistered ? `/businessprofile/${postData.business?._id}`:'/businessprofile'}> 
                            <img src={postData.business?.photo}  alt={postData?.name} />
                        </Link>
                        <div className='viewpost_userInfo'>
                            <h6><strong>{postData.business?.name}</strong></h6>
                            <h6>{postData.business?.email}</h6> 
                            <h6>{postData.business?.address}</h6>    
                        </div>
                        <p><strong>Subscribe</strong></p></>:
                        <><Link to={postData.postedBy?._id !==user?._id ? `/profile/${postData.postedBy?._id}`:'/profile'}> 
                        <img src={postData.postedBy?.photo} alt={postData.postedBy?.name} />
                    </Link>
                    <div className='viewpost_userInfo'>
                        <h6><strong>{postData.postedBy?.email}</strong></h6>
                        <h6>{postData.postedBy?.name}</h6>   
                    </div>
                        <DotMenuComponent 
                        post={postData}
                        followUser={followUser}
                        unFollowUser={unFollowUser}
                        deletePost={deletePost}
                      /> 
                    </>}
                        
                    </div>
                    <div className='viewpost_sidecomment_comments'>
                        <div className='viewpost_sidecomment_comment'>
                            {
                                postComments?.sort((a, b) =>a.timestamp < b.timestamp ? 1 : -1).map((comment,i)=>{
                                    return (
                                        <div key={comment._id} className='viewpost_sidecomment_commentDisplay'>
                                            <img src={comment.postedBy.photo} alt='' />
                                            <div className='postComment_commentDisplay_text'>
                                                <h6  className='comments'><span style={{fontWeight:'800',fontSize:'13px'}}>{comment.postedBy.name}</span>
                                                    <span style={{fontWeight:'500',fontSize:'12px'}} >{comment.text}</span>
                                                </h6>
                                                <TimeAgo style={{fontSize:'10px',marginLeft:'15px'}} datetime={comment?.timestamp}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                            
                        </div>
                    </div>
                   
                    
                    <div className='viewpost_sidecomment_icons'>

                        {postData.likes?.includes(user._id)?<FavoriteRoundedIcon style={{color:'red'}}
                            onClick={()=>{unlikePost(postData._id)}}/>:<FavoriteBorderRoundedIcon
                            onClick={()=>{likePost(postData._id)}}/>}
                            
                            <ChatBubbleOutlineIcon  onClick={()=>{
                                
                            const element = inputRef1.current;
                            element.focus();
                            }} />
                   
                          
                            {(postData.likes?.length===1)? <h6>{postData.likes?.length} like</h6>:<h6>{postData.likes?.length} likes</h6>}
                            
                            <TimeAgo style={{fontSize:'12px'}} datetime={postData.timestamp}/>
                    </div>
                   
                    <div className='viewpost_sidecomment_addComment'>
                        <form onSubmit={(e)=>{
                                e.preventDefault();
                                makeComment(e.target[0].value,postData._id)
                                 }}>
                            <TextField
                              inputRef={inputRef1} className='text_field' InputProps={{ classes }} value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='add a comment' />
                        </form>
                    </div>

                </div>

            </div>
            
            
            </>
  );
}

export default PostModal;
