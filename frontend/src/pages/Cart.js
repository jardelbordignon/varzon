export default function Cart(props) {
  const productId = props.match.params.id
  const qty = Number(props.location.search.split('=')[1]) || 1
  return (
    <div>
      <h1>Cart page</h1>
      <p>
        Adicionar ao carrinho: Produto id: {productId}, Quantidade: {qty}
      </p>    
    </div>
  )
}
