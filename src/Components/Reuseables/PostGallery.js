import React, {useState,useRef,useEffect} from 'react';
import {useParams,useHistory,Link} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import './Reuseables.css'
import { actionTypes } from '../../reducer';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
//import TimeAgo from 'timeago-react';

function PostGallery({postData,postBlur,blurId,setBlurId,imageBlur,setImageBlur,userPosts,product,profile,showPostModal,mobile}) {

    const [focus,setFocus] = useState(false)
    const history = useHistory()
    const [{user}, dispatch ] = useStateValue ()


  return (
    <div className='viewpost_gallery'>
         <div className='viewpost_gallery_items'>

             {/*if profile dont filter d currently displayed post */}
         {(profile && showPostModal)?userPosts?.slice(0,6).map(post=>{
                     return(
                     <div key={post._id} className='viewpost_gallery_item' onMouseEnter={()=>postBlur(post._id)}  onMouseLeave={()=> 
                         
                           setImageBlur(false)
                            } onClick={()=>product?history.push(`/viewproduct/${post._id}`):showPostModal(post._id)}>
                 
                         <img className ={`${(imageBlur && (blurId===post._id)) && 'image_blur'}`} src={post.photo}  alt=''/>
                            
                         <div className="logo_wrapper">
                            {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><FavoriteRoundedIcon /></span><span>{post.likes.length}</span></p>}
                            {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><ChatBubbleOutlineIcon /></span><span>{post.comments.length}</span></p>}
                         </div>
                     </div>
                     )
                 }):(profile && mobile)?
                        userPosts?.filter(post=>post._id !==postData._id).slice(0,6).map(post=>{
                            return(
                            <div key={post._id} className='viewpost_gallery_item' onClick={()=>product?history.push(`/viewproduct/${post._id}`):history.push(`/viewpost/${post._id}`)}>
                        
                                <img className ={`${(imageBlur && (blurId===post._id)) && 'image_blur'}`} src={post.photo}  alt=''/>
                                    
                                <div className="logo_wrapper">
                                    {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><FavoriteRoundedIcon /></span><span>{post.likes.length}</span></p>}
                                    {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><ChatBubbleOutlineIcon /></span><span>{post.comments.length}</span></p>}
                                </div>
                            </div>
                            )
                        }):
                        userPosts?.filter(post=>post._id !==postData._id).slice(0,6).map(post=>{
                            return(
                            <div key={post._id} className='viewpost_gallery_item' onMouseEnter={()=>postBlur(post._id)}  onMouseLeave={()=> 
                               
                                  setImageBlur(false)
                                   }  onClick={()=>product?history.push(`/viewproduct/${post._id}`):history.push(`/viewpost/${post._id}`)}>
                        
                                <img className ={`${(imageBlur && (blurId===post._id)) && 'image_blur'}`} src={post.photo}  alt=''/>
                                    
                                <div className="logo_wrapper">
                                    {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><FavoriteRoundedIcon /></span><span>{post.likes.length}</span></p>}
                                    {(imageBlur && (blurId===post._id)) &&  <p className="logo_wrapper_icons" ><span><ChatBubbleOutlineIcon /></span><span>{post.comments.length}</span></p>}
                                </div>
                            </div>
                            )
                        })
                        }
                    
         </div>
 </div>
  );
}

export default PostGallery;
