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




const ThreatScreen = ({params}) => {

    const navigate = useNavigate()

    const {id} = useParams()

    const [data, setData] = useState()

    useEffect(() => {
        const t = db.collection('Information').doc(id).onSnapshot((snapshot) =>{
            setData(snapshot._delegate._document.data.value.mapValue.fields)
          });
    },[id])


    const handleApprove = async (e) => {
        
        try {

            const deleteRef = doc(db, "Information", id)
            await deleteDoc(deleteRef)

            const res = await addDoc(collection(db,'ApprovedThreats'), {
                location: e.location,
                date: e.date,
                faces: e.faces,
                image: e.image,
            })  
            
            navigate('/')

        } catch (error) {
            alert(error)
        }
    }

  return (
    <Container sx={{...classes.root}}>
        {
            data && data ? <>
                <Typography variant='h6' style={{fontWeight: 600}}>TIMESTAMP:  
                        <span style={{fontWeight: 100, margin: "0 0.5rem"}}>{new Date(new Date(data.date.timestampValue).getTime()).toLocaleString()}</span>
                </Typography>
                <Typography variant='h6' style={{fontWeight:600}}>Location: 
                    <span style={{fontWeight: 100, margin: "0 0.5rem"}}>{data.location.stringValue}</span>  
                </Typography>
                <img src={data.image.stringValue} alt={"sdfsdf"}  style={{...classes.img}}/>
                
                <Box sx={{...classes.suspectsSection}} >
                    <Typography variant='h5' style={{fontWeight:600}}>Suspects Detected</Typography>
                    <img src={data.faces.stringValue} alt={"dfdsf"} style={{...classes.faces}}  />
                </Box>
                <Box sx={{...classes.footer}}>
                    <Button variant='contained' size="small" style={{backgroundColor: '#000'}} onClick={()=> navigate('/')}>
                        Back
                    </Button>
                    <Button size="small" variant="contained" sx={{...classes.approveBtn}} onClick={() => handleApprove(data)} >
                        <CheckCircleIcon /><Typography style={{margin: "0 10px"}} variant="subtitle2">Approve</Typography>
                    </Button>
                </Box>
            </> : <Loader />
        }
        
    </Container>
  )
}

export default ThreatScreen