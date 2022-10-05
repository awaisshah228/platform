import React, { FC, useState } from "react";
import PostCardSaveAction from "../PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "../../data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "../CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "../PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "../PostFeaturedMedia/PostFeaturedMedia";
import { useAppSelector } from "../../app/hook";
import PostFeaturedMediaV2 from "../PostFeaturedMedia/PostFeatureMediaV2";
import CategoryBadgeListV2 from "../CategoryBadgeList/CategoryBadgeListV2";
import PostCardMetaV2 from "../PostCardMeta/PostCardMetaV2";
import PostCardMetaV3 from "../PostCardMeta/PostCardMetaV3";
import PostCardLikeAndCommentV2 from "../PostCardLikeAndComment/PostCardLikeAndComment2";
import PostCardSaveActionV2 from "../PostCardSaveAction/PostCardSaveActionV2";

export interface Card11Props {
  className?: string;
  post?: any;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11V2: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const { title, href, categories, date, category, id } = post;
  console.log(post)

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 relative  flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <PostFeaturedMediaV2 post={post} isHover={isHover} />
        </div>
      </div>
      <Link to={`/blog/${id}`} className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeListV2 category={category} />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* {!hiddenAuthor ? (
          <PostCardMetaV3 meta={post} />
        ) : (
          <span className="text-xs text-neutral-500">{date}</span>
        )} */}
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link
            to={`/blog/${id}`}
            className="line-clamp-2"
            title={title ?? "title"}
          >
            {title ?? "title"}
          </Link>
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndCommentV2 className="relative" postData={post} />
          <PostCardSaveActionV2 className="relative" postData={post} />
        </div>
      </div>
    </div>
  );
};

export default Card11V2;
