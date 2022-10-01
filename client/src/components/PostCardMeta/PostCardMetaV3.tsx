import React, { FC } from "react";
import Avatar from "../Avatar/Avatar";
import { PostDataType } from "../../data/types";
import { Link } from "react-router-dom";

export interface PostCardMetaV2Props {
  className?: string;
  meta: any;
  hiddenAvatar?: boolean;
  size?: "large" | "normal";
}

const PostCardMetaV3: FC<PostCardMetaV2Props> = ({
  className = "leading-none",
  meta,
  hiddenAvatar = false,
  size = "normal",
}) => {
  const { createdAt:date, user:author, title } = meta;
  console.log(meta)
  return (
    <div
      className={`nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
      data-nc-id="PostCardMetaV2"
    >
      <Link to={`/profile/${author?.id}`} className="relative flex items-center space-x-2">
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={
              size === "normal" ? "h-9 w-9 text-base" : "h-10 w-10 text-xl"
            }
            imgUrl={author?.avatar}
            userName={author?.name}
          />
        )}
        <div>
          <h2
            className={`block font-semibold ${
              size === "normal" ? "text-base" : "text-lg"
            }`}
          >
            <span className="line-clamp-1">{title}</span>
          </h2>

          <div className="flex mt-1.5">
            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
              {author?.name}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
              ·
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 font-normal">
              {new Date(date).toLocaleDateString('en-US',{dateStyle: 'long'})}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCardMetaV3;
