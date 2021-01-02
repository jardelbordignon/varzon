import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../redux/cart/cartActions'

export default function Shipping(props) {
  const { userInfo } = useSelector( state => state.userSignin )
  if (!userInfo) props.history.push('/signin')
  
  const { shippingAddress } = useSelector( state => state.cart )
  const { address: addressMap } = useSelector( state => state.userAddressMap )
  
  const [shippingState, setShippingState] = useState(shippingAddress)
  
  const dispatch = useDispatch()

  function submitHandler(e) {
    e.preventDefault()

    if (addressMap)
      setShippingState({ ...shippingState, lat: addressMap.lat, lng: addressMap.lng })
    
    let moveOn = true
    if (shippingState.lat !== 0)
      moveOn = window.confirm('Você não definiu sua localização no mapa. Continuar mesmo assim?')
    
    if (moveOn) {
      dispatch(saveShippingAddress(shippingState))
      props.history.push('/payment')
    }
  }

  function chooseOnMap() {
    dispatch(saveShippingAddress(shippingState))
    props.history.push('/map')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className='form' onSubmit={submitHandler}>
        <div><h1>Endereço de Entrega</h1></div>
        <div>
          <label htmlFor='fullName'>Nome completo</label>
          <input id='fullName' placeholder='Informe seu nome completo' required
            value={shippingState.fullName}
            onChange={e => setShippingState({...shippingState, fullName: e.target.value})} />
        </div>
        <div>
          <label htmlFor='street'>Logradouro</label>
          <input id='street' placeholder='Ex.: Avenida Flores da Cunha' required
            value={shippingState.street}
            onChange={e => setShippingState({...shippingState, street: e.target.value})} />
        </div>
        <div>
          <label htmlFor='number'>Numero</label>
          <input id='number' placeholder='Ex.: 1234 A' required
            value={shippingState.number}
            onChange={e => setShippingState({...shippingState, number: e.target.value})} />
        </div>
        <div>
          <label htmlFor='complement'>Complemento</label>
          <input id='complement' placeholder='Ex.: Em frente a praça central' required
            value={shippingState.complement}
            onChange={e => setShippingState({...shippingState, complement: e.target.value})} />
        </div>
        <div>
          <label htmlFor='neighborhood'>Bairro</label>
          <input id='neighborhood' placeholder='Nome do bairro' required
            value={shippingState.neighborhood}
            onChange={e => setShippingState({...shippingState, neighborhood: e.target.value})} />
        </div>
        <div>
          <label htmlFor='city'>Cidade</label>
          <input id='city' placeholder='Nome da cidade' required
            value={shippingState.city}
            onChange={e => setShippingState({...shippingState, city: e.target.value})} />
        </div>
        <div>
          <label htmlFor='state'>Estado</label>
          <input id='state' placeholder='Nome do estado' required
            value={shippingState.state}
            onChange={e => setShippingState({...shippingState, state: e.target.value})} />
        </div>
        <div>
          <label htmlFor='country'>País</label>
          <input id='country' placeholder='Nome do país' required
            value={shippingState.country}
            onChange={e => setShippingState({...shippingState, country: e.target.value})} />
        </div>
        <div>
          <label htmlFor='postalCode'>CEP</label>
          <input id='postalCode' placeholder='Código Postal (CEP)' required
            value={shippingState.postalCode}
            onChange={e => setShippingState({...shippingState, postalCode: e.target.value})} />
        </div>
        <div>
          <label htmlFor='chooseOnMap'>Localização</label>
          <button type='button' onClick={chooseOnMap}>
            Apontar no mapa
          </button>
        </div>
        <div>
          <br/>
          <button className='primary' type='submit'>
            Salvar endereço
          </button>
        </div>
      </form>
    </div>
  )
}
