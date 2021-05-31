import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoDiffAdded } from 'react-icons/go'
import { MdModeEdit } from 'react-icons/md'
import DeleteProduct from './DeleteProduct'
import { useProductsContext } from './../context/products-context'

const EditProducts = ({ shopId }) => {
  const { fechProductsByShop } = useProductsContext()
  const [products, setProducts] = useState([])
  useEffect(() => {
    fechProductsByShop(shopId).then((data) => {
      if (data.error) {
      } else {
        setProducts(data)
      }
    })
  }, [fechProductsByShop, shopId])

  return (
    <Wrapper>
      <section className='title'>
        <h3>products</h3>
        <Link className='btn' to={`/seller/${shopId}/products/new`}>
          <GoDiffAdded className='plus' />
          new product
        </Link>
      </section>
      <section>
        {products.length > 0 &&
          products.map((product, i) => {
            console.log(product)
            return (
              <>
                <article className='shop' key={i}>
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].name}
                  />
                  <div className='shop-info'>
                    <h4>{product.name}</h4>
                    <p>
                      Quantity: {product.quantity} | Price: ${product.price}
                    </p>
                  </div>
                  <Link
                    className='edit'
                    to={`/seller/${product.shop._id}/${product._id}/edit`}
                  >
                    <MdModeEdit />
                  </Link>
                  <DeleteProduct key={product._id} product={product} />
                </article>
                <hr></hr>
              </>
            )
          })}
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  box-shadow: var(--dark-shadow);
  border-radius: var(--raduis);
  padding: 1rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.5rem;
    place-items: center;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  .shop {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    column-gap: 1.5rem;
    margin: 0.5rem 0;
    padding: 0 1rem;
  }
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  h4,
  p {
    margin-bottom: 0;
  }
  h4 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  p {
    color: var(--clr-grey-5);
    letter-spacing: var(--spacing);
  }
  .edit svg {
    color: var(--clr-primary-5);
    transition: var(--transition);
    font-size: 2rem;
    cursor: pointer;
    border-color: transparent;
  }
  @media (max-width: 400px) {
    .edit {
      display: none;
    }
  }
`
export default EditProducts
