import React from 'react'
import { Helmet } from 'react-helmet';
import LayoutPage from '../components/LayoutPage/LayoutPage';
import CreatBlogPage from '../containers/BlogContainer/CreateBlogPage'
import PrivatePage from '../routers/PrivatePage';
const CreatBlog = () => {
  return (
    <PrivatePage>
    <div>
  <Helmet>
    <title>Create Blog || Blog Magazine React Template</title>
  </Helmet>
  <LayoutPage
    subHeading="Spread Knowledge"
    headingEmoji="📝"
    heading="Create Your Blog"
  >
     <CreatBlogPage/>
    
  </LayoutPage>
</div>
</PrivatePage>
 
    
  )
}

export default CreatBlog