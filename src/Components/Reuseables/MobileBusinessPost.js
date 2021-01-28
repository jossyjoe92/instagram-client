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
import './Reuseables.css'
import DotMenuComponent from './DotMenuComponent'


function MobileBusinessPost({post,likePost,unlikePost,deletePost,subscribeBusiness,unSubscribeBusiness,step,setStep,comment,setComment,makeComment}) {
    const [{user,showTopNav}, dispatch ] = useStateValue ()
    const history = useHistory()
    const [open, setOpen] = useState(false);
   
    const [postComments, setPostComments] = useState([])
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
        if(!post){
            return
        }
        console.log(post)
      setPostComments(post.comments)

    }, [post]);

   

     
  return(
      <>
        {(step===1)?
     
        <div  className='post'>   {/*post and post header styles are in post .css*/}
            <div className="post_header">
                <Link to={post.business?._id !==user?.businessRegistered ? `/businessprofile/${post.business?._id}`:'/businessprofile'}> 
                    <Avatar
                    className="post_avatar"
                    alt='profile'
                    src={post.business?.photo}
                    />
                </Link>
                
                <h5><Link to={post.business?._id !==user?.businessRegistered ? `/businessprofile/${post.business?._id}`:'/businessprofile'}><strong>{post.business?.name}</strong> </Link></h5>
                <DotMenuComponent 
                            business={true}
                            post={post}
                           subscribeBusiness={subscribeBusiness}
                            unSubscribeBusiness={unSubscribeBusiness}
                            deletePost={deletePost}
                      /> 
            </div>

            <img className='post_image' src={post?.photo} alt='img'/>

            <div className='card-content'>
            {
                post.likes?.includes(user._id)?<FavoriteRoundedIcon className='material-icons' style={{color:'red'}} onClick={()=>{unlikePost(post._id)}} />
                :<FavoriteBorderRoundedIcon  className='material-icons' onClick={()=>{likePost(post._id)}} style={{color:'#262626'}} />
            }

                <ChatBubbleOutlineIcon  onClick={()=> setStep(2)} />
   
    
            {(post.likes?.length===1)? <h5>{post.likes?.length} like</h5>:<h5>{post.likes?.length} likes</h5>}
            <h4 style={{marginLeft:'5px'}}><strong>{post.title}</strong> </h4>
            <h5><strong>Description:</strong> <span>{post.description}</span></h5>

        </div>

        <TimeAgo style={{fontSize:'12px',marginLeft:'15px'}} datetime={post?.timestamp}/>
 
    </div>:
    <div className='businessPostComment'>
         <div className='businessPostComment_header'>
            <ArrowBackIosIcon onClick={()=>setStep(1)}/>
            <h3>Comments</h3>
            <DotMenuComponent 
                business={true}
                post={post}
                subscribeBusiness={subscribeBusiness}
                 unSubscribeBusiness={unSubscribeBusiness}
                 deletePost={deletePost}
            />
         </div>
        <div className='businessPostComment_form'>
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
            postComments?.sort((a, b) =>a.timestamp < b.timestamp ? 1 : -1).map((comment,i)=>{
                return (
                    <div key={comment._id} className='postComment_commentDisplay'>
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
    }
      
    </>
  )
}

export default MobileBusinessPost;
