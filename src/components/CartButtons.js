import React from 'react'
import { FaShoppingCart, FaUserPlus, FaUserMinus } from 'react-icons/fa'

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useCartContext } from './../context/cart-context'
import { useUserContext } from './../context/user-context'

const CartButtons = () => {
  const { isAuthenticated, authorizedId, logout, seller } = useUserContext()

  const { totalItems } = useCartContext()

  return (
    <Wrapper className='cart-btn-wrapper'>
      {isAuthenticated ? (
        <>
          {seller && (
            <Link to='/seller/shops' className='seller-btn'>
              My Shops
            </Link>
          )}
          <Link to={`/user/${authorizedId}`} className='seller-btn'>
            Profile
          </Link>
        </>
      ) : (
        <Link to='/shops/create' className='seller-btn'>
          Sell
        </Link>
      )}
      {isAuthenticated ? (
        <Link to='/' className='auth-btn' onClick={logout}>
          logout <FaUserMinus />
        </Link>
      ) : (
        <Link to='/login' className='auth-btn'>
          login <FaUserPlus />
        </Link>
      )}
      <Link to='/cart' className='cart-btn'>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />

          <span className='cart-amount'>{totalItems}</span>
        </span>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  width: 400px;

  .cart-btn {
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    font-size: 1rem;
    display: flex;
    align-items: center;
  }

  .cart-container {
    display: flex;
    position: relative;
    align-items: center;
    svg {
      height: 1.75rem;
      margin-left: 5px;
    }
  }

  .cart-amount {
    position: absolute;
    background: var(--clr-primary-5);
    border-radius: 50%;
    color: var(--clr-white);
    font-size: 0.75rem;
    padding: 12px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -10px;
    left: 16px;
  }

  .auth-btn {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    /* letter-spacing: var(--spacing); */
    color: var(--clr-grey-1);
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }
  .seller-btn {
    display: block;
    font-size: 1.2rem;

    color: var(--clr-grey-1);
  }
`
export default CartButtons
