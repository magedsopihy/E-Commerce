import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useShopContext } from './../context/shop-context'

const AllShopsPage = () => {
  const { listAllShops } = useShopContext()
  const [values, setValues] = useState({
    error: '',
    shops: [],
  })
  const list = async () => {
    const response = await listAllShops()
    console.log(response)
    if (response.error) {
      setValues({ ...values, error: response.error })
    } else {
      setValues({ ...values, shops: response })
    }
  }
  useEffect(() => {
    list()
  }, [])

  return (
    <Wrapper className='page-100'>
      <section className='title'>
        <h3>all retail shops</h3>
      </section>
      <section className='shops'>
        {values.shops.length > 0 &&
          values.shops.map((shop, i) => {
            return (
              <>
                <Link className='shop' key={i} to={`/shops/${shop._id}`}>
                  <img src={shop.image.url} alt={shop.image.name} />
                  <div className='shop-info'>
                    <h4>{shop.name}</h4>
                    <p>{shop.description}</p>
                  </div>
                </Link>
                <hr></hr>
              </>
            )
          })}
      </section>
    </Wrapper>
  )
}
const Wrapper = styled.main`
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
  .shop {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    column-gap: 1.5rem;
    margin: 0.5rem 0;
    padding: 0 1rem;
  }
  a {
    color: var(--clr-grey-1);
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
`
export default AllShopsPage
