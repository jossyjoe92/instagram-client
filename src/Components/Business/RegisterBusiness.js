import React, { useState, useEffect } from 'react'
import {useHistory,Link} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import WorkIcon from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import {useParams} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 12),
    },
  }));

function RegisterBusiness() {
    const {edit} = useParams()
    const [{user}, dispatch ] = useStateValue ()
    const classes = useStyles();
    const history = useHistory()
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [phone,setPhone]= useState('')
    const [location,setLocation]= useState('')
    const [address,setAddress]= useState('')
    const [description,setDescription]= useState('')
    const [open, setOpen] = useState(false);
    const [Message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

  function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  ;
  
    const handleClose = () => {
      setOpen(false);
    };
  

   useEffect(() => {
    if((user !== null)&& edit){
        fetch(`https://citiwide.herokuapp.com/business/${user?.businessRegistered}`,{
        
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
         setName(result.business.name)
         setEmail(result.business.email)
         setPhone(result.business.phone)
         setDescription(result.business.description)
         setLocation(result.business.location)
         setAddress(result.business.address)
        }).catch(err=>{
            console.log(err)
        }) 
      }
   }, []);
  
    const PostData = (e) =>{
        e.preventDefault()
        if (!name) {
            setMessage('Name field is required')
            setSeverity('error')
            setOpen(true);
            return
         }else if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Invalid Email')
            setSeverity('error')
            setOpen(true);
            return
          }else if (!phone) {
            setMessage('Phone field is required')
            setSeverity('error')
            setOpen(true);
            return
        }else if (!address) {
            setMessage('Address is required')
            setSeverity('error')
            setOpen(true);
            return
        }else if (!description) {
            setMessage('A brief description of your business is required')
            setSeverity('error')
            setOpen(true);
            return
        }
            fetch('https://citiwide.herokuapp.com/business/newbusiness',{
                method:'post',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    name,
                    phone,
                    location,
                    address,
                    description,
                    email,
                    
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    setMessage(`${data.error}`)
                    setSeverity('error')
                    setOpen(true);

                }else{
                   
                    localStorage.setItem("user",JSON.stringify(data.result))
                    dispatch({
                        type:actionTypes.Set_USER,
                        user: data.result
                    })
                    setMessage('Business Created Successfully')
                    setSeverity('success')
                    setOpen(true);
                    setTimeout(function(){
                      history.push('/profile')
                  }, 1000); 
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        
    const updateBusiness = (e) =>{
        e.preventDefault()
        if (!name) {
            setMessage('Name field is required')
            setSeverity('error')
            setOpen(true);
            return
         }else if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Invalid Email')
            setSeverity('error')
            setOpen(true);
            return
          }else if (!phone) {
            setMessage('Phone field is required')
            setSeverity('error')
            setOpen(true);
            return
        }else if (!address) {
            setMessage('Address is required')
            setSeverity('error')
            setOpen(true);
            return
        }else if (!description) {
            setMessage('A brief description of your business is required')
            setSeverity('error')
            setOpen(true);
            return
        }
            fetch('https://citiwide.herokuapp.com/business/updatebusiness',{
                method:'put',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    name,
                    phone,
                    location,
                    address,
                    description,
                    email,
                    
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    setMessage(`${data.error}`)
                    setSeverity('error')
                    setOpen(true);

                }else{
                    
                    setMessage('Business Updated Successfully')
                    setSeverity('success')
                    setOpen(true);
                   
                    setTimeout(function(){
                      history.push('/profile')
                  }, 1000); 
                  
                }
            }).catch(err=>{
                console.log(err)
            })
        }
           
    return (
       
       <div className='registerBusiness'>
       <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WorkIcon />
        </Avatar>
        
        <Typography component="h1" variant="h5">
        {!edit? <span>Register</span>:<span>Update</span>} Business
        </Typography>

        <form className={classes.form} noValidate onSubmit={PostData}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            value={name}
            label="Enter Business Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e)=>setName(e.target.value)}
          />
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>setEmail(e.target.value)}
           
          />
             <TextField
            variant="outlined"
            margin="normal"
            value={phone}
            required
            fullWidth
            id="phone"
            label="Enter Telephone"
            name="phone"
            autoComplete="phone"
            onChange={(e)=>setPhone(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={location}
            name="location"
            label="Location"
            type="text"
            id="password"
           
            onChange={(e)=>setLocation(e.target.value)}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={address}
            id="address"
            label="Enter Address"
            name="address"
            autoComplete="address"
            onChange={(e)=>setAddress(e.target.value)}
          />
             <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={description}
            id=""
            label="Short business description"
            name="description"
           
            onChange={(e)=>setDescription(e.target.value)}
          />
          {!edit?
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>:
          <Button
          onClick={updateBusiness}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
         Update
        </Button>
}
            
        </form>
      </div>
    
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Alert onClose={handleClose} severity={severity}>
          {Message}
        </Alert>
      </Snackbar>
    </Container>
       </div>
      
    )
}

export default RegisterBusiness;

