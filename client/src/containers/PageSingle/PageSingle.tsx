import React, { FC, ReactNode, useEffect } from "react";
import { PostDataType, TaxonomyType } from "../../data/types";
import NcImage from "../../components/NcImage/NcImage";
import { SINGLE } from "../../data/single";
import SingleContent from "./SingleContent";
import { CommentType } from "../../components/CommentCard/CommentCard";
import { useAppDispatch, useAppSelector } from "../../app/hook";
// import { changeCurrentPage } from "app/pages/pages";
import SingleHeader from "./SingleHeader";
import SingleRelatedPosts from "./SingleRelatedPosts";

export interface PageSingleProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingle: FC<PageSingleProps> = ({ className = "" }) => {
  const { auth } = useAppSelector((state) => state)
  const dispatch = useAppDispatch();

 

  return (
    <>
      <div
        className={`nc-PageSingle pt-8 lg:pt-16 ${className}`}
        data-nc-id="PageSingle"
      >
        {/* SINGLE HEADER */}
        <header className="container rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <SingleHeader pageData={SINGLE} />
          </div>
        </header>

        {/* FEATURED IMAGE */}
        <NcImage
          containerClassName="container my-10 sm:my-12"
          className="object-cover w-full h-full rounded-xl"
          src={SINGLE.featuredImage}
        />

        {/* SINGLE MAIN CONTENT */}
        <div className="container">
          {/* <SingleContent data={SINGLE} /> */}
          
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts />
      </div>
    </>
  );
};

export default PageSingle;
