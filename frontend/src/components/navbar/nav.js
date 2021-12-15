// import { Navbar } from 'responsive-navbar-react';
// import 'responsive-navbar-react/dist/index.css';

// export default function Nav(){

//   const props = {
//     items: [
//       {
//         text: 'Home',
//         link: '/'
//       },
//       {
//         text: 'About',
//         link: '/about'
//       },
//       {
//         text: 'Login',
//         link: '/login'
//       },
//       {
//         text: 'Register',
//         link: '/register'
//       },
//       {
//         text: 'Logout',
//         link: '/'
//       }
//     ],
//     logo: {
//       text: 'MERN CHAT Application'
//     },

//     style: {
//       barStyles: {
//         background: '#282828',
//         buttonColor: '#4664ff'
        
//       }
//       ,
//       sidebarStyles: {
//         background: '#222',
//         buttonColor: 'white'
//       },
//       linkStyles: {
//         color: 'white',
//         fontSize: '25px',
//         fontFamily: 'Bakbak One'
//       },
//       logoStyles: {
//         fontSize: '25px',
//         color: 'white',
//         fontFamily:'Bakbak One'
//       }
//     }
//   }

//   return (
//     <div className="home">
//     	<Navbar {...props}/>
//     </div>
//   )
// }

import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./nav.css";


export default function Header() {

  const [loggedin , setloggedin] = useState(false);


  useEffect(() => {

    if(localStorage.getItem("loggedin")==='true'){
    
      if(!loggedin){
        setloggedin(true);  
      }
    }

    if(localStorage.getItem("loggedin")==='false'){
     
      if(loggedin){
        setloggedin(false);
      }
     
  }

}, [loggedin]);


  if(loggedin){
    
  return (

    <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-lg font">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupported" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

    <div className="collapse navbar-collapse" id="navbarSupported">
    
    <ul className="navbar-nav mr-auto">
      <li className="navbar-item font active">
      <Link to="/" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Home</Link>
      </li>   

      
      <li className="navbar-item font">
      <Link to="/details" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Details</Link>
      </li>  

      <li className="navbar-item font">
      <Link to="/details" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Login</Link>
      </li> 

      <li className="navbar-item font">
      <Link to="/sign-up" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Register</Link>
      </li>     


      <li className="navbar-item font">
      <Link to="/" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" 
      onClick={() => {

      localStorage.setItem('loggedin',false);
      window.localStorage.removeItem("usertoken");
      window.location = "/";
      }}> Logout</Link>
      </li>

    </ul>
    </div>
  </nav> 

  );
}


else{

  return (

    <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-lg font">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupported" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

    <div className="collapse navbar-collapse" id="navbarSupported">

    <img src="https://i.ibb.co/6XzzZb8/mylogo.png" width="100" height="100" class="d-inline-block align-center" alt="" loading="lazy"/>

    <ul className="navbar-nav mr-auto">
    <li className="navbar-item font active">
    <Link to="/" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Home</Link>
    </li>   

    
    <li className="navbar-item font">
    <Link to="/details" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Details</Link>
    </li>  

    <li className="navbar-item font">
    <Link to="/sign-up" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Register</Link>
    </li>     

          <li className="navbar-item font">
    <Link to="/sign-in" className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Login</Link>
    </li>

    
    </ul>
    </div>
  </nav> 



  );

}

}