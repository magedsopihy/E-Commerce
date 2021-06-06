import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, ProductsList } from './../components'
import { useProductsContext } from './../context/products-context'

const ShopPage = () => {
  const { shopId } = useParams()
  const { fechProductsByShop } = useProductsContext()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const source = axios.CancelToken.source()
    fechProductsByShop(shopId, source.token).then((data) => {
      if (data.error) {
      } else {
        setProducts(data)
      }
    })
    return () => source.cancel()
  }, [shopId])

  console.log(products)
  return (
    <Wrapper className='page-100 section-center'>
      <div>
        <Card id={shopId} />
      </div>
      <ProductsList shopProducts={products} />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  max-width: var(--max-width);
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 2rem;
`
export default ShopPage
