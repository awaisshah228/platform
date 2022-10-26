import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import NcImage from "../../components/NcImage/NcImage";
import PaginationV2 from "../../components/Pagination/Pagination2";
import { getAPI } from "../../utils/fetchData";
import { deleteBlog } from "../../app/blogs/blogActions";
import { useAppDispatch } from "../../app/hook";



const DashboardPosts = () => {
 
  const [data, setdata] = useState<any>({})
  const user=useAppSelector(state=>state.auth.user)
  const dispatch= useAppDispatch();

  const populateData=async(num:number=1)=>{

    const posts= await getAPI(`blog/user/${user.id}?page=${num}`)
    setdata(posts.data)

  }

  useEffect(() => {
    
    populateData()
    
  }, [])
  

  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Article
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Status
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {data.blogs?.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                          src={item.thumbnail}
                        />
                        <div className="ml-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                            {item.title}
                          </h2>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      {item.liveStatus ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                          Offline
                        </span>
                      )}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <span> {item.type?? 'free'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      <Link
                        // href="/#"
                        to={`/dashboard/edit-blog/${item._id}`}
                        className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                      >
                        Edit
                      </Link>
                      {` | `}
                      <a
                        href="#"
                        onClick={()=>dispatch(deleteBlog({id:item._id}))}
                        className="text-rose-600 hover:text-rose-900"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <Pagination /> */}
      <PaginationV2 total={data.total} callback={populateData} />
    </div>
  );
};

export default DashboardPosts;
