import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { BiError } from 'react-icons/bi'
import { useUserContext } from '../context/user-context'
const LoginPage = (props) => {
  const { error, login, redirectToReferrer } = useUserContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => login(data)

  if (redirectToReferrer) {
    return <Redirect to='/' />
  }

  return (
    <Wrapper className='page-100'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <p className='error'>
            <span>
              <BiError />
            </span>
            {error}
          </p>
        )}
        <div className='form-control'>
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
  p {
    margin-bottom: 0;
  }
`
export default LoginPage
