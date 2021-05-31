import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useUserContext } from './../context/user-context'
import { DeleteShop } from './../components'
import { MdModeEdit } from 'react-icons/md'
import logo from './../assets/no_logo.png'
import stripeButton from './../assets/stripeButton.png'
// const client_id = 'ca_JYpQpQPMrGTSSDE2MLRx09lbAoymk6xn'

const ProfilePage = () => {
  const { readUserProfile } = useUserContext()
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [setRedirectToSignin] = useState(false)

  useEffect(() => {
    readUserProfile(userId).then((response) => {
      if (response.error) {
        setRedirectToSignin(true)
      } else {
        setUser(response)
      }
    })
  }, [readUserProfile, setRedirectToSignin, userId])

  return (
    <Wrapper className='page-100'>
      <>
        <article className='shop'>
          <img src={logo} alt={user.fName} className='image' />
          <div className='shop-info'>
            <h4>{user.fName + ' ' + user.lName}</h4>
            <p>{user.email}</p>
          </div>
          {user.seller &&
            (user.stripe_seller ? (
              <button className='btn' disabled>
                Stripe connected
              </button>
            ) : (
              <a
                href={
                  'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_JYpQqNvaly7fDPjmLrOC5HXenVCnADmh&scope=read_write'
                }
              >
                <img src={stripeButton} alt='connect to stripe ' />
              </a>
            ))}
          <Link className='edit' to={`/user/edit/${userId}`}>
            <MdModeEdit />
          </Link>
          <DeleteShop />
        </article>
        <hr></hr>
        <section className='seller-info'>
          <h4>Seller Status:</h4>
          <p>{user.seller ? 'Acitve Seller' : 'Not A seller'}</p>
        </section>
        <hr></hr>
        <p>Joined: {new Date(user.created).toDateString()}</p>
      </>
    </Wrapper>
  )
}
const Wrapper = styled.main`
  width: 90vw;
  max-width: var(--max-width);
  min-width: 300px;
  margin: 0 auto;
  .shop {
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    align-items: center;
    column-gap: 1.5rem;
    margin: 0.5rem 0;
    padding: 0 1rem;
  }
  .image {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  /* #stripe-btn {
    display: inline-block;
    width: 120px;
    height: 15px;
    border-radius: 0;
    object-fit: cover;
  }
  #stripe-btn img {
    width: 100%;
  } */
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
  .seller-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;
  }
  @media (max-width: 400px) {
    .edit {
      display: none;
    }
  }
`
export default ProfilePage
