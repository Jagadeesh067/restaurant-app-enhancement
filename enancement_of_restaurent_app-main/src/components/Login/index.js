import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeHandler = event => {
    const {id, value} = event.target
    if (id === 'username') {
      setUsername(value)
    } else {
      setPassword(value)
    }
  }

  const onSuccessfulLogin = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const onFailedLogin = errorMessage => {
    setErrorMsg(errorMessage)
  }

  const onSubmitLogin = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      onSuccessfulLogin(data.jwt_token)
    } else {
      onFailedLogin(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <form onSubmit={onSubmitLogin} className="login-form">
        <h1 className="login-title">Login</h1>
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          className="input-field"
          onChange={onChangeHandler}
          value={username}
        />
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          className="input-field"
          onChange={onChangeHandler}
          value={password}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {errorMsg !== '' && <p className="error-message">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
