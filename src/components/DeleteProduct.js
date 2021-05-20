import React from 'react'
import { MdDelete } from 'react-icons/md'
import styled from 'styled-components'
import { useProductsContext } from './../context/products-context'

const DeleteProduct = ({ product }) => {
  const { deleteProduct } = useProductsContext()

  return (
    <DeleteButton onClick={() => deleteProduct(product.shop._id, product._id)}>
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
export default DeleteProduct
