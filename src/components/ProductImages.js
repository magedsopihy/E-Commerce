import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ images = [{ url: '' }] }) => {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <Wrapper>
      <img src={mainImage.url} alt='frist image' className='main' />
      <section className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => setMainImage(images[index])}
              className={`${image.url === mainImage.url ? 'active' : null} `}
            />
          )
        })}
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    border-radius: var(--radius);
    object-fit: cover;
    width: 100%;
    display: block;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`
export default ProductImages
