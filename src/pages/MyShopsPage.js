import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoDiffAdded } from 'react-icons/go'
import { MdModeEdit } from 'react-icons/md'
import { useShopContext } from './../context/shop-context'
import { DeleteShop } from './../components'

const MyShopsPage = () => {
  const { listShopsByOwner, myShops } = useShopContext()

  useEffect(() => {
    listShopsByOwner()
  }, [listShopsByOwner])

  return (
    <Wrapper className='page-100'>
      <section className='title'>
        <h3>your shops</h3>
        <Link className='btn' to='/shops/create'>
          <GoDiffAdded className='plus' />
          new shop
        </Link>
      </section>
      <section className='shops'>
        {myShops.length === 0 ? (
          <h3 className='no-shops'> you don't have any shops yet</h3>
        ) : (
          myShops.map((shop, i) => {
            return (
              <>
                <article className='shop' key={i}>
                  <img src={shop.image.url} alt={shop.image.name} />
                  <div className='shop-info'>
                    <h4>{shop.name}</h4>
                    <p>{shop.description}</p>
                  </div>
                  <Link className='edit' to={`/seller/shop/edit/${shop._id}`}>
                    <MdModeEdit />
                  </Link>
                  <DeleteShop key={i} shop={shop} />
                </article>
                <hr></hr>
              </>
            )
          })
        )}
      </section>
    </Wrapper>
  )
}
const Wrapper = styled.main`
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.5rem;
    place-items: center;
  }

  width: 90vw;
  max-width: var(--max-width);
  min-width: 300px;
  margin: 0 auto;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  .no-shops {
    display: grid;
    place-items: center;
    margin-top: 4rem;
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
export default MyShopsPage
