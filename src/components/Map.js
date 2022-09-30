import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = () => {

  return (
    <div style={{ height: '500px', width: '500px', zIndex: 1 }}>
      <MapContainer center={[40.505, -100.09]} zoom={13} >
            <TileLayer/>
            <Marker position={[40.505, -100.09]}>
                <Popup>
                    I am a pop-up!
                </Popup>
            </Marker>
        </MapContainer>
    </div>
  )
}

export default Map