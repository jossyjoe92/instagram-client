import React, {useRef,useState,useEffect} from 'react';
import './Reuseables.css'
import TimeAgo from 'timeago-react';
import {Link,useHistory} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import TextField from '@material-ui/core/TextField';
import { actionTypes } from '../../reducer';

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

const LargeScreenBusinessPost = ({postData,setPostData,product,subscribeBusiness,unSubscribeBusiness,deletePost,makeComment,comment,setComment,likePost,unlikePost}) =>{
    const history= useHistory()
    const classes = useStyles();
     const [{user}, dispatch ] = useStateValue ()
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
 
  }, [postData]);
  



  return (
      <>
      
            <div className='viewpost_post'>
                <img src={postData?.photo} alt='img' />
                <div className='viewpost_sidecomment'>
                    <div className='viewpost_user_profile'>
                    
                          <Link to={postData.business?._id !==user?.businessRegistered ? `/businessprofile/${postData.business?._id}`:'/businessprofile'}> 
                            <img src={postData.business?.photo}  alt={postData?.name} />
                        </Link>
                        <div className='viewpost_userInfo'>
                            <h6><strong>{postData.business?.name}</strong></h6>
                            <h6>{postData.business?.address}</h6>    
                        </div>
                        <DotMenuComponent 
                            business={true}
                            post={postData}
                           subscribeBusiness={subscribeBusiness}
                            unSubscribeBusiness={unSubscribeBusiness}
                            deletePost={deletePost}
                      /> 
                    
                        
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
                            onClick={()=>{likePost(postData._id)}}/>
                        }
                            
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

export default LargeScreenBusinessPost;