import React, { FC, useEffect, useRef } from "react";
import Tag from "../../components/Tag/Tag";
import { SinglePageType } from "./PageSingle";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SingleContentDemo from "./SingleContentDemo";
import { useLocation } from "react-router";
import SingleAuthorV2 from "./SingleAuthorV2";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import Input from "../../components/Editor/Input";
import { createComment } from './../../app/comments/commentAction';
import { useAppDispatch } from './../../app/hook';


export interface SingleContentProps {
  data: any;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const { tags, author, commentCount, comments } = data;
  const commentRef = useRef<HTMLDivElement>(null);
  const auth=useAppSelector(state=>state.auth)
  const dispatch= useAppDispatch()
  //
  const location = useLocation();
  const {slug}=useParams()


  const handleComment=(body)=>{
    if(!auth.user || !auth.access_token) return;

    const comment = {
      content: body,
      user: auth.user,
      blog_id: data.id,
      blog_user_id: data.user.id,
      createdAt: new Date().toISOString()
    }
    console.log(comment)
    dispatch(
      createComment(comment)
    );

    // setShowComments([data, ...showComments])
    // dispatch(createComment(data, auth.access_token))

    // console.log(body)

  }

  useEffect(() => {
    //  SCROLL TO COMMENT AREA
    if (location.hash !== "#comment") {
      return;
    }
    //
    if (location.hash === "#comment") {
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView();
        }
      }, 500);
    }
  }, [location]);

  return (
    <div className="nc-SingleContent space-y-10">
      {/* ENTRY CONTENT */}
      <div
        id="single-entry-content"
        className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
      >
        {/* THIS IS THE DEMP CONTENT */}
        {/* IF YOUR DATA IS JSON, YOU CAN USE render with html-react-parser (https://www.npmjs.com/package/html-react-parser) */}
        <SingleContentDemo data={data} />
      </div>

      {/* TAGS */}
      {/* <div className="max-w-screen-md mx-auto flex flex-wrap">
        {tags.map((item) => (
          <Tag hideCount key={item.id} tag={item} className="mr-2 mb-2" />
        ))}
      </div> */}

      {/* AUTHOR */}
      <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
      <div className="max-w-screen-md mx-auto ">
        <SingleAuthorV2 author={data.user} />
      </div>

      {/* COMMENT FORM */}
      <div
        id="comment"
        ref={commentRef}
        className="max-w-screen-md mx-auto pt-5"
      >
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Responses ({commentCount})
        </h3>


        {
        auth.access_token
        ? <Input callback={handleComment} />
        : <h5>
          Please <Link to={`/login?blog/${slug}`}>login</Link> to comment.
        </h5>
      }
        {/* <SingleCommentForm
          onClickSubmit={(id) => console.log(id)}
          onClickCancel={(id) => console.log(id)}
        /> */}
      </div>

      {/* COMMENTS LIST */}
      {/* <div className="max-w-screen-md mx-auto">
        <SingleCommentLists comments={comments} />
      </div> */}
    </div>
  );
};

export default SingleContent;
