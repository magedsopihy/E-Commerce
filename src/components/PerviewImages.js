import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const PerviewImages = ({ images }) => {
  const [mainImage, setMainImage] = useState([])
  useEffect(() => {
    if (images[0].url) {
      setMainImage(images[0].url)
    } else {
      setMainImage(images[0])
    }
  }, [images])
  return (
    <Wrapper>
      <img src={mainImage} alt='frist one in' className='main' />
      <section className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              src={image.url ? image.url : image}
              alt={image}
              key={index}
              onClick={() => setMainImage(images[index])}
              // className={`${image.url === mainImage.url ? 'active' : null} `}
            />
          )
        })}
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 400px;
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
      height: 400px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`
export default PerviewImages
