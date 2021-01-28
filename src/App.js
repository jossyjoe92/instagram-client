/*
import React, { useState, useEffect } from "react";
import './App.css'
import logo from './Assets/instagram.png'
import Post from './Components/Post/Post'
import { Button, Avatar, makeStyles, Modal, Input } from "@material-ui/core";
import ImageUpload from './Components/ImageUpload/ImageUpload'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    height: "300px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
 
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
  
    setOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
   
    setRegisterOpen(false);
  };
  return (
    <div className="app">
       <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_login">
            <center>
              <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </form>
        </div>
      </Modal>

      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_login">
            <center>
              <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleRegister}>Register</Button>
          </form>
        </div>
      </Modal>
        <div className="app_header">
          <img className="app_headerImage" 
          src={logo} alt='instagram'/>
          <Button onClick={() => setOpen(true)}>Login</Button>
            <Button onClick={() => setRegisterOpen(true)}>Sign Up</Button>
        </div>
      
       <div className="app_posts">
        <div className="app_postsLeft">
        <Post />
       <Post />
       <Post />
         {/* <FlipMove>
            {/*posts.map(({ id, post }) => (
              <Post
                user={user}
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))}
          </FlipMove> /}
        </div>
        <div className="app_postsRight" >
       
        
  
        </div>
      </div>
       <div className="app_upload">
          <ImageUpload  />
        </div>
    </div>
  );
}

export default App;

*/

import React, {useEffect, useState} from 'react';
import './App.css'
import {BrowserRouter, Route,Link,useHistory, Switch} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Signin from './Components/User/SignIn'
import Signup from './Components/User/Signup'
import Profile from './Components/Profile/Profile'
import FooterNav from './Components/Navbar/FooterNav'
import Hidden from '@material-ui/core/Hidden';
import UserProfile from './Components/Profile/OthersProfile'
import ViewPost from './Components/Reuseables/ViewPost'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Loader from 'react-loader-spinner'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import BusinessProfile from './Components/Business/BusinessProfile'
import OtherBusinessProfile from './Components/Business/OtherBusinessProfile'
import ViewProductPost from './Components/Business/ViewProduct'
import Products from './Components/Business/Products'
import Services from './Components/Business/Services'
import ProductSubCategory from './Components/Business/ProductSubCategory'
import ServiceSubCategory from './Components/Business/ServiceSubCategory'
import SearchUserMobile from './Components/User/SearchUserMobile'
import RegisterBusiness from './Components/Business/RegisterBusiness';
import BusinessPost from './Components/Business/BusinessPost'
import EditProfile from './Components/Profile/EditProfile'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Routing=()=>{
  const [{user}, dispatch ] = useStateValue ()
  const history = useHistory()

  const [Message, setMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [title,setTitle]= useState('')
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(null)
  const [disableUpload,setDisableUpload] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({
        type:actionTypes.Set_USER,
        user: user
    })
    
    }else{
      history.push('/signin')
    }
    
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShow(false);
  };
  const onDrop = (files) => {
    setIsLoading(true)
    setDisableUpload(true)
    let data = new FormData();
 
      data.append("file", files[0])
       data.append("upload_preset", "instaclone")
        data.append("cloud_name", "jossyjoe")
      
      if(files[0].size > 20971520){
        setMessage('File Size too large')
        setSeverity('error')
        setShow(true);
        setIsLoading(false)
        setDisableUpload(false)
        return

      } else if(files[0].type==="audio/mpeg" || files[0].type==="video/mp4"){
          setMessage('Site under Construction only Images are allowed')
          setSeverity('error')
          setShow(true);
          setIsLoading(false)
          setDisableUpload(false)
          return
        fetch("https://api.cloudinary.com/v1_1/jossyjoe/video/upload",{
          method: "post",
          body: data
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
      }else if(files[0].type === "image/jpeg"||files[0].type === "image/png"){
       
        fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload",{
          method: "post",
          body: data
        })
        .then(res=>res.json())
        .then(data=>{
         
          setImage(data.url)
          handleOpen()
          setIsLoading(false)
          setDisableUpload(false)
        })
        
        .catch(err=>{
          console.log(err)
          setMessage(`${err}`)
          setSeverity('error')
          setShow(true);
          setIsLoading(false)
          setDisableUpload(false)
        })
      }else {
        return
      }
      
    }

    
    const postDetails = ()=>{
      if (!title) {
        setMessage('Caption is required')
        setSeverity('error')
        setShow(true);
       return
   }
   setIsLoading(true)
   setDisableUpload(true)
      fetch('https://citiwide.herokuapp.com/createpost',{
       method:'post',
       headers:{
           "Content-Type":"application/json",
           "Authorization":"Bearer "+ localStorage.getItem("jwt")
       },
       body:JSON.stringify({
           title,
           imgUrl:image,
       })
       }) 
       .then(res=>res.json())
      .then(data =>{
          if(data.error){
            setIsLoading(false)
            setDisableUpload(false)
            setMessage(`${data.error}`)
            setSeverity('error')
            setShow(true);
          }else{
            setIsLoading(false)
            setDisableUpload(false)
            setShow(true);
            setMessage('Post Uploaded Succesfully')
             setSeverity('success')
             handleClose()
            history.push('/')
          }
      
        })
        .catch(err => console.log(err));
 }



  return(
    <>
      <Navbar onDrop={onDrop} /> 
      
   
      {isLoading?
        <div style={{margin:'30vh 40vw'}}>Loading...
            <Loader  type="TailSpin" color="#00BFFF" height={70} width={70} />
         </div>:
     
     <Switch>
        <Route  path='/businesspost'>
            <BusinessPost />
        </Route>
       <Route exact path='/registerbusiness/:edit'>
            <RegisterBusiness />
        </Route>
       <Route  path='/registerbusiness'>
            <RegisterBusiness />
        </Route>
       <Route path='/usersearch'>
            <SearchUserMobile />
        </Route>
         <Route path='/product/:subcategory'>
            <ProductSubCategory />
        </Route>
        <Route path='/service/:subcategory'>
            <ServiceSubCategory />
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route path='/services'>
          <Services />
        </Route>
        <Route path='/viewproduct/:id'>
          <ViewProductPost />
        </Route>
        <Route exact path='/businessprofile/:id'>
          <OtherBusinessProfile />
        </Route>
        <Route path='/businessprofile'>
          <BusinessProfile />
        </Route>
        <Route path='/viewpost/:id' render={(props) => (<ViewPost {...props}/>)} />
        
        <Route path='/profile/:id'>
          <UserProfile />
        </Route>
        <Route exact path='/editprofile'>
          <EditProfile />
        </Route>
          <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
    </Switch>
      }
      
  <Hidden mdUp>
        <FooterNav onDrop={onDrop} disable={disableUpload}/>
        
    </Hidden>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
          <DialogTitle id="form-dialog-title">Enter Caption</DialogTitle>
          <div className='upload_modal'>
            <img src={image} alt='' />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Caption"
              type="text"
              fullWidth
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={postDetails} color="primary">
              Upload
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={show} autoHideDuration={4000} onClose={handleSnackClose}  anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <Alert onClose={handleSnackClose} severity={severity}>
            {Message}
          </Alert>
        </Snackbar>
   </>
  )
}




const App = () => {
 

  return (
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
     
      
    
  );
}

export default App;