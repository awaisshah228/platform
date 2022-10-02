import React, { FC } from "react";
import PostCardCommentBtn from "../PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "../../containers/PostCardLikeContainer/PostCardLikeContainer";
import { PostDataType } from "../../data/types";

export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  postData: any;
  hiddenCommentOnMobile?: boolean;
  onClickLike?: (id: PostDataType["id"]) => void;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  postData,
  onClickLike = () => {},
}) => {

  console.log(postData)
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >

      {/* hi */}
      <PostCardLikeContainer
        className={itemClass}
        like={postData.like}
        onClickLike={onClickLike}
        postId={postData.id}
      />
      <PostCardCommentBtn
        href={postData.href}
        commentCount={postData.commentCount}
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
      />
    </div>
  );
};

export default PostCardLikeAndComment;
