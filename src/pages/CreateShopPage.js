import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CreateShop } from './../components'
import { useUserContext } from './../context/user-context'

const CreateShopPage = () => {
  const { user } = useUserContext()
  console.log(user)
  if (user) {
    return <CreateShop />
  }

  return (
    <Wrapper className='page-100'>
      <h3>
        Expand your network with us <br />
      </h3>
      <Link to='/register' className='btn'>
        sign up now
      </Link>
    </Wrapper>
  )
}
const Wrapper = styled.main`
  display: grid;
  place-items: center;
  text-align: center;
`
export default CreateShopPage
