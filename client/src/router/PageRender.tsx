import React from 'react'
import { useParams } from 'react-router-dom'
// import { IParams } from '../utils/types'
// import NotFound from './components/global/NotFound'


const generatePage = (name: string) => {
  const component = () => require(`./pages/${name}`).default

  try {
    return React.createElement(component())
  } catch (err) {
    // return <NotFound />;
    return <div>Not found</div>
  }
}

const PageRender = () => {
  const { page, slug }= useParams()

  let name = '';

  if(page){
    name = slug ? `${page}/[slug]` : `${page}`
  }

  return generatePage(name)
}

export default PageRender