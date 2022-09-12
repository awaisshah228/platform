import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'

// interface Props{
//     children : React.ReactNode
// }

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}

export default index