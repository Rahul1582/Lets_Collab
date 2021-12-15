import { Navbar } from 'responsive-navbar-react';
import 'responsive-navbar-react/dist/index.css';

export default function Nav(){

  const props = {
    items: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'About',
        link: '/about'
      },
      {
        text: 'Login',
        link: '/login'
      },
      {
        text: 'Register',
        link: '/register'
      },
      {
        text: 'Logout',
        link: '/'
      }
    ],
    logo: {
      text: 'MERN CHAT Application'
    },

    style: {
      barStyles: {
        background: '#282828',
        buttonColor: '#4664ff'
        
      }
      ,
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white'
      },
      linkStyles: {
        color: 'white',
        fontSize: '25px',
        fontFamily: 'Bakbak One'
      },
      logoStyles: {
        fontSize: '25px',
        color: 'white',
        fontFamily:'Bakbak One'
      }
    }
  }

  return (
    <div className="home">
    	<Navbar {...props}/>
    </div>
  )
}