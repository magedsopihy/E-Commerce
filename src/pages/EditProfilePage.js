import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { BiError } from 'react-icons/bi'
import { useUserContext } from '../context/user-context'

const EditProfilePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const { readUserProfile, editUserProfile, redirectAfterEditUserProfile } =
    useUserContext()
  const { userId } = useParams()
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    const source = axios.CancelToken.source()

    readUserProfile(userId, source.token).then((user) => {
      if (user.error) {
        setServerError('some thing went wrong')
      } else {
        setValue('fName', user.fName)
        setValue('lName', user.lName)
        setValue('email', user.email)
        setValue('seller', user.seller)
      }
    })

    return () => source.cancel()
  }, [userId])

  const onSubmit = (data) => editUserProfile(data)

  if (redirectAfterEditUserProfile) {
    return <Redirect to={`/user/${userId}`} />
  }
  return (
    <Wrapper className='page-100'>
      <h3>Edit Profile</h3>
      {serverError && (
        <p>
          <span>
            <BiError />
          </span>
          {serverError}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className='input-element'>
            <div className='seller'>
              <label htmlFor='seller'>become a seller</label>
              <input id='seller' type='checkbox' {...register('seller')} />
            </div>
          </div>
          <button type='submit' className='btn'>
            Edit
          </button>
        </div>
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
  .seller {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
  #seller {
    padding: 0;
    margin-bottom: 0;
  }
  p {
    margin-bottom: 0;
  }
`

export default EditProfilePage
