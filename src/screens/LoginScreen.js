import React,{useCallback} from 'react'
import Particles from 'react-tsparticles'
import {loadFull} from 'tsparticles'
import { TextField, Box, Paper, Typography } from '@mui/material'
import Particle from '../components/Particle'


const classes = {
    root:{
        position: "absolute",
        top: "20%",
        left: "40%"

    },
    login:{
     
    },
    loginInput:{
        width: "fitContent",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        backgroundColor: "#000",
        borderRadius: "0.5rem"
    },
    input:{
        margin: '10px',
        width: "20rem",
        input:{
            color: "#fff"
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#fff',
            }
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
        '&:hover fieldset': {
            borderColor: 'white',
          },
        '& label.Mui-focused': {
            color: 'white',
          },
    }
}

const LoginScreen = () => {

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);


  return (
    <Box sx={{...classes.root}}>
        <Particle />
        <Box sx={{...classes.login}} >
            <Typography variant='h3' style={{margin: "2rem", textAlign: "center", fontWeight: "bold"}}>AiVision</Typography>
            <Paper sx={{...classes.loginInput}} elevation={3}>
                <TextField 
                    variant='outlined'
                    label="UserName" 
                    sx={{...classes.input}}
                />
                <TextField variant="outlined" label="Password" sx={{...classes.input}} />
            </Paper>
        </Box>
    </Box>
    
  )
}

export default LoginScreen