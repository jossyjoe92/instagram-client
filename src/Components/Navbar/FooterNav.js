import React, {useEffect} from 'react';
import './FooterNav.css'
import HomeIcon from '@material-ui/icons/Home';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Loader from 'react-loader-spinner'
import WorkIcon from '@material-ui/icons/Work';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link,useHistory,NavLink } from 'react-router-dom'
import Dropzone from 'react-dropzone';

import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function FooterNav({onDrop,disable}) {
 const [{user}, dispatch ] = useStateValue ()

 
  return (
      <>
      {user && 
      <nav className="nav">
        <Link to="/" className="nav__link" >
            <HomeIcon/>
            <span className="nav__text">Home</span>
        </Link>
        <Link to="/usersearch" className="nav__link" >
                <SearchOutlinedIcon/>
          <span className="nav__text">Search</span>
        </Link>
    
        {/*
        <Link exact to="/createpost" className="nav__link" >
            <AddBoxOutlinedIcon />
            <span className="nav__text">Upload</span>
        </Link>
        */}
        {disable? <Loader  type="TailSpin" color="#00BFFF" height={30} width={30} />:
            <Dropzone onDrop={onDrop}>
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
            </Dropzone>
        }
        <Link to="/products" className="nav__link" >
            <ShoppingBasketIcon />
            <span className="nav__text">Product</span>
        </Link>
        <Link to="/services" className="nav__link" >
            <WorkIcon/>
            <span className="nav__text">Service</span>
        </Link>
    
    </nav>}
            
    </> 
    );
}

export default FooterNav;
