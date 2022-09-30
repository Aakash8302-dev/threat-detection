import React,{useCallback, useState} from 'react'
import Particles from 'react-tsparticles'
import {loadFull} from 'tsparticles'
import { TextField, Box, Paper, Typography, Button, InputAdornment, IconButton} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'
import Particle from '../components/Particle'
import Alert from '../components/Alert'


const classes = {
    root:{
        position: "absolute",
        top: "20%",
        left: "38%"

    },
    login:{
     
    },
    loginInput:{
        width: "fitContent",
        display: "flex",
        flexDirection: "column",
        padding: "3rem",
        borderRadius: "16px",
        background: "rgba(247, 171, 255, 0.6)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter:" blur(8.3px)",
        border: "1px solid rgba(236, 122, 250, 0.3)"
    },
    input:{
        margin: '10px',
        width: "20rem",
        '& label.Mui-focused': {
            color: '#000',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#000',
        },
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#000',
        },
        '&:hover fieldset': {
            borderColor: '#000',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#000',
        },
        },
    },
    button:{
        backgroundColor: "#000", 
        marginTop:"1rem", 
        fontWeight:"700",
        fontSize: "1rem",
        '&:hover': {
            backgroundColor: '#1d1931',
            color: '#c356cb',
        }
    }
}

const LoginScreen = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        showPassword: false
    })

    const [notify, setNotify] = useState("")

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = () => {
        if(values.password === "aivision" && values.username === "aivision"){
            navigate('/home?screen=a1')
        }else{
            setNotify({
                isOpen: true,
                message: "Invalid user credentials",
                type: "error"
            })
        }
    }

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


  return (
    <Box sx={{...classes.root}}>
        <Particle />
        <Alert notify={notify} setNotify={setNotify} />
        <Box sx={{...classes.login}} >
            <Paper sx={{...classes.loginInput}} elevation={3}>
                <Typography variant='h2' style={{margin: "2rem", textAlign: "center", fontWeight: "700"}}>AiVision</Typography>
                <TextField 
                    variant='outlined'
                    label="UserName" 
                    value={values.username}
                    name="username"
                    autoComplete='off'
                    onChange={handleInputChange}
                    sx={{...classes.input}}
                />
                <TextField 
                    variant="outlined" 
                    id='outlined-adornment-password'
                    label="Password" 
                    value={values.password}
                    name="password"
                    inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                    }}
                    autoComplete='off'
                    type={"password"}
                    onChange={handleInputChange}
                    sx={{...classes.input}}
                />
                <Button onClick={handleSubmit} variant="contained" sx={{...classes.button}}>submit</Button>
            </Paper>
        </Box>
    </Box>
    
  )
}

export default LoginScreen