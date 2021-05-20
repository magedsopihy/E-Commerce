import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { EditShop, EditProducts } from './../components'

const EditShopPage = () => {
  const { shopId } = useParams()

  return (
    <Wrapper className='section-center'>
      <EditShop shopId={shopId} />
      <EditProducts shopId={shopId} />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  margin-top: 4rem;
  max-width: var(--max-width);
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 2rem;
`
export default EditShopPage
