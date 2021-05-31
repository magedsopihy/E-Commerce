import React from 'react'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from './../utils/constants'
import logo from './../assets/logo.svg'
import CartButtons from './CartButtons'
import { useProductsContext } from './../context/products-context'

const Nav = () => {
  const { openSidebar } = useProductsContext()

  return (
    <NavContainer>
      <section className='nav-center'>
        <section className='nav-header'>
          <Link to='/'>
            <img src={logo} alt='comfort market' />
          </Link>
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars />
          </button>
        </section>
        <ul className='nav-links'>
          {links.map(({ id, url, text }) => {
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            )
          })}
        </ul>
        <CartButtons />
      </section>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .nav-center {
    width: 90vw;
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 175px;
      margin-left: -15px;
    }
  }

  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }

  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }

    .nav-links {
      display: flex;
      justify-content: center;

      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`
export default Nav
