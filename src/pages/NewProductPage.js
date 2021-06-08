import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { BiError } from 'react-icons/bi'
import { Redirect } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CreateEditImages, Loading } from './../components'
import { useProductsContext } from './../context/products-context'
import { colourNameToHex } from './../utils/helpers'
import defaultImage from './../assets/default.jpg'

const NewProduct = () => {
  const { addProduct, fetchProducts } = useProductsContext()
  const {
    register,
    handleSubmit,
    watch,
    getValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })
  const [loading, setLoading] = useState(false)
  const { shopId } = useParams()
  const [values, setValues] = useState({
    color: '',
    colors: [],
    colorError: '',
    severError: '',
    redirect: false,
  })

  if (values.redirect) {
    return <Redirect to={`/seller/shop/edit/${shopId}`} />
  }

  let selectedImages = watch('images')
  if (selectedImages !== undefined && selectedImages.length !== 0) {
    selectedImages = Array.from(selectedImages).map((file) =>
      URL.createObjectURL(file)
    )
  }
  const handleColors = (name) => (event) => {
    if (name === 'color') {
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
    }
  }
  const handleKeyPress = (event) => {
    if (
      values.colors.length > 0 &&
      event.keyCode === 8 &&
      values.color.length === 0
    ) {
      values.colors.pop()
      setValues({ ...values, colors: values.colors })
    }
  }

  const onSubmit = async (data) => {
    setLoading(false)
    if (values.colors.length === 0 && values.color === '') {
      return setValues({ ...values, colorError: 'Product colors is required' })
    }

    const response = await addProduct(shopId, { ...data, ...values })
    if (response.error) {
      setValues({ ...values, severError: response.error })
    } else {
      setLoading(true)
      setValues({ ...values, redirect: true })
      fetchProducts()
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div className='input-element'>
            <h5>title</h5>
            <input
              type='text'
              className={errors.name ? 'input red-border' : 'input'}
              {...register('name', {
                required: 'Please enter your product name',
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
            <h5>description</h5>
            <textarea
              type='text'
              className={errors.description ? 'input red-border' : 'input'}
              {...register('description', {
                required: 'Please a description for your product',
                minLength: { value: 10, message: 'Too short' },
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
        </section>
        <section>
          <div className='images'>
            <h5>images</h5>
            <label for='file-upload'>
              <input
                type='file'
                id='file-upload'
                name='images'
                multiple
                {...register('images', {
                  required: 'Product images required',
                  validate: (value) => {
                    return (
                      /\.(gif|jpe?g|png)$/i.test(value[0].name) ||
                      'The should be jpg, jpeg or png file'
                    )
                  },
                })}
              />
              upload images
            </label>
          </div>
          <div
            className={
              selectedImages === undefined || selectedImages.length === 0
                ? 'images-perveiw add-bg'
                : 'images-perveiw'
            }
          >
            {selectedImages === undefined ? (
              ''
            ) : selectedImages.length === 0 ? (
              ''
            ) : (
              <CreateEditImages images={selectedImages} />
            )}
          </div>
        </section>
        <section>
          <div className='input-element'>
            <h5>category</h5>
            <input
              type='text'
              className={errors.category ? 'input red-border' : 'input'}
              {...register('category', {
                required: 'Product category is required',
                minLength: { value: 3, message: 'Too short' },
                maxLength: { value: 80, message: 'Too long' },
              })}
            />
            {errors.category && (
              <p className='error'>
                <span>
                  <BiError />
                </span>
                {errors.category.message}
              </p>
            )}
          </div>
          <div className='input-element'>
            <h5>company</h5>
            <input
              type='text'
              className={errors.price ? 'input red-border' : 'input'}
              {...register('company', {
                required: 'Product company is required',
                minLength: { value: 3, message: 'Too short' },
                maxLength: { value: 80, message: 'Too long' },
              })}
            />
            {errors.company && (
              <p className='error'>
                <span>
                  <BiError />
                </span>
                {errors.company.message}
              </p>
            )}
          </div>
        </section>
        <section>
          <div className='input-element'>
            <h5>price</h5>
            <input
              type='number'
              className={errors.price ? 'input red-border' : 'input'}
              {...register('price', {
                required: 'Product price is required',
                minLength: { value: 1, message: 'Too short' },
                maxLength: { value: 12, message: 'Too long' },
              })}
            />
            {errors.price && (
              <p className='error'>
                <span>
                  <BiError />
                </span>
                {errors.price.message}
              </p>
            )}
          </div>
          <div className='input-element'>
            <h5>quantity</h5>
            <input
              type='number'
              className={errors.quantity ? 'input red-border' : 'input'}
              {...register('quantity', {
                required: 'How many product items do you have',
                minLength: { value: 1, message: 'Too short' },
                maxLength: { value: 12, message: 'Too long' },
              })}
            />
            {errors.quantity && (
              <p className='error'>
                <span>
                  <BiError />
                </span>
                {errors.quantity.message}
              </p>
            )}
          </div>
        </section>
        <section>
          <h5>colors</h5>
          <div className=' colors'>
            <div>
              {values.colors.length > 0 &&
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
                        marginLeft: 5,
                      }}
                    >
                      {color.name}
                    </span>
                  )
                })}
            </div>
            <input
              id='favcolor'
              type='text'
              name='color'
              value={values.color}
              onChange={handleColors('color')}
              onKeyDown={handleKeyPress}
            />
          </div>
        </section>
        <section>
          <h5>free shiping</h5>
          <label htmlFor='shipping'>
            <input type='checkbox' name='shipping' {...register('shipping')} />
            this product shipping free of charge
          </label>
        </section>
        <button type='submit' className='btn'>
          add product
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin: 5rem auto;
  max-width: 800px;

  .input-element {
    height: 4rem;
    margin-bottom: 2rem;
  }

  label {
    display: block;
    margin-bottom: 0;
    text-transform: capitalize;
  }
  h5 {
    margin-bottom: 0.5rem;
  }
  .colors {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    outline-width: 0;
    border-radius: var(--radius);
    border: 1px solid var(--clr-primary-9);
  }

  #file-upload {
    display: none;
  }

  textarea {
    width: 100%;
    height: 6rem;
    padding: 0.5rem;
    outline-width: 0;
    border-radius: var(--radius);
    resize: none;
    border: 1px solid var(--clr-primary-9);
  }
  .desc-element {
    height: 9.5rem;
  }

  section {
    background: var(--clr-primary-10);
    padding: 1rem;
    margin-bottom: 2rem;
    border-radius: var(--raduis);
    box-shadow: var(--light-shadow);
  }
  .images {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  .images label {
    color: var(--clr-red-dark);
    cursor: pointer;
  }
  .add-bg {
    background-image: url(${defaultImage});
    background-size: cover;
    background-position: center;
  }
  .images-perveiw {
    height: 330px;
    margin-bottom: 2rem;
  }

  input[name='shipping'] {
    width: 13px;
    padding: 0;
    margin-right: 0.5rem;
  }
  label {
    margin-bottom: 0.5rem;
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
export default NewProduct
