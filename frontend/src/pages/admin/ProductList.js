import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listProducts, createProduct, deleteProduct } from '../../redux/product/productActions'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { formatPrice } from '../../utils/formatters'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../redux/product/productConsts'

export default function ProductList(props) {

  const { loading, error, products } = useSelector( state => state.productList )
  const productCreate = useSelector( state => state.productCreate )
  const { loading:loadingCreate, success:successCreate, error:errorCreate, product  } = productCreate
  const productDelete = useSelector( state => state.productDelete )
  const { loading:loadingDelete, success:successDelete, error:errorDelete } = productDelete
  const dispatch = useDispatch()

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      goToForm(product.id)
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET })
    }
    dispatch(listProducts())
  }, [dispatch, props.history, product, successCreate, successDelete])

  function goToForm(prod) {
    let url = '/admin/productForm'
    if (prod) url += '/' + prod.id
    props.history.push(url)
  }

  function createHandler() {
    dispatch(createProduct())
  }

  function deleteHandler(product) {
    if (window.confirm('Deseja mesmo excluir este registro?'))
      dispatch(deleteProduct(product.id))
  }
  
  return (
    <div>
      <div className="row">  
        <h1>Produtos</h1>
        <button className='primary' type='button' onClick={() => goToForm(null)}>
          <i className="fa fa-plus-square"></i> Novo Produto
        </button>
      </div>
      { loadingCreate || loadingDelete && <LoadingBox />}
      { errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox> }
      { errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox> }
      {
        loading
        ? <LoadingBox />
        : error
        ? <MessageBox variant='danger'>{error}</MessageBox>
        : (
          <table className='table'>
            <thead>
              <tr>
                <th>Cód</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button type='button' className='success'
                      onClick={() => goToForm(product)}>
                      <i className="fa fa-edit"></i>
                    </button>
                    <button type='button' className='danger'
                      onClick={() => deleteHandler(product)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        )
      }
    
    </div>
  )
}
