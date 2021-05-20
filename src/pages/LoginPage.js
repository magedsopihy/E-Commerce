import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { useUserContext } from '../context/user-context'
const LoginPage = (props) => {
  const { error, login, redirectToReferrer } = useUserContext()
  const [values, setValues] = useState({ email: '', password: '' })

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  // const { from } = props.location.state || {
  //   from: {
  //     pathname: '/',
  //   },
  // }

  if (redirectToReferrer) {
    return <Redirect to='/' />
  }

  return (
    <Wrapper className='page-100'>
      <form onSubmit={(e) => e.preventDefault()}>
        {error && <span className='error'>{error}</span>}
        <div className='form-control'>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={values.email}
            onChange={handleChange('email')}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            email={values.password}
            onChange={handleChange('password')}
          />
          <button type='submit' className='btn' onClick={() => login(values)}>
            Login
          </button>
        </div>
        <Link className='register-link' to='/register'>
          don't have account signup instead
        </Link>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.main`
  display: grid;
  place-items: center;
  form {
    text-align: center;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    margin: 0.5rem 0;
  }
  input {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid var(--clr-primary-7);
    border-radius: var(--radius);
    outline-width: 0;
  }
  .register-link {
    font-size: 1rem;
    letter-spacing: var(--spacing);
    color: var(--clr-primary-4);
  }
  .register-link:hover {
    color: var(--clr-primary-1);
  }
  .error {
    display: block;
    background: var(--clr-red-light);
    padding: 0.5rem;
    color: #fff;
    border-radius: var(--radius);
    outline-width: 0;
    font-size: 1rem;
    letter-spacing: var(--spacing);
  }
`
export default LoginPage
