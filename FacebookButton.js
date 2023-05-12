import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
export default function FacebookButton() {
  const navigate = useNavigate();
  const responseFacebook = (response) => {

    localStorage.setItem('profile', response.picture.data.url);

    axios.post('http://localhost:8080/api/auth/socialLogin', {

      email: response.email,
      password: response.id,
      role: "user",
      username: response.name

    }).then(result => {
      setopenmessage(true)
      setmessage("Login SuccessFully")
      console.log(result.data)
      console.log(result.data);
      localStorage.setItem('username', result.data.email);
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('Role', result.data.role);
      localStorage.setItem('userId', result.data.id);

      setTimeout(function () {
        navigate('/home');
      }, 2000);

    })
      .catch(error => {

        console.log(error.message)
      })

  }
  const handlemessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopenmessage(false);
  };
  const [openmessage, setopenmessage] = React.useState(false);
  const [message, setmessage] = useState('');
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handlemessage}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handlemessage}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <FacebookLogin
        appId="3109137125899182"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />

      <Snackbar
        open={openmessage}
        autoHideDuration={6000}
        onClose={handlemessage}
        message={message}
        action={action}
      />
    </div>
  )

}