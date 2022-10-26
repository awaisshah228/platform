import React, { FC } from "react";
import PostCardCommentBtn from "../PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "../../containers/PostCardLikeContainer/PostCardLikeContainer";
import { PostDataType } from "../../data/types";
import PostCardLikeContainerV2 from "../../containers/PostCardLikeContainer/PostCardLikeContainer.tsxV2";

export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  // postData: Pick<PostDataType, "like" | "id" | "href" | "commentCount">;
  postData?:any;
  hiddenCommentOnMobile?: boolean;
  onClickLike?: (id: PostDataType["id"]) => void;
}

const PostCardLikeAndCommentV2: FC<PostCardLikeAndCommentProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  postData,
  onClickLike = () => {},
}) => {

  // console.log(postData)
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >
      <PostCardLikeContainerV2
        className={itemClass}
        like={postData.likes}
        onClickLike={onClickLike}
        postId={postData.id}
        post={postData}
      />
      <PostCardCommentBtn
        href={postData.href}
        commentCount={postData.commentCount??0}
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
      />
    </div>
  );
};

export default PostCardLikeAndCommentV2;
