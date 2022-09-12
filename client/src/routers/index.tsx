import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import PageRender from './PageRender'
import HeaderContainer from '../containers/HeaderContainer/HeaderContainer'

// interface Props{
//     children : React.ReactNode
// }

const index = () => {
  return (
    <BrowserRouter>
    <HeaderContainer />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
          <Route path="/" element={<App/>} />
          <Route path="/:page" element={<PageRender/>} />
          <Route path="/:page/:slug" element={<PageRender/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default index