import React, { useEffect, useState } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { Marker } from 'react-leaflet'
import L from 'leaflet'

//components
import InnerContent from 'src/container/InnerContent'

//icons
import { WarehouseLightBlue } from 'src/utils/Icons'

function KiosksMap({ history, location }) {
  const [situation, setSituation] = useState(null)

  useEffect(() => {
    setSituation(location['state'])
  }, [])

  return (
    <InnerContent p="p-0" w="w-full" h="h-full" position="relative">
      {/* kiosk */}
      <div className="w-full h-full">
        <Map center={[35.6892, 51.389]} zoom={12} zoomControl={false} maxBoundsViscosity={1.0}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[situation?.latitude || 0, situation?.longitude || 0]}
            icon={
              new L.Icon({
                iconUrl: WarehouseLightBlue,
                iconRetinaUrl: WarehouseLightBlue,
                iconAnchor: null,
                popupAnchor: null,
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null,
                iconSize: new L.Point(60, 75),
                className: 'leaflet-marker-icon-active',
              })
            }
          />
        </Map>
      </div>
    </InnerContent>
  )
}
export default KiosksMap
