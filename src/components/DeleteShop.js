import React from 'react'
import { MdDelete } from 'react-icons/md'
import styled from 'styled-components'
import { useShopContext } from './../context/shop-context'

const DeleteShop = ({ shop }) => {
  const { deleteShop } = useShopContext()

  return (
    <DeleteButton onClick={() => deleteShop(shop._id)}>
      <MdDelete />
    </DeleteButton>
  )
}

const DeleteButton = styled.button`
  color: var(--clr-red-dark);
  background: transparent;
  border: transparent;
  font-size: 2rem;
  cursor: pointer;
  @media (max-width: 400px) {
    display: none;
  }
`
export default DeleteShop
