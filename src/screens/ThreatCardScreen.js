import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import ThreatCard from '../components/ThreatCard'
import { Box } from '@mui/material'

const ThreatCardScreen = ({data}) => {

    const navigate = useNavigate()

  return (
    <>
        {
            data && data ? 
                data.map((e, index) => {
                    return (
                        <Link onClick={() => {
                            navigate(`/home?screen=a2&id=${e.id}`)
                            window.location.reload()
                            }} 
                            style={{textDecoration: "none", color: "#000"}}
                        >
                            <ThreatCard key={index} index={index} date={e.data.date.seconds}  faces={e.data.faces} location={e.data.location} image={e.data.image} latitude={e.data.Latitude} longitude={e.data.Longitude}  />
                        </Link>
                    )
                })
            : <Loader />
        }
    </>
  )
}

export default ThreatCardScreen