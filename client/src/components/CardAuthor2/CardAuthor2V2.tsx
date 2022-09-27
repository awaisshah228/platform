import React, { FC } from "react";
import { PostDataType } from "../../data/types";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

export interface CardAuthor2Props
  extends Pick<PostDataType, "date"> {
  className?: string;
  readingTime?: PostDataType["readingTime"];
  hoverReadingTime?: boolean;
  user: any
}

const CardAuthor2V2: FC<CardAuthor2Props> = ({
  className = "",
  user,
  readingTime,
  date,
  hoverReadingTime = true,
}) => {
  const { name, href = "/", avatar } = user;
 let date2= new Date(date)
  console.log(user)
  return (
    <Link
      to={href}
      className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
      data-nc-id="CardAuthor2"
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 mr-3"
        radius="rounded-full"
        imgUrl={avatar}
        userName={name}
      />
      <div>
        <h2
          className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
        >
          {name}
        </h2>
        <span
          className={`flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400`}
        >
          <span>{date2.toLocaleDateString("en-US", { dateStyle: "long" })}</span>
          {readingTime && (
            <>
              <span
                className={`hidden lg:inline mx-1 transition-opacity ${
                  hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
                }`}
              >
                ·
              </span>
              <span
                className={`hidden lg:inline transition-opacity ${
                  hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
                }`}
              >
                {readingTime} min read
              </span>
            </>
          )}
        </span>
      </div>
    </Link>
  );
};

export default CardAuthor2V2;
