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
      text: 'CHAT Application'
    },

    style: {
      barStyles: {
        background: '#121212',
      },
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white'
      },
      linkStyles: {
        color: 'white',
        fontSize: '25px',
        fontFamily: [
          'Nunito',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ].join(','),
      },
      logoStyles: {
        fontSize: '25px',
        color: 'white',
        fontFamily: [
          'Nunito',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ].join(','),
      }
    }
  }

  return (
    <div className="home">
    	<Navbar {...props}/>
    </div>
  )
}