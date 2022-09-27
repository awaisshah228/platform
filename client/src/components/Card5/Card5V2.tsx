import React, { FC } from "react";
import { Link } from "react-router-dom";
import { PostDataType } from "../../data/types";
import CardAuthor2 from "../CardAuthor2/CardAuthor2";
import CardAuthor2V2 from "../CardAuthor2/CardAuthor2V2";
import CategoryBadgeList from "../CategoryBadgeList/CategoryBadgeList";
import CategoryBadgeListV2 from "../CategoryBadgeList/CategoryBadgeListV2";

export interface Card5Props {
  className?: string;
  post: any;
}

const Card5V2: FC<Card5Props> = ({
  className = "[ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ",
  post,
}) => {
  const { user, title, href, id, createdAt:date, category, readingTime } = post;
  // console.log(post)
  return (
    <div
      className={`nc-Card5 relative p-5 group ${className}`}
      data-nc-id="Card5"
      data-nc-post-id={id}
    >
      <Link to={href} className="absolute inset-0 rounded-lg"></Link>

      <div className="flex flex-col">
        <CategoryBadgeListV2 category={category} />
        <h2
          className="block text-base font-semibold text-neutral-800 dark:text-neutral-300 my-4"
          title={title}
        >
          <Link to={`/blog${id}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <CardAuthor2V2
          className="relative mt-auto"
          readingTime={readingTime}
          user={user}
          date={date}
          
        />
      </div>
    </div>
  );
};

export default Card5V2;
