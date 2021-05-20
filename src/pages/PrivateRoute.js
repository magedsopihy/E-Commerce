import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserContext } from './../context/user-context'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUserContext()
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
