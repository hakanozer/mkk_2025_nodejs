import React, { FormEvent, useState } from 'react'
import { userLogin } from '../services/userService'
import apiConfig from '../services/apiConfig'

function Login() {

  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')  

  const loginFunc = (evt: FormEvent) => {
    evt.preventDefault()
    userLogin(email, password).then(res => {
        const dt = res.data
        localStorage.setItem('jwt', dt.data.jwt)
        apiConfig.defaults.headers.common['Authorization'] = `Bearer ${dt.data.jwt}`;
    }).catch(err => {
        alert('username or password fail')
    })
  }

  return (
    <>
        <div className='row'>
            <div className='col-sm-4'></div>
            <div className='col-sm-4'>
                <h2>User Login</h2>
                <form onSubmit={loginFunc}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={(evt) => setemail(evt.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(evt) => setPassword(evt.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className='col-sm-4'></div>
        </div>
    </>
  )
}

export default Login