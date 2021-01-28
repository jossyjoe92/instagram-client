import React, {useState,useRef,useEffect} from 'react'
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Business.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import upload from '../../Assets/upload.webp'
import Loader from 'react-loader-spinner'

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
      margin: theme.spacing(3, 0, 22),
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

function CreatePost() {
  
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [Message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const history= useHistory()
    const [{user}, dispatch ] = useStateValue ()
    const [title,setTitle]= useState('')
    const [description,setDescription]= useState('')
    const [price,setPrice]= useState('')
    const [category,setCategory]= useState('')
    const [subCategory,setSubCategory]= useState('')
    const [image, setImage] = useState();
    const [imgUrl, setImgUrl] = useState(upload);
    const [isLoading, setIsLoading] = useState(null)
   
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
        
        const handleClose = () => {
            setOpen(false);
          };

 
      useEffect(() => {
        if(!image){
            return
        }
        else if(image)
          setIsLoading(true)
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "jossyjoe")
          fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload",{
            method: "post",
            body: data
          })
          .then(res=>res.json())
          .then(data=>{
           
            setImgUrl(data.url)
            setIsLoading(false)

        })
      
          .catch(err=>{
            console.log(err)
          })
                
        
      }, [image])


    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (!title) {
            setMessage('Please enter Product or Service name')
            setSeverity('error')
            setOpen(true);
            return
         }else if (!category) {
            setMessage('Please select a Category')
            setSeverity('error')
            setOpen(true);
            return
          }else if (!subCategory) {
            setMessage('Please Select a Sub-Category')
            setSeverity('error')
            setOpen(true);
            return
          }else if (!description) {
            setMessage('Enter brief Description of Product or Service')
            setSeverity('error')
            setOpen(true);
            return
          }else if (!imgUrl) {
            setMessage('No Image Selected')
            setSeverity('error')
            setOpen(true);
            return
        }
  
     fetch('https://citiwide.herokuapp.com/createbusinesspost',{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title,
            category,
            subCategory,
            price,
            description,
            imgUrl,
            business:user.businessRegistered
        })
        }) 
     .then(res=>res.json())
     .then(data =>{
         if(data.error){
            setMessage(`${data.error}`)
            setSeverity('error')
            setOpen(true);
         }else{
            
            setMessage('Post Created Successfully')
            setSeverity('success')
            setOpen(true);
            setIsLoading(false)
            setTimeout(function(){
              history.push('/businessprofile')
          }, 1000); 
          
         }
      
       })
       .catch(err => console.log(err));
    }

    const updatePic = (file)=>{
      setImage(file)
      
  }


    return (
        <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <WorkIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5">
            Business Post
          </Typography>
  
          <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              value={title}
              label="Enter Name of Product/Service"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e)=>setTitle(e.target.value)}
            />
          
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={category}
                onChange={(event)=>setCategory(event.target.value)}
                label="Category"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value='Product'>Product</MenuItem>
                <MenuItem value='Service'>Service</MenuItem>
                
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl} disabled={category?false:true}>
                <InputLabel htmlFor="outlined-age-native-simple">Select Sub-Category</InputLabel>
                <Select
                    native
                    value={subCategory}
                    onChange={(e)=>setSubCategory(e.target.value)}
                    label="Sub-Category"
                    inputProps={{
                        name: 'subCategory',
                        id: 'outlined-sub-category',
                    }}
                    >
                    <option aria-label="None" value="" />
                    {category==='Product'?
                    <>
                            <option value="Automobile">Automobiles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Phones">Phones and Accessory</option>
                            <option value="Shoes-Wears">Shoes and wears</option>
                            <option value="Furnitures">Furnitures</option>
                            <option value="AcademicMaterials">Educational Materials</option>
                            <option value="Agric">Agriculture and Food</option>
                            <option value="Sports">Sports Equipment</option>
                            <option value="Kids">Babies and Kids</option>
                            <option value="Animals">Animals and Pets</option>
                     </>:category==='Service'&&
                        <>
                            <option value="Housing">Housing and Property</option>
                            <option value="Hospitalty">Hotels and Suites</option>
                            <option value="Restaurants">Eatery and Restaurants</option>
                            <option value="HairStylist">Hair Styling</option>
                            <option value="FashionDesign">Fashion Designer</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Catering">Catering and Baking</option>
                            <option value="Schools">Schools</option>
                            <option value="Health">Health Service</option>
                            <option value="Carpentary-Woodwork">Carpentary and Wood work</option>
                        </>
                     }
                   
                    </Select>
                </FormControl>
           
            <TextField
            
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={price}
              name="price"
              label="Enter Price if applicable"
              type="number"
              id="price"
             
              onChange={(e)=>setPrice(e.target.value)}
            />
            
               <TextField
                 disabled={category?false:true}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={description}
              id=""
              label={`Short ${category} description`}
              name="description"
             
              onChange={(e)=>setDescription(e.target.value)}
            />
            <div className='imageUpload'>
            {isLoading?
                        <div ><img src={imgUrl} alt='' /><Loader className='loader' type="TailSpin" color="#00BFFF" height={40} width={40} style={{marginLeft:'80px'}} /> </div>:
                        <img src={imgUrl} alt='' />
                     }
                   
              
            <input type="file" accept="image/*"  id="input" onChange={e=>updatePic(e.target.files[0])} />
					  <div className="businessInputLabel">
                <label className="image-upload_label" htmlFor="input">
                    <AddAPhotoIcon className='addimage_icon' fontSize='large' />
					      </label>
              </div>
            </div>
          
          
            <Button
            disabled={isLoading?true:false}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Upload
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
     
       
        </>
    )
}

export default CreatePost
