import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignIn() {
  const [obj, setObj] = useState({email: '', password: ''})

  function submitHandler(e) {
    e.preventDefault();
    console.log(obj)
  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Autenticação</h1>
        </div>
        <div>
          <label htmlFor='email'>E-mail</label>
          <input type='email' placeholder='Informe seu e-mail' required
            onChange={e => setObj({...obj, email: e.target.value})} />
        </div>
        <div>
          <label htmlFor='password'>Senha</label>
          <input type='password' placeholder='Informe sua senha' required
            onChange={e => setObj({...obj, password: e.target.value})} />
        </div>
        <div>
          <br />
          <button className='primary' type='submit'>Entrar</button>
        </div>
        <div>
          <br />
          <div>
            Não é cadastrado? <Link to='/register'>Crie sua conta</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
