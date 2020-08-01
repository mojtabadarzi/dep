import React from 'react'

import { Marker } from 'react-leaflet'
import L from 'leaflet'

function MarkerMap(props) {
  const { position, icon, activeMarkerTabIndex, changeTab } = props

  return (
    <>
      {position.map((pos) => {
        const { id, latitude, longitude } = pos
        return (
          <Marker
            key={id}
            position={[latitude, longitude]}
            icon={
              new L.Icon({
                iconUrl: icon,
                iconRetinaUrl: icon,
                iconAnchor: null,
                popupAnchor: null,
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null,
                iconSize: new L.Point(60, 75),
                className:
                  activeMarkerTabIndex === id
                    ? 'leaflet-marker-icon-active'
                    : 'leaflet-marker-icon',
              })
            }
            onClick={() => changeTab(id)}
          />
        )
      })}
    </>
  )
}
export default MarkerMap
