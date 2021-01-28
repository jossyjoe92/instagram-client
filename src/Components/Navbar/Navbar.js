import React,{useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import logo from '../../Assets/instagram.png'
import { Button, Avatar, makeStyles, Modal, Input } from "@material-ui/core";
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Dropzone from 'react-dropzone';
import Hidden from '@material-ui/core/Hidden';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import {SearchOutlined } from '@material-ui/icons'
import SearchUser from '../Reuseables/SearchUser'
import WorkIcon from '@material-ui/icons/Work';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));
  
function Navbar({onDrop}) {
    const [{user,showTopNav,showSearchUser}, dispatch ] = useStateValue ()
    const history = useHistory()
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [searchUser,setSearchUser] = useState('')

  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
   
 
  return showTopNav && (
 
        <div className="app_header">{/*navbar css at app.css */}
             <Link to={user? '/':'/signin' } className="brand-logo left">citiwide 
            </Link>
          { user?
            <>
              {
                showSearchUser && 
                  <Hidden xsDown>
                    <div className='user_search'>
                      
                      <div className='user_searchContainer'>
                        
                          <SearchUser />
                        
                      </div>
                    </div>
                  </Hidden>

              }
               
                <ul className='nav_items'>
                  <Hidden smDown>
                  <li> <div className="nav__link" style={{padding:'8px',outline:'none'}} onClick={()=>history.push('/')}><HomeIcon /><span className="nav__text">Home</span></div></li>
                    <li><Dropzone onDrop={onDrop}>
    {({ getRootProps, getInputProps }) => (
        <section>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="nav__link" style={{padding:'8px',outline:'none'}}>
                
                <AddBoxOutlinedIcon />
                <span className="nav__text">Upload</span>
                 
                </div>
            </div>
        </section>
    )}
</Dropzone></li>
                    
                    <li> <div className="nav__link" style={{padding:'8px',outline:'none'}} onClick={()=>history.push('/products')}><ShoppingBasketIcon /><span className="nav__text">Products</span></div></li>
                    <li><div className="nav__link" style={{padding:'8px',outline:'none'}}  onClick={()=>history.push('/services')}><WorkIcon/><span className="nav__text">Services</span></div></li>
                  </Hidden>
                    <li className='nav_avatar'>
                            <Avatar src={user.photo}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            />
                    </li>
              
                </ul>
                      
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                  <Grow
                   {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                   <Paper >
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                            <MenuItem onClick={()=>{
                              history.push('/profile')
                              setOpen(false)
                          }
                          }><AccountCircleRoundedIcon /><h4> Profile</h4> </MenuItem>
                          <MenuItem onClick={handleClose}><SettingsIcon /> <h4>My account</h4></MenuItem>
                          <hr />
                          <MenuItem  onClick={()=>{
                            setOpen(false)
                       
                            localStorage.clear()
                            dispatch({
                            type:actionTypes.Set_USER,
                            user: null
                        })
                        history.push('/signin')
                     
                        } 
                        }><ExitToAppIcon /> <h4>Logout</h4>
                      </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
               </>: 
               
               <div className='nav_nouser'>
                    <Button onClick={()=>history.push('/signin')}>Sign in</Button>
                    <Button onClick={()=>history.push('/signup')}>Sign Up</Button>
                   
                </div>
          }
         
        </div>
  
  );
}

export default Navbar;
