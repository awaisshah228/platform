import { PostActionDropdownProps } from "../PostActionDropdown/PostActionDropdown";
import BookmarkContainer from "../../containers/BookmarkContainer/BookmarkContainer";
import { PostDataType } from "../../data/types";
import React, { FC } from "react";
import BookmarkContainerV2 from "../../containers/BookmarkContainer/BookmarkContainerV2";

export interface PostCardSaveActionProps
  extends Pick<PostActionDropdownProps, "dropdownPositon"> {
  className?: string;
  classBgIcon?: string;
  readingTime?: number;
  hidenReadingTime?: boolean;
  postData: PostDataType;
}

const PostCardSaveActionV2: FC<PostCardSaveActionProps> = ({
  className = "",
  hidenReadingTime = false,
  classBgIcon,
  readingTime,
  postData,
}) => {
  const { bookmark, id } = postData;

  return (
    <div
      className={`nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 ${className}`}
      data-nc-id="PostCardSaveAction"
    >
      {!hidenReadingTime && !!readingTime && (
        <span>{readingTime} min read</span>
      )}

      <BookmarkContainerV2
        // initBookmarked={bookmark.isBookmarked}
        containerClassName={classBgIcon}
        postId={id}
      />
    </div>
  );
};

export default PostCardSaveActionV2;
