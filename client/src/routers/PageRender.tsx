import React from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from '../utils/types'
// import NotFound from './components/global/NotFound'
import Page404 from '../containers/Page404'


const generatePage = (name: string) => {
  const component = () => require(`../pages/${name}`).default

  try {
    return React.createElement(component())
  } catch (err) {
    // return <NotFound />;
    return <Page404 />
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