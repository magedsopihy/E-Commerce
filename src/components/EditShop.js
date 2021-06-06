import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import { useShopContext } from './../context/shop-context'

const EdtiShop = ({ shopId }) => {
  const { updateShop, readShop } = useShopContext()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const [values, setValues] = useState({
    error: '',
    redirect: false,
    oldImage: null,
  })

  useEffect(() => {
    const source = axios.CancelToken.source()
    readShop(shopId, source.token).then((shop) => {
      if (shop.error) {
        setValues({
          ...values,
          error: shop.error,
        })
      } else {
        setValue('name', shop.name)
        setValue('description', shop.description)
        setValues({
          ...values,
          oldImage: shop.image.url,
          image: shop.image.url,
        })
      }
    })

    return () => source.cancel()
    //
  }, [shopId])

  const changeImage = (e) => {
    const selectedImage = e.target.files[0]
    if (selectedImage) {
      console.log(selectedImage)
      setValues({
        ...values,
        oldImage: URL.createObjectURL(selectedImage),
        image: selectedImage,
      })
    }
  }

  const onSubmit = async (data) => {
    const response = await updateShop(
      shopId,
      data.name,
      data.description,
      values.image
    )
    if (response.error) {
      setValues({ ...values, error: response.error })
    } else {
      setValues({ ...values, redirect: true })
    }
  }
  if (values.redirect) {
    return <Redirect to='/seller/shops' />
  }

  return (
    <Wrapper className='page-100'>
      <h3>edit shop</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label htmlFor='file-upload'>
            <div className='img-contianer'>
              <input
                type='file'
                id='file-upload'
                name='image'
                onChange={changeImage}
              />
              <img src={values.oldImage} alt='logo place holder' />
              <FiCamera />
            </div>
            {errors.image && (
              <p className='error'>
                <span>
                  <BiError />
                </span>
                {errors.image.message}
              </p>
            )}
          </label>
          <div className='input-element'>
            <input
              type='text'
              className={errors.name ? 'input red-border' : 'input'}
              placeholder='Shop Name'
              {...register('name', {
                required: 'Please enter your shop name',
                minLength: { value: 3, message: 'Too short' },
                maxLength: { value: 80, message: 'Too long' },
              })}
            />
            {errors.name && (
              <p className='error'>
                <span>
                  <BiError />
                </span>
                {errors.name.message}
              </p>
            )}
          </div>
          <div className='desc-element'>
            <textarea
              type='text'
              className={errors.description ? 'input red-border' : 'input'}
              placeholder='Shop description'
              {...register('description', {
                required: 'Please enter your shop description',
                minLength: { value: 40, message: 'Too short' },
                maxLength: { value: 150, message: 'Too long' },
              })}
            />
            {errors.description && (
              <p className='error'>
                <span>
                  <BiError />
                </span>
                {errors.description.message}
              </p>
            )}
          </div>
          <input type='submit' className='btn' />
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
  label {
    margin-bottom: 1rem;
  }
  input[type='file'] {
    display: none;
  }
  .img-contianer {
    width: 132px;
    height: 132px;
    border-radius: 50%;
    margin: 0 auto;
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
  .input-element {
    margin-bottom: 2rem;
    height: 2rem;
  }
  .desc-element {
    margin-bottom: 2rem;
    height: 3rem;
  }
  .input {
    padding: 0.5rem;

    border: 1px solid var(--clr-primary-7);
    border-radius: var(--radius);
    outline-width: 0;
    width: 100%;
  }
  .red-border {
    border: 1px solid var(--clr-red-light);
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
export default EdtiShop
