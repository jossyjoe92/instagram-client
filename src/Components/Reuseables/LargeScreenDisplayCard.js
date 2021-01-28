import React from 'react';
import {Link,useHistory} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import TimeAgo from 'timeago-react';
import { useStateValue } from '../../StateProvider';
import verified from '../../Assets/verified.png'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './Reuseables.css'
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: '50%',
      width:'100%'
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

function LargeScreenDisplayCard({post, gallery}) {
  const history = useHistory()
 const [{user}, dispatch ] = useStateValue ()
    const classes = useStyles();
  return (
    <Card className='product_card' key={post?._id}>
      {!gallery && 
    <div className='product_card_header'>
        <Link to={post?.postedBy._id !==user?._id ? `/businessprofile/${post?.business._id}`:'/businessprofile'}>
            <Avatar className='product_card_headerImg' 
                    src={post?.business.photo}
            /> 
        </Link>
        <p><Link to={post?.postedBy._id !==user?._id ? `/businessprofile/${post?.business._id}`:'/businessprofile'}>{post?.business.name}</Link>
        <span>  <TimeAgo style={{fontSize:'14px'}} datetime={post?.timestamp}/></span></p>
    </div>
    }
    <div className='product_card_image'>
        <img src={post?.photo} 
        alt={post?.title}
        title={post?.title}
        onClick={()=>history.push(`/viewproduct/${post?._id}`)}
    />
    </div>
  
    <CardContent>
        <Typography variant="body1" color="textSecondary" component="p" className='product_card_contentTitle'>
           <strong> {post?.title}</strong>
        </Typography>
        <Hidden xsDown>
            <Typography variant="body2" color="textSecondary" component="p">
              <strong>Description: </strong> {post?.description}
            </Typography>
        </Hidden>
       
        <div className='product_card_price'>
          <p className='displayCard_details_location'><LocationOnIcon fontSize='inherit'/> {post?.business.location}</p>
          <img src={verified} alt='' />
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
           {post?.price && <strong style={{color:'#3DB83A'}}><span style={{textDecoration:'line-through',textDecorationStyle:'double'}}>N</span>{post?.price}</strong>} 
        </Typography>
        
     
    </CardContent>
   
   

</Card>
  );
}

export default LargeScreenDisplayCard;
