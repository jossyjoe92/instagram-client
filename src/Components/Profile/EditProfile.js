import React, {useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStateValue } from '../../StateProvider';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { actionTypes } from '../../reducer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/">
        <span style={{color:'inherit'}}>
          Citiwide.com
        </span>
        
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    margin: theme.spacing(3, 0, 8),
  },
}));

export default function SignUp() {
    const [{user}, dispatch ] = useStateValue ()
  const classes = useStyles();
  const history = useHistory()
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [about,setAbout]= useState('')
  const [Message, setMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false);


useEffect(() => {
  setName(user?.name)
  setEmail(user?.email)
  setAbout(user?.about)
}, []);

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


  const PostData = (e) =>{
      e.preventDefault()
   console.log(name,email,about)
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
      }else if (!about) {
        setMessage('About field is required')
            setSeverity('error')
            setOpen(true);
        return

  }else {
        fetch('https://citiwide.herokuapp.com/editprofile',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name,
                about,
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
              setMessage(`${data.message}`)
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
    
}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={PostData}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={name}
            id="name"
            label="Enter Name"
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
            required
            fullWidth
            name="about"
            label="Bio"
            id="about"
            autoComplete="about"
            value={about}
            onChange={(e)=>setAbout(e.target.value)}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
          
            
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
  );
}