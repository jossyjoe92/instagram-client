import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link,useHistory} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import MuiAlert from '@material-ui/lab/Alert';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        citiwide.com
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
  }
}));

export default function SignIn() {

    const [{user}, dispatch ] = useStateValue ()
    const history = useHistory()
    const [show, setShow] = useState(false);
  const classes = useStyles();
  const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [Message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShow(false);
      };
    const PostData = (e) =>{
        e.preventDefault()
        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Invalid Email')
            setSeverity('error')
            setShow(true);
               return
             }else if (!password) {
                setMessage('Password is required')
                setSeverity('error')
                setShow(true);
               return
           }
            
           fetch('https://citiwide.herokuapp.com/signin',{
               method:'post',
               headers:{
                   "Content-Type":"application/json"
               },
               body:JSON.stringify({
                   email,
                   password,
                   
               })
           }).then(res=>res.json())
           .then(data=>{
              
               if(data.error){
                setMessage(`${data.error}`)
                setSeverity('error')
                setShow(true);
   
               }else{
                   localStorage.setItem("jwt", data.token)
                   localStorage.setItem("user",JSON.stringify(data.user))
                   dispatch({
                       type:actionTypes.Set_USER,
                       user: data.user
                   })
                   setShow(true);
                   setMessage(`welcome ${data.user.name}`)
                    setSeverity('success')
                    
                    setTimeout(function(){
                      setShow(false)
                        history.push('/')
                    }, 2000); 
               }
           }).catch(err=>{
               console.log(err)
           })
       }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={PostData}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

      <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{
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