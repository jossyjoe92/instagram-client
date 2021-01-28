import React, {useState} from 'react';
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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory()
  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [Message, setMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


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
      }else if (!password) {
        setMessage('Password is required')
            setSeverity('error')
            setOpen(true);
        return
    }else if (password.length<7) {
      setMessage('Password must not be less than 7 characters')
          setSeverity('error')
          setOpen(true);
      return
  }else {
        fetch('https://citiwide.herokuapp.com/signup',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
              setMessage(`${data.error}`)
              setSeverity('error')
              setOpen(true);

            }else{
              setMessage('User Added Successfully')
              setSeverity('success')
              setOpen(true);
              setTimeout(function(){
                history.push('/signin')
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={PostData}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          
              <Link to="/signin">
              <Typography align="center" component="p" variant="p">
                Already have an account? Sign In
              </Typography>
              </Link>
            
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
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