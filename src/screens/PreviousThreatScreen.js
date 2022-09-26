import React,{useState, useEffect} from 'react'
import {Link } from 'react-router-dom'
import ThreatCard from '../components/ThreatCard'
import { Container, Typography, Box } from '@mui/material'
import db from '../firebase'
import Loader from '../components/Loader';


const classes = {
    root:{
        padding: "2rem 1rem",
    },
}

const PreviousThreatScreen = () => {

    const [data,setData] = useState();

    const getData = () => {
        db.collection("ApprovedThreats").onSnapshot((snapshot) => {
          setData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }

    useEffect(() => {
        getData();
    },[])

  return (
    <Container style={{...classes.root}}>
        <Typography variant='h5' style={{fontWeight: "bold"}}>Previous Alerts</Typography>
        {
            data && data ? <Box>
                {   
                    data.map((e, index) => (
                        <Link to={`/approvedthreat/${e.id}`} style={{textDecoration: "none", color: "#000"}}>
                        
                             <ThreatCard key={index} index={index} date={new Date(e.data.date.timestampValue).getTime() / 1000} faces={e.data.faces.stringValue} location={e.data.location.stringValue} image={e.data.image.stringValue}  />
                        </Link>
                    ))
                }
            </Box> : <Loader />
        }
        
    </Container>
  )
}

export default PreviousThreatScreen