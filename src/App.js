import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Nav, Sidebar, Footer } from './components'
import {
  Home,
  Products,
  SingleProduct,
  Error,
  Profile,
  Chectout,
  Cart,
  Login,
  Register,
  CreateShop,
  MyShops,
  PrivateRoute,
  EditShop,
  EditProduct,
  AllShops,
  Shop,
  NewProduct,
  EditProfile,
  StripeConnect,
} from './pages'

function App() {
  return (
    <Router>
      <Nav />
      <Sidebar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/shops/all'>
          <AllShops />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/shops/create'>
          <CreateShop />
        </Route>
        <Route exact path='/shops/:shopId'>
          <Shop />
        </Route>
        <Route path='/seller/stripe/connect' component={StripeConnect} />

        <PrivateRoute path='/seller/shops' component={MyShops} />
        <PrivateRoute path='/user/edit/:userId' component={EditProfile} />
        <PrivateRoute path='/user/:userId' component={Profile} />
        <PrivateRoute path='/seller/shop/edit/:shopId' component={EditShop} />
        <PrivateRoute
          path='/seller/:shopId/:productId/edit'
          component={EditProduct}
        />
        <PrivateRoute
          path='/seller/:shopId/products/new'
          component={NewProduct}
        />
        <Route exact path='/products/:id' children={<SingleProduct />} />
        <Route exact path='/checkout'>
          <Chectout />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
