import React, { FC, ReactNode } from "react";
import Heading from "../../components/Heading/Heading";
import { DEMO_POSTS } from "../../data/posts";
import { PostDataType } from "../../data/types";
import ButtonPrimary from "../../components/Button/ButtonPrimary";

import Card11 from "../../components/Card11/Card11";
import Card11V2 from "../../components/Card11/Card11V2";
// OTHER DEMO WILL PASS PROPS
const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 17);

//
export interface SectionGridPostsProps {
  posts?: any;
  className?: string;
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  postCardName?:
    | "card3"
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card10V2"
    | "card11"
    | "card14"
    | "card15Podcast";
}

const SectionGridLatestPosts: FC<SectionGridPostsProps> = ({
  posts,
  postCardName = "card3",
  className = "",
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
}) => {
  const renderCard = (post: PostDataType) => {
    switch (postCardName) {
      case "card11":
        return <Card11V2 key={post.id} post={post} />;
      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <Heading desc={subHeading} isCenter={headingIsCenter}>
        {heading}
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {posts.map((post) => renderCard(post))}
      </div>
      <div className="flex mt-20 justify-center items-center">
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridLatestPosts;
