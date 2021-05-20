import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import logo from './../assets/no_logo.png'
import { FiCamera } from 'react-icons/fi'
import { useShopContext } from './../context/shop-context'

const EdtiShop = ({ shopId }) => {
  const { updateShop, readShop } = useShopContext()

  const [values, setValues] = useState({
    id: null,
    image: null,
    name: '',
    description: '',
    oldImage: '',
    error: '',
    redirect: false,
  })

  useEffect(() => {
    readShop(shopId).then((shop) => {
      if (shop.error) {
        setValues({
          ...values,
          error: shop.error,
        })
      } else {
        setValues({
          ...values,
          id: shop._id,
          name: shop.name,
          description: shop.description,
          oldImage: shop.image.url,
        })
      }
    })
    //
  }, [shopId])

  const handleChange = (name) => (event) => {
    if (name === 'image') {
      if (event.target.files && event.target.files[0]) {
        setValues({
          ...values,
          [name]: event.target.files[0],
        })
      }
    } else {
      setValues({ ...values, [name]: event.target.value })
    }
  }

  const update = async () => {
    const response = await updateShop(values)
    if (response.error) {
      setValues({ ...values, error: response.error })
    } else {
      setValues({ ...values, redirect: true })
    }
  }
  if (values.redirect) {
    return <Redirect to='/seller/shops' />
  }

  const logoUrl = values.image ? values.image : values.oldImage

  return (
    <Wrapper className='page-100'>
      <h3>edit shop</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        {values.error && <span className='error'>{values.error}</span>}
        <div className='form-control'>
          <label htmlFor='file-upload'>
            <div className='img-contianer'>
              <input
                type='file'
                id='file-upload'
                name='image'
                onChange={handleChange('image')}
              />
              <img
                src={`${
                  values.image ? URL.createObjectURL(values.image) : logoUrl
                }`}
                alt='logo place holder'
              />
              <FiCamera />
            </div>
          </label>
          <input
            type='text'
            name='name'
            placeholder='shop name'
            value={values.name}
            className='input'
            required
            onChange={handleChange('name')}
          />
          <textarea
            type='text'
            name='description'
            placeholder='shop description'
            value={values.description}
            className='input'
            required
            onChange={handleChange('description')}
          />
          <button type='submit' className='btn' onClick={update}>
            edit
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.main`
  box-shadow: var(--dark-shadow);
  border-radius: var(--raduis);
  padding: 1rem;
  h3 {
    line-height: 3rem;
    margin-bottom: 0;
    text-transform: uppercase;
    text-align: center;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    margin: 0.5rem 0;
  }
  .input {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid var(--clr-primary-7);
    border-radius: var(--radius);
    outline-width: 0;
  }
  input[type='file'] {
    display: none;
  }
  .img-contianer {
    width: 132px;
    height: 132px;
    border-radius: 50%;
    margin: 0 auto 1rem auto;
    position: relative;
    display: grid;
    place-items: center;
  }
  .img-contianer img {
    object-fit: cover;
    border-radius: 50%;
    width: 100%;
    min-width: 100%;
    min-height: 100%;
    border: 4px solid #fff;
    overflow: hidden;
  }
  .img-contianer svg {
    position: absolute;
    font-size: 50px;
    color: rgba(0, 0, 0, 0.6);
    display: none;
    cursor: pointer;
  }
  .img-contianer:hover svg {
    display: block;
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
export default EdtiShop
