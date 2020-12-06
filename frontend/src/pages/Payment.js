import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../redux/cart/cartActions'

export default function Payment(props) {
  const { shippingAddress } = useSelector( state => state.userSignin )
  if (!shippingAddress) props.history.push('/shipping')

  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState(null)

  function onChangeValue(e) {
    setPaymentMethod(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    props.history.push('/placeorder')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className='form' onSubmit={submitHandler}>
        <div><h1>Forma de Pagamento</h1></div>
        <div>
          <div>
            <input type='radio' id='paypal' value='PayPal' name='paymentMethod'
              onChange={onChangeValue} />
            <label htmlFor='paypal'>PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input type='radio' id='stripe' value='Stripe' name='paymentMethod'
              onChange={onChangeValue} />
            <label htmlFor='stripe'>Stripe</label>
          </div>
        </div>
        <div>
          <button className='primary' type='submit'>
            Salvar forma de pagamento
          </button>
        </div>
      </form>
    </div>
  )
}
