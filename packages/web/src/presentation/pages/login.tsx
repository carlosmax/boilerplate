import React, { useState } from 'react'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  const [email, setEmail] = useState('demo@example.com')
  const errorsObj = { email: '', password: '' }
  const [errors] = useState(errorsObj)
  const [password, setPassword] = useState('123456')

  const onLogin = (e): void => {}

  return (
    <div className={`${Styles.authincation} d-flex flex-column flex-lg-row flex-column-fluid`}>
      <div className={`${Styles.login_aside} text-center  d-flex flex-column flex-row-auto`}>
        <div className='d-flex flex-column-auto flex-column pt-lg-40 pt-15'>
          <div className='text-center mb-4 pt-5'>{/* <img src={logo} alt='' /> */}</div>
          <h3 className='mb-2'>Welcome back!</h3>
          <p>
            User Experience & Interface Design <br />
            Strategy SaaS Solutions
          </p>
        </div>
        {/* <div className='aside-image' 
        style={{ backgroundImage: 'url(' + loginbg + ')' }}></div> */}
      </div>
      <div
        className={`container ${Styles.flex_row_fluid} 
        d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto`}
      >
        <div className='d-flex justify-content-center h-100 align-items-center'>
          <div className={`${Styles.authincation_content} ${Styles.style_2}`}>
            <div className='row no-gutters'>
              <div className='col-xl-12 tab-content'>
                <div id='sign-in' className={`${Styles.auth_form} form-validation`}>
                  {/* {props.errorMessage && (
                    <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                      {props.errorMessage}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                      {props.successMessage}
                    </div>
                  )} */}
                  <form onSubmit={onLogin} className='form-validate'>
                    <h3 className='text-center mb-4 text-black'>Sign in your account</h3>
                    <div className='form-group mb-3'>
                      <label className='mb-1' htmlFor='val-email'>
                        <strong>Email</strong>
                      </label>
                      <div>
                        <input
                          type='email'
                          className='form-control'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder='Type Your Email Address'
                        />
                      </div>
                      {errors.email && <div className='text-danger fs-12'>{errors.email}</div>}
                    </div>
                    <div className='form-group mb-3'>
                      <label className='mb-1'>
                        <strong>Password</strong>
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        value={password}
                        placeholder='Type Your Password'
                        onChange={e => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className='text-danger fs-12'>{errors.password}</div>
                      )}
                    </div>
                    <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                      <div className='form-group mb-3'>
                        <div className='custom-control custom-checkbox ml-1'>
                          <input
                            type='checkbox'
                            className='form-check-input'
                            id='basic_checkbox_1'
                          />
                          <label className='form-check-label' htmlFor='basic_checkbox_1'>
                            Remember my preference
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='text-center form-group mb-3'>
                      <button type='submit' className='btn btn-primary btn-block'>
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className='new-account mt-3'>
                    <p>
                      {"Don't have an account?"} <a className='text-primary'>Sign up</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
