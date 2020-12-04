import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { addToCart } from '../redux/cart/cartActions'

export default function Cart(props) {
  const dispatch = useDispatch()
  const productId = props.match.params.id
  const qty = Number(props.location.search.split('=')[1]) || 1

  useEffect(() => {
    if (productId)
      dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  return (
    <div>
      <h1>Cart page</h1>
      <p>
        Adicionar ao carrinho: Produto id: {productId}, Quantidade: {qty}
      </p>    
    </div>
  )
}
