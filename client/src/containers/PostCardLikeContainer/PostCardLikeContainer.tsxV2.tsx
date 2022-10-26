import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  selectRecentLikeds,
  selectRecentRemoveds,
  removeLikedByPostId,
  addNewLikedByPostId,
} from "../../app/postLikes/postLikes";

import { PostDataType } from "../../data/types";
import PostCardLikeAction, {
  PostCardLikeActionProps,
} from "../../components/PostCardLikeAction/PostCardLikeAction";

export interface PostCardLikeContainerProps
  extends Omit<PostCardLikeActionProps, "isLiked" | "likeCount"> {
  like: any;
  post:{
    likes:[]
    [x : string]: any
  }
}

const PostCardLikeContainerV2: FC<PostCardLikeContainerProps> = ({
  like,
  postId,
  onClickLike,
  post,
  ...args
}) => {
  const recentLikeds = useAppSelector(selectRecentLikeds);
  const recentRemoveds = useAppSelector(selectRecentRemoveds);
  const dispatch = useAppDispatch();

  const isLiked = () => {
    // if(post.likes.lenght){
    //    if (post.likes.includes(post.id)) {
    //   return true;
    // }

    // }
   
    // if (like.isLiked && !recentRemoveds.includes(postId)) {
    //   return true;
    // }
    return false;
  };

  const getLikeCount = (): number => {
    // Recent Liked
    // if (recentLikeds.includes(postId)) {
    //   return like.count + 1;
    // }
    // if (like.isLiked && recentRemoveds.includes(postId)) {
    //   return like.count - 1;
    // }
    // console.log(post.likes.lenght??0)
    // return like.length;
    // console.log(post?.likes?.length)
    return post?.likes?.length??0;
  };

  const handleClickLike = () => {
    // if (isLiked()) {
    //   dispatch(removeLikedByPostId(postId));
    // } else {
    //   dispatch(addNewLikedByPostId(postId));
    // }
    // onClickLike && onClickLike(postId);
  };
  // console.log(post)

  return (
    // <div>Hi</div>
    <PostCardLikeAction
      {...args}
      isLiked={isLiked()}
      likeCount={getLikeCount()}
      postId={postId}
      onClickLike={handleClickLike}
    />
  );
};

export default PostCardLikeContainerV2;
