import React, {useState,useEffect} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import {Link,useHistory} from 'react-router-dom'

import SinglePost from '../Reuseables/SinglePost';


function Post() {
    
    const history = useHistory()
   const [data,setData] = useState([])
   const [comment,setComment]= useState('')
   const [commentId,setCommentId] = useState([])

   useEffect(() => {
      
      fetch('https://citiwide.herokuapp.com/allpost',{
          headers:{
           "Authorization":"Bearer "+ localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          
         setData(result.posts)
      
      }).catch(err=>{
          console.log(err)
      })
      
   }, [])

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
        <div className='posts'>
               {
              data.map(post=>{
                return <SinglePost key={post._id}
                    post={post} 
                    comment={comment}
                    setComment={setComment}
                    likePost={likePost}
                    deleteComment={deleteComment}
                    lovePost={lovePost}
                    unLovePost={unLovePost}
                    makeComment={makeComment}
                    commentId={commentId}
                    main={true}
                    deletePost={deletePost}
                    unlikePost={unlikePost}
                    
                />}
            )}
        </div>
    )
}

export default Post
