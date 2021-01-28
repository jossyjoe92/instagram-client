import React, {useEffect} from 'react';
import aesthetics from '../../Assets/aesthetics.jpg'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './Reuseables.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import verified from '../../Assets/verified.png'
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom'

function MobileDisplayCard({post}) {
    const history= useHistory()

  return (
            <div className='displayCard' onClick={()=>history.push(`/viewproduct/${post._id}`)}>
                <div className='displayCard_image'>
                    <img src={post.photo} alt='' />
                </div>
                <div className='displayCard_details'>
                    <h3>{post.title}</h3>
                    <Typography variant="body2" color="textSecondary" component="p">
                           <strong>Description: </strong> {post.description.substring(0,20)}...
                        </Typography>
                    <p className='displayCard_details_location'><LocationOnIcon fontSize='inherit'/> {post.business.location}</p>
                   <div className='displayCard_price'>
                      {post?.price && <h5 style={{color:'#3DB83A'}}><strong style={{textDecoration:'line-through',color:'#3DB83A'}}>N</strong><strong>{post?.price}</strong></h5>}  
                        <img src={verified} alt='' />
                   </div>
                   
                </div>
            </div>
  );
}

export default MobileDisplayCard;
