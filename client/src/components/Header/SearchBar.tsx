import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { getAPI } from '../../utils/fetchData';
import Input from '../Input/Input'

const SearchBar = () => {
    const [search, setsearch] = useState('');
    const [blogs, setBlogs] = useState([])


    const { pathname } = useLocation()

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if(search.length < 2) return setBlogs([]);

      try {
        const res = await getAPI(`blog/search/?title=${search}`)
        setBlogs(res.data)
      } catch (err) {
        console.log(err)
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
  },[search])


  useEffect(() => {
    setsearch('')
    setBlogs([])
  },[pathname])
    
  return (
   <div className="hidden sm:block flex-grow max-w-xs">
            <form action="" method="POST" className="relative">
              <Input
                type="search"
                placeholder="Search items"
                className="pr-10 w-full"
                sizeClass="h-[42px] pl-4 py-3"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500 dark:text-neutral-400">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input type="submit" hidden value="" />
              {
        search.length >= 2 &&
        <div className="absolute py-2 px-1 w-80 flex flex-col gap-4 bg-white rounded-md  "
        style={{
           zIndex: 10,
          maxHeight: 'calc(100vh - 100px)',
          overflow: 'auto'
        }}>
          {
            blogs.length
            ? blogs.map(blog => (
            //   <CardHoriz key={blog._id} blog={blog} />
            <div className='flex border-b-2 border-blue  '>
                <div>
                    <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                </div>

                
            </div>
            ))
            : <h3 className="text-center">No Blogs</h3>
          }
        </div>
      }

            </form>
          
          </div>

    )
}

export default SearchBar