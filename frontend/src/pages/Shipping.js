import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../redux/cart/cartActions'

export default function Shipping(props) {
  const { userInfo } = useSelector( state => state.userSignin )
  if (!userInfo) props.history.push('/signin')

  const dispatch = useDispatch()
  const { shippingAddress } = useSelector( state => state.cart )

  const [obj, setObj] = useState(shippingAddress)

  function submitHandler(e) {
    e.preventDefault()
    dispatch(saveShippingAddress(obj))
    props.history.push('/payment')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className='form' onSubmit={submitHandler}>
        <div><h1>Endereço de Entrega</h1></div>
        <div>
          <label htmlFor='fullName'>Nome completo</label>
          <input id='fullName' placeholder='Informe seu nome completo' required
            value={obj.fullName}
            onChange={e => setObj({...obj, fullName: e.target.value})} />
        </div>
        <div>
          <label htmlFor='street'>Logradouro</label>
          <input id='street' placeholder='Ex.: Avenida Flores da Cunha' required
            value={obj.street}
            onChange={e => setObj({...obj, street: e.target.value})} />
        </div>
        <div>
          <label htmlFor='number'>Numero</label>
          <input id='number' placeholder='Ex.: 1234 A' required
            value={obj.number}
            onChange={e => setObj({...obj, number: e.target.value})} />
        </div>
        <div>
          <label htmlFor='complement'>Complemento</label>
          <input id='complement' placeholder='Ex.: Em frente a praça central' required
            value={obj.complement}
            onChange={e => setObj({...obj, complement: e.target.value})} />
        </div>
        <div>
          <label htmlFor='neighborhood'>Bairro</label>
          <input id='neighborhood' placeholder='Nome do bairro' required
            value={obj.neighborhood}
            onChange={e => setObj({...obj, neighborhood: e.target.value})} />
        </div>
        <div>
          <label htmlFor='city'>Cidade</label>
          <input id='city' placeholder='Nome da cidade' required
            value={obj.city}
            onChange={e => setObj({...obj, city: e.target.value})} />
        </div>
        <div>
          <label htmlFor='state'>Estado</label>
          <input id='state' placeholder='Nome do estado' required
            value={obj.state}
            onChange={e => setObj({...obj, state: e.target.value})} />
        </div>
        <div>
          <label htmlFor='country'>País</label>
          <input id='country' placeholder='Nome do país' required
            value={obj.country}
            onChange={e => setObj({...obj, country: e.target.value})} />
        </div>
        <div>
          <label htmlFor='postalCode'>CEP</label>
          <input id='postalCode' placeholder='Código Postal (CEP)' required
            value={obj.postalCode}
            onChange={e => setObj({...obj, postalCode: e.target.value})} />
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
