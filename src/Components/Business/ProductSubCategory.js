import React,{useState,useEffect} from 'react'
import { useStateValue } from '../../StateProvider';
import {Link,useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import Footer from '../Reuseables/Footer'
import Sticky from 'react-stickynode';

import Amazonban from '../../Assets/Amazonban.jpg'
import Amazonclone from '../../Assets/amazonclone.jpg'
import ProductCategory from './ProductCategory'
import Hidden from '@material-ui/core/Hidden';
import DisplayCard from '../Reuseables/MobileDisplayCard'
import LargeScreenDisplayCard from '../Reuseables/LargeScreenDisplayCard';


function ProductSubCategory() { 
    
  
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
                <img className='products_headerImage' src={Amazonban} alt='image' />
            </Hidden>
            <div className='products_row'>
                <Hidden xsDown>
                    <div className='products_left' > 
                        <Sticky enabled={true} top={70} >
                            <div style={{background:'#fff',width:'100%'}}>
                                <ProductCategory />
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

export default ProductSubCategory
