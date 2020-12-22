import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { detailsProduct, updateProduct,  } from '../../redux/product/productActions'
import { PRODUCT_UPDATE_RESET } from '../../redux/product/productConsts'

export default function ProductForm(props) {
  const productId = props.match.params.id
  const [state, setState] = useState({
    name:'', price:0, category:'', countInStock:0, brand:'', description:'', images: []
  })
  const [images, setImages] = useState([])
  const dispatch = useDispatch()
  const productDetails = useSelector( state => state.productDetails )
  const { loading, error, product } = productDetails
  const productUpdate = useSelector( state => state.productUpdate )
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate

  useEffect(() => {
    if (successUpdate)  
      props.history.push('/admin/products')
    
    if (productId) {
      if (!product || (product.id != productId) || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        dispatch(detailsProduct(productId))
      } else
        setState(product)
    }
  }, [dispatch, product, productId, successUpdate, props.history])


  function handleSelectImages(e) {
    //console.log(event.target.files)
    if (!e.target.files) return
    let arrImages = Array.from(e.target.files)

    if(images.length > 0)
      arrImages = images.concat(arrImages)

    setImages(arrImages)
  }

  function handleRemoveImage(file) {
    const arrImages = images.filter(image => image !== file)
    setImages(arrImages)
  }

  function submitHandler(e) {
    e.preventDefault()
    // console.log(state, images)
    const data = new FormData()

    if (state.id) data.append('id', String(state.id))
    data.append('name', state.name)
    data.append('price', String(state.price))
    data.append('category', state.category)
    data.append('countInStock', String(state.countInStock))
    data.append('brand', state.brand)
    data.append('description', state.description)
    
    images.forEach(image => data.append('images', image))

    //await api.post('/institutions', data)
    //if (state.id)
      dispatch(updateProduct(data))
    //else
    //  console.log('NOVO PRODUTO')
  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>{product ? 'Editando '+state.id : 'Registro de Produto'}</h1>
      </div>

      { loadingUpdate && <LoadingBox /> }
      { errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox> } 

      {
        productId && loading
        ? <LoadingBox />
        : error
        ? <MessageBox variant='danger'>{error}</MessageBox>
        : (
          <>
            <div>
              <label htmlFor='name'>Nome</label>
              <input id='name' placeholder='Nome do produto'
                value={state.name}
                onChange={e => setState({ ...state, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor='price'>Preço</label>
              <input id='price' placeholder='Preço unitário'
                value={state.price}
                onChange={e => setState({ ...state, price: e.target.value })} />
            </div>
            <div>
              <label htmlFor='category'>Categoria</label>
              <input id='category' placeholder='Categoria do produto'
                value={state.category}
                onChange={e => setState({ ...state, category: e.target.value })} />
            </div>
            <div>
              <label htmlFor='countInStock'>Estoque</label>
              <input id='countInStock' placeholder='Quantidade em estoque'
                value={state.countInStock}
                onChange={e => setState({ ...state, countInStock: e.target.value })} />
            </div>
            <div>
              <label htmlFor='brand'>Marca</label>
              <input id='brand' placeholder='Marca do produto'
                value={state.brand}
                onChange={e => setState({ ...state, brand: e.target.value })} />
            </div>
            <div>
              <label htmlFor='description'>Descrição ({state.description.length} - max 400) </label>
              <textarea id='description' placeholder='Descrição do produto'
                value={state.description}
                onChange={e => setState({ ...state, description: e.target.value.slice(0, 400) })}>
              </textarea>
            </div>
            <div>
              <label htmlFor='image[]' className='new-image'>
                Fotos <i className="fa fa-plus-circle" color='#15b6d6'></i>
              </label>

              <input type='file' multiple id='image[]' style={{display: 'none'}}
                onChange={handleSelectImages} />
              
              <div className='images-container'>
                {images && images.map(image => {
                  const blob = URL.createObjectURL(image)
                  return(
                    <div key={blob} className='image-preview-container'>
                      <img src={blob} alt={state.name} />
                      <button className='flex-center' 
                        onClick={() => handleRemoveImage(image) }>
                        <i className="fa fa-times-circle" color='#FF669D'></i>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <br/>
              <button className='primary' type='submit'>
                { productId ? 'Salvar Alterações' : 'Registrar Produto' }
              </button>
            </div>
          </>
        )
      }
      </form>
    </div>
  )
}
