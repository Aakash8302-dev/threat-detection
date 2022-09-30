import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { Container, Typography, Box, IconButton, Button } from '@mui/material'
import Loader from '../components/Loader'
import firebase from "firebase/compat/app";
import {collection, addDoc, doc, deleteDoc ,Timestamp} from 'firebase/firestore'
import db from '../firebase'
import Map from '../components/Map'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const classes = {
    root:{
        padding: "1rem",
        color: "#bdbacc"
    },
    img:{
        height: "25rem",
        width: "25rem",
        objectFit: "cover",
        margin: "2rem 0",
        borderRadius: "1rem"
    },
    faces:{
        height: "15rem",
        borderRadius: "1rem",
        margin: "0.3rem"
    },
    suspectsSection:{
        margin: "1rem 0"
    },
    footer:{
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem 0"
    },
    approveBtn:{
        backgroundColor: "#bdbacc",
        color:"#000"
    }
}




const ThreatScreen = ({id}) => {

    const navigate = useNavigate()

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
            
            navigate('/home?screen=a1')
            window.location.reload()

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
                    <Button 
                        variant='contained' 
                        size="small" 
                        style={{backgroundColor: '#c356cb', color:"#000", fontWeight:"700"}} 
                        onClick={()=>{
                            navigate('/home?screen=a1')
                            window.location.reload()
                        }}
                    >
                        Back
                    </Button>
                    <Button size="small" variant="contained" sx={{...classes.approveBtn}}
                        onClick={() => handleApprove(data)}
                    >
                        <CheckCircleIcon /><Typography style={{margin: "0 10px"}} variant="subtitle2">Approve</Typography>
                    </Button>
                </Box>
            </> : <Loader />
        }
        
    </Container>
  )
}

export default ThreatScreen