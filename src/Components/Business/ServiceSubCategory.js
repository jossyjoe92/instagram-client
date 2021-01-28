import React,{useState,useEffect} from 'react'
import { useStateValue } from '../../StateProvider';
import {Link,useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import Footer from '../Reuseables/Footer'
import Sticky from 'react-stickynode';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TimeAgo from 'timeago-react';
import Amazonbeauty from '../../Assets/amazonbeauty.jpg'
import ServiceCategory from './ServiceCategory'
import Hidden from '@material-ui/core/Hidden';
import DisplayCard from '../Reuseables/MobileDisplayCard'
import LargeScreenDisplayCard from '../Reuseables/LargeScreenDisplayCard';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));


function ServiceSubCategory() { 
      
    const classes = useStyles();
     const history = useHistory()
     const {subcategory} = useParams()
    const [{user}, dispatch ] = useStateValue ()
    const [data,setData] = useState([])
    const [comment,setComment]= useState('')
    const [commentId,setCommentId] = useState([])

    useEffect(() => {
      
       fetch(`https://citiwide.herokuapp.com/businesssubcategory/${subcategory}`,{
           headers:{
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
         setData(result.posts)
           
       }).catch(err=>{
           console.log(err)
       })
   
    }, [subcategory])

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
                //if(data.error){
                   // M.toast({html: data.error, classes:'#c62828 red darken-3'})
              //  }else{
                //   M.toast({html: `Post Created Successfully`, classes:'#43a047 green darken-1'})
                //   history.push('/')
                //}
             // console.log(result)
                const newData = data.map(item=>{
                    if(item._id=== result._id){
                        return result
                    }else{
                        return item
                    }
                })
                //console.log(data)
                setData(newData)
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
                //if(data.error){
                   // M.toast({html: data.error, classes:'#c62828 red darken-3'})
              //  }else{
                //   M.toast({html: `Post Created Successfully`, classes:'#43a047 green darken-1'})
                //   history.push('/')
                //}
                //console.log(data)
                const newData = data.map(item=>{
                    if(item._id===result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err=>{
                console.log(err)
            })
    }

    const makeComment = (text,postId)=>{
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
           
              const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
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
            
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

    const deleteComment = (commentId,postId)=>{
        if(window.confirm('Are you sure to delete this comment?')){
        fetch(`https://citiwide.herokuapp.com/deletecomment/${postId}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               commentId
               
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
    const lovePost = (commentId)=>{

            
            setCommentId(prevState=>[...prevState,commentId])
    }

    const unLovePost = (commentId)=>{
        setCommentId(prevState=>prevState.filter(item=>item !== commentId))
    }

    return (
    
    <div className='products'>
            <Hidden xsDown>
                <img className='products_headerImage' src={Amazonbeauty} alt='image' />
            </Hidden>
            <div className='products_row'>
                <Hidden xsDown>
                    <div className='products_left' > 
                        <Sticky enabled={true} top={70} >
                            <div style={{background:'#fff',width:'100%'}}>
                                <ServiceCategory />
                            </div>
                        
                        </Sticky>
                    </div>
                </Hidden>
                <Hidden xsDown>
                    <div className='products_right'>
                    {
                        data.map(post=><LargeScreenDisplayCard key={post._id} post={post} />)
                    }  
                    </div>
                </Hidden>
                <Hidden smUp>
            {
                data.map(post=> <DisplayCard key={post._id} post={post}/> )
            } 
            </Hidden>
            </div>
        <div className='footer' >
            <Footer />
        </div>
       
    </div>
  )
}

export default ServiceSubCategory
