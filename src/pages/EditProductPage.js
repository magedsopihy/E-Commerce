import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { FiCamera } from 'react-icons/fi'
import { PerviewImages } from '../components'
import { useProductsContext } from '../context/products-context'
import { colourNameToHex } from './../utils/helpers'

const EditProductPage = () => {
  const { fetchProduct, updateProduct } = useProductsContext()
  const { shopId, productId } = useParams()
  const [values, setValues] = useState({
    imagesToPerview: [],
    images: [],
    name: '',
    description: '',
    category: '',
    quantity: '',
    company: '',
    price: 0,
    redirect: false,
    shipping: false,
    error: '',
    color: '',
    colors: [],
  })

  useEffect(() => {
    fetchProduct(productId).then((product) => {
      if (product.error) {
        setValues({ ...values, error: product.error })
      } else {
        setValues({
          ...values,
          imagesToPerview: [],
          images: product.images,
          name: product.name,
          description: product.description,
          category: product.category,
          quantity: product.quantity,
          price: product.price,
          shipping: product.shipping,
          company: product.company,
          colors: product.colors,
        })
      }
    })
  }, [productId, fetchProduct, values])

  const handleChange = (name) => (event) => {
    if (name === 'image') {
      if (event.target.files) {
        const imagesArray = Array.from(event.target.files).map((file) =>
          URL.createObjectURL(file)
        )

        setValues({
          ...values,
          imagesToPerview: [...values.imagesToPerview, imagesArray],
          images: event.target.files,
        })
      }
    } else if (name === 'color') {
      setValues({
        ...values,
        color: event.target.value,
      })
      const color = colourNameToHex(values.color)
      if (color) {
        let selectedColors = {}
        selectedColors.name = event.target.value
        selectedColors.color = color

        setValues({
          ...values,
          color: '',
          colors: [...values.colors, selectedColors],
        })
      }
    } else if (name === 'shipping') {
      setValues({ ...values, shipping: !values.shipping })
    } else {
      setValues({ ...values, [name]: event.target.value })
    }
  }

  const handleKeyPress = (event) => {
    if (
      values.colors.length > 0 &&
      event.keyCode === 8 &&
      values.color === ''
    ) {
      values.colors.pop()
      setValues({ ...values, colors: values.colors })
    }
  }

  const handleSubmit = async () => {
    const response = await updateProduct(shopId, productId, values)
    if (response.error) {
      setValues({ ...values, error: response.error })
    } else {
      setValues({ ...values, redirect: true })
    }
  }

  if (values.redirect) {
    return <Redirect to={`/seller/shop/edit/${shopId}`} />
  }

  return (
    <Wrapper className='page-100 section-center'>
      {values.images.length > 0 ? (
        <PerviewImages
          images={
            values.imagesToPerview.length > 0
              ? values.imagesToPerview
              : values.images
          }
        />
      ) : (
        <section className='perview'>
          <h3>No Images slected yet</h3>
        </section>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        {values.error && <span className='error'>{values.error}</span>}
        <div className='form-control'>
          <input
            type='text'
            name='name'
            placeholder='product name'
            value={values.name}
            className='input'
            required
            onChange={handleChange('name')}
          />
          <input
            type='text'
            name='description'
            placeholder='description'
            value={values.description}
            className='input'
            required
            onChange={handleChange('description')}
          />
          <input
            type='text'
            name='category'
            placeholder='category'
            value={values.category}
            className='input'
            required
            onChange={handleChange('category')}
          />
          <input
            type='text'
            name='quantity'
            placeholder='quantity'
            value={values.quantity}
            className='input'
            required
            onChange={handleChange('quantity')}
          />
          <input
            type='text'
            name='price'
            placeholder='price'
            value={values.price}
            className='input'
            required
            onChange={handleChange('price')}
          />
          <input
            type='text'
            name='company'
            placeholder='company'
            value={values.company}
            className='input'
            required
            onChange={handleChange('company')}
          />
          <div className='shipping'>
            <label htmlFor='shipping'>free shiping</label>
            <input
              type='checkbox'
              name='shipping'
              checked={values.shipping}
              onChange={handleChange('shipping')}
            />
          </div>

          <label for='favcolor'>
            colors:
            <div className='colors'>
              {values.colors &&
                values.colors.map((color, i) => {
                  return (
                    <span
                      key={i}
                      style={{
                        background: color.color,
                        color: 'white',
                        borderRadius: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'inline-block',
                        paddingLeft: 1,
                        paddingRight: 1,
                        marginLeft: 2,
                      }}
                    >
                      {color.name}
                    </span>
                  )
                })}
              <input
                id='favcolor'
                type='text'
                name='color'
                placeholder='name of color'
                className='input'
                value={values.color}
                onChange={handleChange('color')}
                onKeyDown={handleKeyPress}
              />
            </div>
          </label>
          <label for='file-upload' className='images-btn btn'>
            <input
              type='file'
              id='file-upload'
              name='image'
              multiple
              onChange={handleChange('image')}
            />
            <FiCamera /> edit product images
          </label>
          <button type='submit' className='btn' onClick={handleSubmit}>
            edit product
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4rem;
  .perview {
    display: grid;
    place-items: center;
  }
  .colors {
    display: inline-block;
    text-align: 'center';
  }
  #favcolor {
    border: transparent;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    margin: 0.5rem 0;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    margin: 0.5rem 0;
  }
  .input {
    padding: 0.5rem;
    margin-bottom: 2rem;
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

  .images-btn {
    text-align: center;
    margin-bottom: 2rem;
  }
`
export default EditProductPage
