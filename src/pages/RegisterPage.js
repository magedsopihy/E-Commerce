import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/user-context'

const RegisterPage = () => {
  const { error, signup, openModal } = useUserContext()
  const [values, setValues] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
  })

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }
  return (
    <>
      <Wrapper className='page-100'>
        <form onSubmit={(e) => e.preventDefault()}>
          {error && <span className='error'>{error}</span>}
          <div className='form-control'>
            <input
              type='text'
              name='fName'
              placeholder='first name'
              value={values.fName}
              onChange={handleChange('fName')}
            />
            <input
              type='text'
              name='lName'
              placeholder='last name'
              value={values.lName}
              onChange={handleChange('lName')}
            />
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
            <button
              type='submit'
              className='btn'
              onClick={() => signup(values)}
            >
              Login
            </button>
          </div>
          <Link className='login-link' to='/login'>
            have account login instead
          </Link>
        </form>
      </Wrapper>
      {openModal && (
        <ModalWrapper>
          <div className='modal'>
            <h3>New Account</h3>
            <p>new acount succefully created</p>
            <Link to='/login' className='btn'>
              Login
            </Link>
          </div>
        </ModalWrapper>
      )}
    </>
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
  .login-link {
    font-size: 1rem;
    letter-spacing: var(--spacing);
    color: var(--clr-primary-4);
  }
  .login-link:hover {
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
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  transition: var(--transition);
  visibility: visible;
  z-index: 10;

  .modal {
    background: #fff;
    border-radius: var(--radius);
    width: 90vw;
    height: 30vh;
    max-width: 250px;
    text-align: center;
    display: grid;
    place-items: center;
  }
  p {
    font-size: 1rem;
    letter-spacing: var(--spacing);
  }
`
export default RegisterPage
