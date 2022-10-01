import React, { FC, useEffect, useRef } from "react";
import NcImage from "../NcImage/NcImage";
import { PostDataType } from "../../data/types";
import GallerySlider from "./GallerySlider";
import MediaVideo from "./MediaVideo";
import PostTypeFeaturedIcon from "../PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import MediaAudio from "./MediaAudio";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { Link } from "react-router-dom";
import NcImageV2 from "../NcImage/NcImageV2";

export interface PostFeaturedMediaProps {
  className?: string;
  post: any;
  isHover?: boolean;
}
// const postType="standard"

// CHECK FOR VIDEO CARD ON VIEW

const PostFeaturedMedia: FC<PostFeaturedMediaProps> = ({
  className = " w-full h-full ",
  post,
  isHover = false,
}) => {
  const { thumbnail:featuredImage,  id } =
    post;
    

 
 
 

  const isPostMedia = () =>  false;

 

  // 


  return (
    <div
      className={`nc-PostFeaturedMedia relative ${className}`}
      data-nc-id="PostFeaturedMedia"
      // ref={videoRef}
    >
      {/* <img src={featuredImage} alt="" /> */}
      <NcImageV2 containerClassName="absolute inset-0" src={featuredImage} />
      
    </div>
  );
};

export default PostFeaturedMedia;
