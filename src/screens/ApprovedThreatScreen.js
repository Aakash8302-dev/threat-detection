import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { Container, Typography, Box, IconButton, Button } from '@mui/material'
import Loader from '../components/Loader'
import firebase from "firebase/compat/app";
import {collection, addDoc, doc, deleteDoc ,Timestamp} from 'firebase/firestore'
import db from '../firebase'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const classes = {
    root:{
        padding: "1rem"
    },
    img:{
        height: "30rem",
        width: "30rem",
        objectFit: "cover",
        margin: "2rem 0"
    },
    faces:{
        height: "15rem"
    },
    suspectsSection:{
        margin: "1rem 0"
    },
    footer:{
        display: "flex",
        justifyContent: "space-between",
        margin: "3rem 0"
    },
    approveBtn:{

    }
}




const ThreatScreen = () => {

    const navigate = useNavigate()

    const {id} = useParams()

    const [data, setData] = useState()

    useEffect(() => {
        db.collection('ApprovedThreats').doc(id).onSnapshot((snapshot) => {
            setData(snapshot._delegate._document.data.value.mapValue.fields)
          });
    },[id])


    

  return (
    <Container sx={{...classes.root}}>
        {
            data && data ? <>
                <Typography variant='h5'>TIMESTAMP: { new Date(new Date(data.date.mapValue.fields.timestampValue.stringValue).getTime()).toLocaleString()}</Typography>
                <Typography variant='h5'>Location: {data.location.mapValue.fields.stringValue.stringValue}</Typography>
                <img src={data.image.mapValue.fields.stringValue.stringValue} alt={"sdfsdf"}  style={{...classes.img}}/>
                
                <Box sx={{...classes.suspectsSection}} >
                    <Typography variant='h5'>Suspects Detected</Typography>
                    <img src={data.faces.mapValue.fields.stringValue.stringValue} alt={"dfdsf"} style={{...classes.faces}}  />
                </Box>
                <Box sx={{...classes.footer}}>
                    <Button variant='contained' size="small" style={{backgroundColor: '#000'}} onClick={()=> navigate('/approved')}>
                        Back
                    </Button>
                </Box>
            </> : <Loader />
        }
        
    </Container>
  )
}

export default ThreatScreen