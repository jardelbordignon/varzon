import { useEffect, useState, useRef } from 'react'
import { LoadScript, GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api'
import { useDispatch } from 'react-redux'
import Axios from 'axios'

import LoadingBox from '../components/LoadingBox'
import { USER_ADDRESS_MAP_CONFIRM } from '../redux/user/userConsts'

const libs = ['places']

export default function Map(props) {
  const [centerMapPosition, setCenterMapPosition] = useState({lat:0, lng:0})
  const [markerPosition, setMarkerPosition] = useState({lat:0, lng:0})
  const [googleApiKey, setGoogleApiKey] = useState('')
  
  const mapRef = useRef(null)
  const placeRef = useRef(null)
  const markerRef = useRef(null)
  const dispatch = useDispatch()
  
  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada por esse browser')
    } else {
      navigator.geolocation.getCurrentPosition( currentPosition => {
        const position = {
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude
        }
        setCenterMapPosition(position)
        setMarkerPosition(position)
      })
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await Axios.get('/config/google')
      setGoogleApiKey(data)
      getUserCurrentLocation()
    }
    fetch()
  }, [])

  if (!googleApiKey) return <LoadingBox />

  const onLoad = map => mapRef.current = map
  const onMarkerLoad = marker => markerRef.current = marker
  const onLoadPlaces = place => placeRef.current = place
  
  const onIdle = () => {
    setMarkerPosition({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng()
    })
  }

  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location
    alert(place)
    setCenterMapPosition({ lat: place.lat(), lng: place.lng() })
  }

  const onConfirm = () => {
    const places = placeRef.current.getPlaces()
    if (places && places.length === 1) {
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: markerPosition.lat,
          lng: markerPosition.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAdressId: places[0].id
        }
      })
      alert('Ponto selecionado com sucesso: '+places[0].formatted_address)
      props.history.push('/shipping')
    } else {
      alert('Por favor informe seu endereço: '+places)
    }
  }

  return (
    <div className='full-container'>
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id='sample-map'
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={centerMapPosition}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className='map-input-box'>
              <input placeholder='Informe seu endereço' />
              <button type='button' className='primary' onClick={onConfirm}>
                Confirmar
              </button>
            </div>
          </StandaloneSearchBox>

          <Marker position={markerPosition} onLoad={onMarkerLoad} />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
