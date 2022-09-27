import React, { FC } from "react";
import Avatar from "../Avatar/Avatar";
import { PostDataType } from "../../data/types";
import { Link } from "react-router-dom";

export interface PostMeta2Props {
  className?: string;
  meta: any;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
  // user: any
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  meta,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  const { createdAt:date, user, category, readingTime } = meta;
  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
      data-nc-id="PostMeta2"
    >
      <Link to={`profile/${user?.id}`} className="flex items-center space-x-2">
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={user?.avatar}
          userName={user?.name}
        />
      </Link>
      <div className="ml-3">
        <div className="flex items-center">
          <Link to={`profile/${user?.id}`} className="block font-semibold">
            {user?.name}
          </Link>

          {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ml-0">
                <span className="text-xs">🏷 </span>
                {/* {categories.map((cat, index) => ( */}
                  <Link key={category?.id} to={`/category/${category?.id}`} className="font-semibold">
                    {category?.name}
                  </Link>
                {/* ))} */}
              </div>
            </>
          )}
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">{new Date(date).toLocaleDateString('en-US',{dateStyle: 'long'})}</span>
          <span className="mx-2 font-semibold">·</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            {readingTime??2} min read
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostMeta2;
