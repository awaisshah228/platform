import React, { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "../../data/types";
import { SINGLE } from "../../data/single";
import SingleContent from "./SingleContent";
import { CommentType } from "../../components/CommentCard/CommentCard";
import SingleRelatedPosts from "./SingleRelatedPosts";
import { useAppDispatch } from "../../app/hook";
import { Sidebar } from "./Sidebar";
import SingleHeader from "./SingleHeader";
import { useParams } from "react-router-dom";
import { getAPI } from "../../utils/fetchData";
import { toast } from "react-toastify";

export interface PageSingleTemp3SidebarProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingleTemp3Sidebar: FC<PageSingleTemp3SidebarProps> = ({
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const {slug}=useParams()
  console.log(slug)
  const [blog, setblog] = useState<any>({})

  const populateData=async ()=>{
    try {

      const res= await getAPI(`blog/${slug}`)
      console.log(res.data)
      setblog(res.data)
      
    } catch (error) {

      if (error.response && error.response.data.errors) {
        toast.error("Error fetching blog", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return ;
      }
      
    }
    
  }

  useEffect(()=>{
    populateData();

  },[])

  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
 

  return (
    <>
      <div
        className={`nc-PageSingleTemp3Sidebar ${className}`}
        data-nc-id="PageSingleTemp3Sidebar"
      >
        <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
          {/* SINGLE HEADER */}
          <div className="dark container relative z-10">
            <div className="max-w-screen-md">
              <SingleHeader
                hiddenDesc
                metaActionStyle="style2"
                pageData={blog}
              />
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
            <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r"></div>
            <img
              className="block w-full h-full object-cover"
              src={blog?.thumbnail??''}
              alt=""
            />
          </div>
        </header>


        {/* <div className="container">
          <SingleContent data={blog} />
        </div> */}

        

        {/* SINGLE MAIN CONTENT */}
        <div className="container flex flex-col my-10 lg:flex-row ">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-20">
            <SingleContent data={blog} />
          </div>
          <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
            <Sidebar />
          </div>
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts />
      </div>
    </>
  );
};

export default PageSingleTemp3Sidebar;
