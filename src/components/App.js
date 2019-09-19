import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './common/Header'
import HomePage from './home/HomePage'
import AboutPage from './about/AboutPage'
import PageNotFount from './PageNotFound'

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFount} />
      </Switch>
    </div>
  )
}

export default App
