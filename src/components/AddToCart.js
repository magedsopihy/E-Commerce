import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import AmountButtons from './AmountButtons'
import { useCartContext } from './../context/cart-context'
const AddToCart = ({ product }) => {
  const { id, colors, quantity } = product
  const { addToCart } = useCartContext()
  const [mainColor, setMainColor] = useState(colors[0].color)
  const [amount, setAmount] = useState(1)

  const increase = () => {
    if (amount < quantity) {
      setAmount(amount + 1)
    } else {
      return amount
    }
  }
  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1)
    } else {
      return amount
    }
  }

  return (
    <Wrapper>
      <section className='colors'>
        <span>colors:</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ background: color.color }}
                className={`${
                  mainColor === color.color ? 'color-btn active' : 'color-btn'
                }`}
                onClick={() => setMainColor(colors[index].color)}
              >
                {mainColor === color.color ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </section>
      <section className='btn-container'>
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to='/cart'
          className='btn'
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          add to cart
        </Link>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }

  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`

export default AddToCart
