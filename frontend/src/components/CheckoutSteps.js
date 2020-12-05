export default function CheckoutSteps(props) {
  return (
    <div className='row checkout-steps'>
      <div className={props.step1 && 'active'}>Autenticação</div>
      <div className={props.step2 && 'active'}>Endereço de entrega</div>
      <div className={props.step3 && 'active'}>Pagamento</div>
      <div className={props.step4 && 'active'}>Place Order</div>
    </div>
  )
}
