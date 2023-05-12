import React from 'react'
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function GoogleLoginButton() {
 
 
  const[firstName, setFirstName] = useState();
  const[lastName, setLastName] = useState();
  const[emailGoogle, setEmailGoogle] = useState();
  const[googlePassword, setgooglePassword] = useState();

  

  const[open, setOpen]= useState(false);
  const[message, setmessage]= useState();
   
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );



 

  const onLoginSuccess = (res)=> {

    gapi.load('client:auth2', () => {
      gapi.auth2.init({
          clientId: clientId
      })
  })



    console.log(res.profileObj);
  setFirstName(res.profileObj.givenName);
  setLastName(res.profileObj.familyName);
  setEmailGoogle(res.profileObj.email);
  setgooglePassword(res.profileObj.googleId);
  
  localStorage.setItem('profile', res.profileObj.imageUrl);
  localStorage.setItem('lastname', res.profileObj.familyName);
}

const onLoginFailure = (res)=> {

  console.log(res.profileObj);
}


const clientId = "151312583537-a4c84kqo8v2vjmm4gn8b7ine9492v814.apps.googleusercontent.com";


const navigate = useNavigate();
  

            axios.post('http://localhost:8080/user/socialLogin', {
              firstName: firstName,
              lastName: lastName,
              email: emailGoogle,
              password: googlePassword,
              userRoll: "Customer",
              userName: firstName
            }).then(result => {
                
              console.log(result.data)

            localStorage.setItem('Token', result.data.accessToken);
            localStorage.setItem('username', result.data.username);
            localStorage.setItem('email', result.data.email);
            localStorage.setItem('roles',result.data.roles);
            localStorage.setItem('userId', result.data.id)

            setOpen(true);
            setmessage('login successfully');
             


             
                    navigate('/home');
                 

            })
              .catch(error => {
                
                 
              console.log(error.message)
            
    })
 
 
    
  return (
    <div>
     
        <h5 style={{marginTop:2}}>or</h5>
         
      <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    style={{border:"none",borderRadius:5,fontSize:16, fontWeight: "bold", backgroundColor:'#4285f4',color:"#fff"}}
                     
                />

                <br/>
                <br/>

<Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
       }}
        action={action}
      />
      

 


    </div>
  )
}

export default GoogleLoginButton
