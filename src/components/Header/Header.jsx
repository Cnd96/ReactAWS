import React from 'react';
import './header.styles.scss';
import { Link } from "react-router-dom";
const Header = (props) => {
  return(
  <div className="header" style={{borderBottom:"0.5px solid  #D3D3D3",
   background:'linear-gradient(to right  , rgba(0, 0, 0, 1),#b71c1c'}}>
    <Link style={{fontFamily:"century gothic",color:"white",fontSize:'2.2vw',
      padding:"1vw",marginLeft:"2vw",textDecoration:'none'}} className='logo-container' 
      to="/belapps" 
    > 
      BEL APPS
    </Link>
    <div className='options'>
     
      <h5 className='option'style={{fontSize:'1.3vw', fontFamily:"century gothic",color:"white"}} >
        {props.appName}
      </h5>
    </div>
  </div>
  );
}
export default Header;