import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [succeeded, setSucceeded] = useState(false)

  const createUser = async () => {
    const { data } = await axios.post('/account/signup', { username, password })
    if (data === 'user created') {
      setSucceeded(true)
    }
  }

  const loginUser = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    if (data === 'user logged in successfully') {
      setSucceeded(true)
    }
  }

  return (
    <>
      <>
      </>
      username: <input onChange={e => setUsername(e.target.value)} />
      <br />
      password: <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={loginUser}> Login </button>
      <p> succeeded: {`${succeeded}`} </p>
    </>
  )
}

export default App