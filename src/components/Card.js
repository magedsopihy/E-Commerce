import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from './../assets/no_logo.png'
import { useShopContext } from './../context/shop-context'

const Card = ({ id }) => {
  const { readShop } = useShopContext()
  const [values, setValues] = useState({
    name: '',
    id: null,
    image: '',
    description: '',
    error: '',
  })

  useEffect(async () => {
    try {
      const shop = await readShop(id)
      setValues({
        ...values,
        id: shop._id,
        name: shop.name,
        image: shop.image.url,
        description: shop.description,
      })
    } catch (err) {
      setValues({ ...values, error: err })
    }
  }, [id])

  const logoUrl = values.image ? values.image : logo
  return (
    <Wrapper>
      <h3>{values.name}</h3>
      <img src={logoUrl} alt={values.description} />
      <p>{values.description}</p>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  padding: 1rem 0.5rem;
  width: 300px;
  height: 300px;
  place-items: center;
  box-shadow: var(--dark-shadow);
  border-radius: var(--raduis);
  margin-bottom: 4rem;
  h3 {
  }
  img {
    display: block;
    width: 132px;
    height: 132px;
    border-radius: 50%;
    object-fit: cover;
  }
  p {
    margin-bottom: 0;
    display: block;
    color: var(--clr-grey-5);
  }
`

export default Card
