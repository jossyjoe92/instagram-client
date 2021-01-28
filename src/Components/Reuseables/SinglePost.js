import React,{useState,useEffect} from 'react';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TextField from '@material-ui/core/TextField';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import TimeAgo from 'timeago-react';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import {Link,useHistory} from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DotMenuComponent from './DotMenuComponent'


function SinglePost({main,post,likePost,unlikePost,deletePost,deleteComment,lovePost,unLovePost,makeComment,comment,setComment,commentId, showComment,setShowComment,inputRef2,classes,step,setStep}) {
    const [{user}, dispatch ] = useStateValue ()
    const history = useHistory()
   
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
      {
          main?
          <div  className='post'>
                <div className="post_header">
                    <Link to={post.postedBy._id !==user._id ? `/profile/${post.postedBy._id}`:'/profile'}>
                        <Avatar
                        className="post_avatar"
                        alt='profile'
                        src={post.postedBy.photo}
                        />
                    </Link>
                    <h5><Link to={post.postedBy._id !==user._id ? `/profile/${post.postedBy._id}`:'/profile'}>{post.postedBy.name}</Link></h5>
                    <DotMenuComponent 
                        post={post}
                        followUser={followUser}
                        unFollowUser={unFollowUser}
                        deletePost={deletePost}
                      />
                </div>

                <img className='post_image' src={post.photo} alt='img'/>

                <div className='card-content'>
                    {
                        post.likes.includes(user._id)?<FavoriteRoundedIcon className='material-icons' style={{color:'red'}} onClick={()=>{unlikePost(post._id)}} />
                        :<FavoriteBorderRoundedIcon  className='material-icons' onClick={()=>{likePost(post._id)}} style={{color:'#262626'}} />
                        }
                    <Hidden xsDown> 
                        <ChatBubbleOutlineIcon  className='material-icons' onClick={()=>history.push(`/viewpost/${post._id}`)} style={{color:'#262626'}}/>
                    </Hidden>   
                    <Hidden smUp> 
                        <ChatBubbleOutlineIcon  className='material-icons' onClick={()=> history.push(`/viewpost/${post._id}?comments=comments`)} style={{color:'#262626'}}/>
                    </Hidden>  
                        
                        {(post.likes.length===1)? <h5>{post.likes.length} like</h5>:<h5>{post.likes.length} likes</h5>}
                        <h5><strong>{post.postedBy.name}</strong> <span>{post.title}</span></h5>

                </div>
                {post.comments.sort((a, b) =>a.timestamp < b.timestamp ? 1 : -1).slice(0,2).map(comment=>{
                    return(
                        <h6 key={comment._id} className='comments'><span style={{fontWeight:'800',fontSize:'13px'}}>{comment.postedBy.name}</span>
                            <span className='comment_text'>{comment.text}</span>
                            <span className="comment_delete">{comment.postedBy._id===user._id && <DeleteOutlineOutlinedIcon fontSize='inherit' onClick={()=>
                            deleteComment(comment._id,post._id)}/>}{(commentId.includes(comment._id)) ? <FavoriteRoundedIcon fontSize='inherit' style={{color:'red'}} 
                            onClick={()=>unLovePost(comment._id)} />:<FavoriteBorderRoundedIcon fontSize='inherit' onClick={()=>lovePost(comment._id)}
                            />}</span>
                        </h6>
                        )
                    })}
                <Hidden xsDown>
                        {(post.comments.length>2)&&<p style={{fontSize:'12px',cursor:'pointer', marginLeft:'15px'}} onClick={()=>{
                            history.push(`/viewpost/${post._id}`)
                            }}>See more comments...</p>}
                
                </Hidden>
                <Hidden smUp>
                        {(post.comments.length>2)&&<p style={{fontSize:'12px',cursor:'pointer', marginLeft:'15px'}} onClick={()=>{
                            history.push(`/viewpost/${post._id}?comments=comments`)
                            }}>See more comments...</p>}
                
                </Hidden>
                <TimeAgo style={{fontSize:'12px',marginLeft:'15px'}} datetime={post.timestamp}/>
            
                <Hidden smDown>
                <hr />
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    makeComment(e.target[0].value,post._id)
                    }}>
                    <TextField value={comment} className='text-field' onChange={(e)=>setComment(e.target.value)} placeholder='add a comment'  />
                </form>
                </Hidden>
            
            </div>:(step===1)?<div  className='post'>
            <div className="post_header">
                <Link to={post.postedBy?._id !==user?._id ? `/profile/${post.postedBy?._id}`:'/profile'}>
                    <Avatar
                    className="post_avatar"
                    alt='profile'
                    src={post.postedBy?.photo}
                    />
                </Link>
                <h5><Link to={post.postedBy?._id !==user?._id ? `/profile/${post.postedBy?._id}`:'/profile'}>{post.postedBy?.name}</Link></h5>
                <DotMenuComponent 
                        post={post}
                        followUser={followUser}
                        unFollowUser={unFollowUser}
                        deletePost={deletePost}
                      />
            </div>

            <img className='post_image' src={post?.photo} alt='img'/>

            <div className='card-content'>
            {
                post.likes?.includes(user._id)?<FavoriteRoundedIcon className='material-icons' style={{color:'red'}} onClick={()=>{unlikePost(post._id)}} />
                :<FavoriteBorderRoundedIcon  className='material-icons' onClick={()=>{likePost(post._id)}} style={{color:'#262626'}} />
                }

                <ChatBubbleOutlineIcon  onClick={()=>{
                    setStep(2)
                    /*setShowComment({display:'block'})*/
                
                }} />
            
                
                {(post.likes?.length===1)? <h5>{post.likes?.length} like</h5>:<h5>{post.likes?.length} likes</h5>}
                <h5><strong>{post.postedBy?.name}</strong> <span>{post.title}</span></h5>

            </div>

            <TimeAgo style={{fontSize:'12px',marginLeft:'15px'}} datetime={post?.timestamp}/>
            
            </div>: 
                
                <div className='postComment'>
                    <div className='postComment_header'>
                        <ArrowBackIosIcon onClick={()=>setStep(1)}/>
                        <h3>Comments</h3>
                        <DotMenuComponent 
                        post={post}
                        followUser={followUser}
                        unFollowUser={unFollowUser}
                        deletePost={deletePost}
                      />
                    </div>
                    <div className='postComment_form'>
                        <Avatar src={user.photo} />
                
                    <form onSubmit={(e)=>{
                            e.preventDefault();
                            makeComment(e.target[0].value,post._id)
                                    }}>
                        <input 
                            placeholder='Add a Comment'
                            type='text' 
                            value={comment} 
                            onChange={(e)=>setComment(e.target.value)}/>
                        <SendIcon onClick={(e)=>{
                            e.preventDefault();
                            makeComment(comment,post._id)
                                    }} style={{cursor:'pointer', zIndex:50}}/>
                    </form>
                    </div>
                    <div className='postComment_comments'>
                    {
                        post.comments?.sort((a, b) =>a.timestamp < b.timestamp ? 1 : -1).map((comment,i)=>{
                            return (
                             
                                    <div key={comment._id} className='postComment_commentDisplay'>
                                        <img src={comment.postedBy.photo} alt='' />
                                        <div className='postComment_commentDisplay_text'>
                                            <h6><span style={{fontWeight:'800',fontSize:'13px'}}>{comment.postedBy.name}</span>
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

            
                }
                  
                </>
  )
 
}

export default SinglePost;
