import L from 'leaflet'
// Keep Leaflet default icon working if a brand icon is missing
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import styled, { useTheme } from 'styled-components'

import 'leaflet/dist/leaflet.css'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

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

const FitBounds = ({ points }) => {
  const map = useMap()
  useEffect(() => {
    if (!points?.length) return
    const bounds = points.reduce((b, [lng, lat]) => b.extend([lat, lng]), L.latLngBounds())
    map.fitBounds(bounds, { padding: [20, 20] })
  }, [points, map])
  return null
}

// Inline SVG pin generator
const makeSvgPin = ({ label = '•', fill = '#F7CDD0', text = '#1e293b' }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
      <path d="M16 0c8.8 0 16 6.9 16 15.4 0 10.7-11.9 20.9-15 31.9-.3 1.1-1.7 1.1-2 0C11.9 36.3 0 26.1 0 15.4 0 6.9 7.2 0 16 0z" fill="${fill}"/>
      <text x="16" y="19" font-size="12" text-anchor="middle" fill="${text}"
            font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-weight="700">${label}</text>
    </svg>`
  const url = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
  return L.icon({ iconUrl: url, iconSize: [32, 48], iconAnchor: [16, 46], popupAnchor: [0, -38] })
}

// Pick black/white text for contrast against light pastels
const getTextOn = (hex) => {
  const h = (hex || '#ffffff').replace('#','')
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16)
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255
  return luminance > 0.6 ? '#1e293b' : '#ffffff'
}

const RetailerMap = () => {
  const [items, setItems] = useState([])
  const theme = useTheme()

  useEffect(() => {
    // Ensure file exists at frontend/public/data/geocodedRetailers.json
    fetch('/data/geocodedRetailers.json')
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : (data.items ?? [])))
      .catch(() => setItems([]))
  }, [])

  // Brand → color mapping using Naima palette
  const brandIcons = useMemo(() => {
    const palette = {
      primary:  theme?.colors?.brand?.primary  || '#BCE8C2',
      blush:    theme?.colors?.brand?.blush    || '#F7CDD0',
      salmon:   theme?.colors?.brand?.salmon   || '#F4A6A3',
      lavender: theme?.colors?.brand?.lavender || '#D0C3F1',
      sky:      theme?.colors?.brand?.sky      || '#B3D9F3',
    }

    const fills = {
      '7-Eleven':    palette.primary,
      'Hawaii Poké': palette.sky,
      'Mocca Deli':  palette.salmon,
      'PBX':         palette.lavender
    }

    const pin = (label, fillHex) => makeSvgPin({ label, fill: fillHex, text: getTextOn(fillHex) })

    return {
      default: pin('•', palette.blush),
      '7-Eleven':    pin('7',  fills['7-Eleven']),
      'Hawaii Poké': pin('HP', fills['Hawaii Poké']),
      'Mocca Deli':  pin('M',  fills['Mocca Deli']),
      'PBX':         pin('P',  fills['PBX'])
    }
  }, [theme])

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
          const dir = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`
          const icon = brandIcons[i.brand] || brandIcons.default

          return (
            <Marker key={`${i.brand}-${i.name}-${lat}`} position={[lat, lng]} icon={icon} title={i.name}>
              <Popup>
                <strong>{i.name}</strong><br />
                {addr}<br />
                <a href={dir} target="_blank" rel="noreferrer">Directions</a>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </Wrap>
  )
}

export default RetailerMap
