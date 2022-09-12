import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import PageRender from './PageRender'

// interface Props{
//     children : React.ReactNode
// }

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<PageRender/>} />
          <Route path="/:page" element={<PageRender/>} />
          <Route path="/:page/:slug" element={<PageRender/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default index