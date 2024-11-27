import React from 'react'
import {
  useRoutes
} from 'react-router-dom'
import router from './router/index'

const App = () => {
  const routes = useRoutes(router)
  return (
    <div className='app'>{ routes }</div>
  )
}

export default App