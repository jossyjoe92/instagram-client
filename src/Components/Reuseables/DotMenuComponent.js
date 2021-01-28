import React, {useState} from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {Link,useHistory} from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import Dialog from '@material-ui/core/Dialog';

function DotMenuComponent({post,deletePost,unFollowUser,followUser,business,subscribeBusiness,unSubscribeBusiness}) {

    const [{user}, dispatch ] = useStateValue ()
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <>
      <MoreHorizIcon style={{marginLeft:'auto'}} onClick={handleOpen}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"  fullWidth maxWidth='xs'>
            <div className='dotMenuModal' style={{ overflow: "hidden", height: "100%", width: "100%" }}>
              {
                !business ?
                <>
                         
                {
                  (post.postedBy?._id ===user._id ) ? <p onClick={()=>{
                    handleClose()
                    deletePost(post._id)}} style={{color:'red',cursor:'pointer'}}>Delete</p>
                    :<p style={{color:'red',cursor:'pointer'}}>Report</p>
                }

              {
                  user.following?.includes(post.postedBy?._id)?<p onClick={()=>{
                      handleClose()
                      unFollowUser(post.postedBy?._id)}} style={{cursor:'pointer'}}>Unfollow</p>:(post.postedBy?._id !==user._id)?<p onClick={()=>{
                      handleClose()
                      followUser(post.postedBy?._id)}} style={{cursor:'pointer'}}>Follow</p>:<p style={{cursor:'pointer'}}>Edit</p>
                }
                  <p onClick={handleClose} style={{cursor:'pointer'}}><Link to={post.postedBy?._id !==user?._id ? `/profile/${post.postedBy?._id}`:'/profile'}>Profile</Link></p>
                  <p onClick={handleClose} style={{cursor:'pointer'}}>Cancel</p>
                  </>:<>
                  {
                  (post.postedBy?._id ===user._id ) ? <p onClick={()=>{
                    handleClose()
                    deletePost(post._id)}} style={{color:'red',cursor:'pointer'}}>Delete</p>
                    :<p style={{color:'red',cursor:'pointer'}}>Report</p>
                }

                {
                  user.businessSubscribed?.includes(post.business?._id)?<p onClick={()=>{
                    handleClose()
                    unSubscribeBusiness(post.business?._id)}} style={{cursor:'pointer'}}>UnSubscribe</p>:
                    (post.postedBy?._id !==user._id)?<p onClick={()=>{
                      handleClose()
                      subscribeBusiness(post.business?._id)}} style={{cursor:'pointer'}}>Subscribe</p>:<p style={{cursor:'pointer'}}>Edit</p>
               
                }
                  <p onClick={handleClose} style={{cursor:'pointer'}}><Link  to={post.business?._id !==user?.businessRegistered ? `/businessprofile/${post.business?._id}`:'/businessprofile'}>Profile</Link></p>
                  <p onClick={handleClose} style={{cursor:'pointer'}}>Cancel</p>
                  </>

              }
           
                            
            </div>
                    
        </Dialog>

     </>

  );
}

export default DotMenuComponent;
