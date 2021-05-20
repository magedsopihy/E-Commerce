import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products-context'
import { FilterProvider } from './context/filter-context'
import { CartProvider } from './context/cart-context'
import { UserProvider } from './context/user-context'
import { ShopProvider } from './context/shop-context'

ReactDOM.render(
  <UserProvider>
    <ShopProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </ShopProvider>
  </UserProvider>,
  document.getElementById('root')
)
