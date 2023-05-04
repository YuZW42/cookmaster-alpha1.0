import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth"
import axios from "axios"
import './Login.css'


function Login (props) {
  const [email, setEmail] = useState()
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      // window.location.href = '/Home'
       console.log('user id', sessionStorage.getItem('user'))
    }
  }, [])

  const handleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        sessionStorage.setItem('user', `${result.user.email}`)
        axios.post('firebase/user', {email: result.user.email}).then((res) => {
            console.log(res.data)
        })
        window.location.href = '/'
    }).catch((error) => {
        console.log(error)
    });
  }

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        sessionStorage.removeItem('user');
        window.location.href = '/';
    }).catch((error) => {
        console.log(error)
    });
  }

  return (
    <div>
      <>
      <button onClick={handleLogout} className='button'>Log out</button>
      </>
      <button onClick={handleLogin} className='button'>Log in</button>

  </div>
);
}

export default Login;