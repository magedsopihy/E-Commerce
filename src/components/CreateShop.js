import React, { useState } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { BiError } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import logo from './../assets/no_logo.png'
import Loading from './Loading'
import { useShopContext } from './../context/shop-context'

const CreateShopPage = () => {
  const { createShop } = useShopContext()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [values, setValues] = useState({
    redirect: false,
    error: '',
  })

  const selectedImage = watch('image')
  const onSubmit = async (data) => {
    setLoading(true)
    const response = await createShop({ ...data, image: data.image[0] })
    if (response.error) {
      setValues({ ...values, error: response.error })
    } else {
      setLoading(false)
      setValues({ ...values, redirect: true })
    }
  }

  if (values.redirect) {
    return <Redirect to='/seller/shops' />
  }
  if (loading) {
    return <Loading />
  }
  return (
    <Wrapper className='page-100'>
      <h3>create your shop now</h3>
      {values.error && <span className='error'>{values.error}</span>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label htmlFor='file-upload'>
            <div className='img-contianer'>
              <input
                type='file'
                id='file-upload'
                name='image'
                {...register('image', {
                  required: 'Shop image required',
                  validate: (value) => {
                    return (
                      /\.(gif|jpe?g|png)$/i.test(value[0].name) ||
                      'The should be jpg, jpeg or png file'
                    )
                  },
                })}
              />
              <img
                src={
                  selectedImage === undefined || selectedImage.length === 0
                    ? logo
                    : URL.createObjectURL(selectedImage[0])
                }
                alt='logo place holder'
              />
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
  display: grid;
  place-items: center;
  text-align: center;
  h3 {
    line-height: 3rem;
    margin-bottom: 0;
    text-transform: uppercase;
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
  textarea {
    resize: none;
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
export default CreateShopPage
