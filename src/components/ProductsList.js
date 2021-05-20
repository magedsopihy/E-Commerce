import React from 'react'
import styled from 'styled-components'
import GridView from './GridView'
import Listview from './Listview'
import { useFilterContext } from './../context/filter-context'
const ProductsList = ({ shopProducts }) => {
  console.log(shopProducts)
  const { filteredProducts, gridView } = useFilterContext()

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        sorry, no products matches your search
      </h5>
    )
  }
  if (gridView === false) {
    return (
      <Listview
        products={
          shopProducts && shopProducts.length > 0
            ? shopProducts
            : filteredProducts
        }
      />
    )
  }
  return (
    <GridView
      products={
        shopProducts && shopProducts.length > 0
          ? shopProducts
          : filteredProducts
      }
    />
  )
}

export default ProductsList
