import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { BiError } from 'react-icons/bi'
import { useUserContext } from '../context/user-context'

const RegisterPage = () => {
  const { error, signup, openModal } = useUserContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => signup(data)
  return (
    <>
      <Wrapper className='page-100'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <span className='error'>{error}</span>}
          <div className='form-control'>
            <div className='input-element'>
              <input
                type='text'
                className={errors.fName ? 'red-border' : ''}
                placeholder='First Name'
                {...register('fName', {
                  required: 'Please enter your first name',
                  minLength: { value: 3, message: 'Too short' },
                  maxLength: { value: 80, message: 'Too long' },
                })}
              />
              {errors.fName && (
                <p className='error'>
                  <span>
                    <BiError />
                  </span>
                  {errors.fName.message}
                </p>
              )}
            </div>
            <div className='input-element'>
              <input
                type='text'
                className={errors.lName ? 'red-border' : ''}
                placeholder='Last Name'
                {...register('lName', {
                  required: 'Please enter your last name',
                  minLength: { value: 3, message: 'Too short' },
                  maxLength: { value: 80, message: 'Too long' },
                })}
              />
              {errors.lName && (
                <p className='error'>
                  <span>
                    <BiError />
                  </span>
                  {errors.lName.message}
                </p>
              )}
            </div>
            <div className='input-element'>
              <input
                type='email'
                className={errors.email ? 'red-border' : ''}
                placeholder='Email'
                {...register('email', {
                  required: 'Please enter your email',
                })}
              />
              {errors.email && (
                <p className='error'>
                  <span>
                    <BiError />
                  </span>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className='input-element'>
              <input
                type='password'
                className={errors.password ? 'red-border' : ''}
                placeholder='Password'
                {...register('password', {
                  required: 'Please enter Password ',
                  minLength: { value: 8, message: 'Too short' },
                })}
              />
              {errors.password && (
                <p className='error'>
                  <span>
                    <BiError />
                  </span>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button type='submit' className='btn'>
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
  .input-element {
    margin-bottom: 2rem;
    height: 2rem;
  }
  input {
    padding: 0.5rem;
    border: 1px solid var(--clr-primary-7);
    border-radius: var(--radius);
    outline-width: 0;
    width: 100%;
  }
  .red-border {
    border: 1px solid var(--clr-red-light);
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
    display: flex;
    align-items: center;
    color: var(--clr-red-light);
    outline-width: 0;
    font-size: 0.8rem;
    letter-spacing: var(--spacing);
    margin-top: 0;
    span {
      margin-right: 1rem;
    }
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
