import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import { useUserContext } from '../context/user-context'

import no_logo from './../assets/no_logo.png'

const EditProfilePage = () => {
  const { readUserProfile, editUserProfile, redirectAfterEditUserProfile } =
    useUserContext()
  const { userId } = useParams()
  const [values, setValues] = useState({
    fName: '',
    lName: '',
    error: '',
    seller: false,
    image: no_logo,
    email: '',
    password: '',
  })

  const readUserInfo = async () => {
    const response = await readUserProfile(userId)
    console.log(response)
    if (response.error) {
      setValues({ ...values, error: response.error })
    } else {
      setValues({
        ...values,
        fName: response.fName,
        lName: response.lName,
        email: response.email,
        seller: response.seller,
      })
    }
  }
  useEffect(() => {
    readUserInfo()
  }, [])

  const handleChange = (name) => (event) => {
    if (name === 'seller') {
      setValues({ ...values, seller: !values.seller })
    } else {
      setValues({ ...values, [name]: event.target.value })
    }
  }

  if (redirectAfterEditUserProfile) {
    return <Redirect to={`/user/${userId}`} />
  }
  return (
    <Wrapper className='page-100'>
      <h3>Edit Profile</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        {values.error && <span className='error'>{values.error}</span>}
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
          <div className='seller'>
            <label htmlFor='seller'>become a seller</label>
            <input
              id='seller'
              type='checkbox'
              name='seller'
              checked={values.seller}
              onChange={handleChange('seller')}
            />
          </div>
          <button
            type='submit'
            className='btn'
            onClick={() => editUserProfile(values, userId)}
          >
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
export default EditProfilePage
