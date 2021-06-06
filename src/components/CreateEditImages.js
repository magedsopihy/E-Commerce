import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ImCross } from 'react-icons/im'
import defaultImage from './../assets/default.jpg'

const CreateEditImages = ({ images }) => {
  const [mainImage, setMainImage] = useState([])
  const [allImages, setAllImages] = useState([])

  useEffect(() => {
    setAllImages(images)
  }, [])

  useEffect(() => {
    if (allImages.length !== 0 && allImages[0].url) {
      setMainImage(allImages[0].url)
    } else {
      setMainImage(allImages[0])
    }
  }, [allImages])

  const removeImage = (index) => {
    const tempImages = allImages.filter((data, idx) => idx !== index)
    setAllImages(tempImages)
  }

  if (allImages.length === 0) {
    return <NoImages />
  }
  return (
    <Wrapper>
      <div className='main'>
        <img src={mainImage} alt='frist one in' />
      </div>
      <div className='gallery'>
        {allImages.map((image, index) => {
          return (
            <div className='gallery-item'>
              <img
                src={image.url ? image.url : image}
                alt={image}
                key={index}
                onClick={() => setMainImage(allImages[index])}
                // className={`${image.url === mainImage.url ? 'active' : null} `}
              />
              <ImCross key={index + 1} onClick={() => removeImage(index)} />
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

const NoImages = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${defaultImage});
  background-size: cover;
  background-position: center;
`

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  .main {
    margin-right: 2rem;
  }
  .main img {
    border-radius: var(--radius);
    width: 300px;
    height: 300px;
    object-fit: cover;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    grid-template-rows: 100px;
    .gallery-item {
      position: relative;
    }
    img {
      height: 100px;
      object-fit: cover;
      width: 100%;
      cursor: pointer;
      border-radius: var(--radius);
    }
    svg {
      color: var(--clr-red-dark);
      font-size: 1rem;
      position: absolute;
      right: -7px;
      top: -5px;
      display: none;
      cursor: pointer;
    }
  }
  .gallery-item img:hover {
    border: 1px solid var(--clr-red-dark);
  }
  .gallery-item:hover svg {
    display: block;
  }

  /*  .active {
    border: 2px solid var(--clr-primary-5);
  } */
  @media (max-width: 800px) {
    .gallery {
      img {
        height: 75px;
      }
    }
  }
  @media (max-width: 700px) {
    .gallery {
      img {
        height: 50px;
      }
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    .main {
      margin-right: 0;
      margin-bottom: 1rem;
    }
    .main img {
      height: 250px;
      width: 100%;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`
export default CreateEditImages
