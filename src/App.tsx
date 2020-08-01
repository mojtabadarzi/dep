import React, { useEffect, useState } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

//components
import Template from './container/Template'
import Login from './pages/Login'

//redux
import { useSelectorUserInfo } from './selectors/selectors'
import { useDispatch } from 'react-redux'

//const
import routes from './routes'

function App(props) {
  const [loading, setLoading] = useState(true)
  const token = useSelectorUserInfo().token
  const dispatch = useDispatch()
  const { history, location } = props

  useEffect(() => {
    if (!token) {
      setLoading(false)
      history.replace('/login')
    } else if (token && location.pathname === '/login') {
      setLoading(false)
      history.replace('/live-report')
    } else if (token && location.pathname === '/') {
      setLoading(false)
      history.replace('/live-report')
    } else {
      setLoading(false)
    }
  }, [token, dispatch, history, location.pathname])

  if (loading) {
    return (
      <div className="big-loading">
        <div className="loading-three-dot"></div>
      </div>
    )
  } else if (!loading) {
    if (!token) {
      return <Route exact path="/login" component={Login} />
    } else {
      return (
        <Template {...props}>
          <Switch>
            {routes.map((route) => {
              const { Component, key, path, exact } = route
              return <Route key={key} exact={exact} path={path} component={Component} {...props} />
            })}
          </Switch>
        </Template>
      )
    }
  }
  return (
    <div className="big-loading">
      <div className="loading-three-dot"></div>
    </div>
  )
}
export default withRouter(App)
