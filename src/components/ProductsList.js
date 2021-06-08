import React from 'react'
import GridView from './GridView'
import Listview from './Listview'
import { useFilterContext } from './../context/filter-context'
const ProductsList = () => {
  const { filteredProducts, gridView } = useFilterContext()

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        sorry, no products matches your search
      </h5>
    )
  }
  if (gridView === false) {
    return <Listview products={filteredProducts} />
  }
  return <GridView products={filteredProducts} />
}

export default ProductsList
