import React from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from './../assets/logo.svg'
import { links } from './../utils/constants'
import CartButtons from './CartButtons'
import { useProductsContext } from './../context/products-context'

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useProductsContext()

  return (
    <SidebarContainer>
      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <header>
          <img src={logo} alt='comfy' className='logo' />
          <button className='close-btn' onClick={closeSidebar}>
            <FaTimes />
          </button>
        </header>
        <ul className='links'>
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            )
          })}
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    align-items: center;
  }
  .close-btn {
    background: transparent;
    border: transparent;
    font-size: 2rem;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    height: 45px;
    justify-self: center;
  }
  .links {
    margin-bottom: 2rem;
  }

  .links a {
    color: var(--clr-grey-3);
    display: block;
    font-size: 1rem;
    padding: 1rem 1.5rem;
    text-transform: capitalize;
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }
  .links a:hover {
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
  }
  .show-sidebar {
    z-index: 99;
    transform: translate(0);
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`
export default Sidebar
