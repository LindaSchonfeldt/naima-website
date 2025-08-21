import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet default icon paths for Vite builds
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png'
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'
L.Icon.Default.mergeOptions({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl
})

const Wrap = styled.section`
  width: min(1200px, 92vw);
  margin: 0 auto;

  .leaflet-container {
    width: 100%;
    height: clamp(320px, 60vh, 600px);
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    overflow: hidden;
  }
`

// Arrow component that fits bounds to all coordinates
const FitBounds = ({ points }) => {
  const map = useMap()
  useEffect(() => {
    if (!points?.length) return
    const bounds = points.reduce(
      (b, [lng, lat]) => b.extend([lat, lng]),
      L.latLngBounds()
    )
    map.fitBounds(bounds, { padding: [20, 20] })
  }, [points, map])
  return null
}

const RetailerMap = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    // Fastest: serve the file from frontend/public/data/retailers.geocoded.json
    fetch('src/data/geocodedRetailers.json')
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : (data.items ?? [])))
      .catch(() => setItems([]))
  }, [])

  const coords = useMemo(
    () => items.map((i) => i.location?.coordinates).filter(Boolean),
    [items]
  )

  return (
    <Wrap aria-label="Retail partners map">
      <MapContainer center={[59.334, 18.063]} zoom={11} scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={coords} />

        {items.map((i) => {
          const [lng, lat] = i.location.coordinates
          const addr = i.fullAddress || `${i.street}, ${i.city}`
          const dir = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            addr
          )}`

          return (
            <Marker key={`${i.brand}-${i.name}-${lat}`} position={[lat, lng]}>
              <Popup>
                <strong>{i.name}</strong>
                <br />
                {addr}
                <br />
                <a href={dir} target="_blank" rel="noreferrer">
                  Directions
                </a>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </Wrap>
  )
}

export default RetailerMap
