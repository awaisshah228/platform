import React, { FC, useEffect, useState } from "react";

import NcImage from "../../components/NcImage/NcImage";
import { Link } from "react-router-dom";
import CardAuthor2V2 from "../../components/CardAuthor2/CardAuthor2V2";
import PostCardMetaV3 from "../../components/PostCardMeta/PostCardMetaV3";
import { Tab } from "@headlessui/react";
import Heading from "../../components/Heading/Heading";
import twFocusClass from "../../utils/twFocusClass";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export interface SectionMagazine6Props {
  tabs: string[];
  posts: any;
  heading?: string;
  className?: string;
}

const SectionMagazine6: FC<SectionMagazine6Props> = ({
  posts,
  tabs,
  heading = "Latest Articles 🎈 ",
  className = "",
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };
  

  const RenderMain = (items) => {
    // const [posts, setposts] = useState(items)
    const {
      thumbnail: featuredImage,
      user: author,
      title,
      date,
      desc,
      href,
      readingTime,
      _id,
    } = items.blogs[0];
    // console.log(posts[0].blogs[0])
    const subPosts = items.blogs.filter((_, i) => i > 0);
    return (
      <main className="relative">
        {/* Image */}
        <div className="aspect-w-9 aspect-h-9 md:aspect-h-5 rounded-3xl lg:rounded-[40px] overflow-hidden">
          <NcImage containerClassName="absolute inset-0" src={featuredImage} />
          <div>
            <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black"></span>
          </div>

          {/* CONTENT */}
          <div className="group dark absolute md:w-1/2 lg:w-2/3 max-w-2xl flex flex-col justify-end p-5 lg:p-14">
            <div className="">
              <h2 className="nc-card-title text-2xl lg:text-3xl xl:text-4xl font-semibold text-white">
                <Link to={`/blog/${_id}`} className="line-clamp-2">
                  {title}
                </Link>
              </h2>
              <span className="hidden lg:block text-base text-neutral-200 mt-5">
                <span className="line-clamp-2">{desc}</span>
              </span>
            </div>

            <div className="mt-7">
              <CardAuthor2V2
                readingTime={readingTime}
                date={date}
                user={author}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:absolute mt-5 md:mt-0 h-96 md:h-auto md:right-3 md:top-3 md:bottom-3 md:w-1/2 lg:w-1/3 p-5 lg:p-8 bg-neutral-100 md:bg-white md:dark:bg-neutral-900 dark:bg-neutral-800 xl:bg-opacity-80 xl:dark:bg-opacity-80 xl:backdrop-filter xl:backdrop-blur-xl rounded-3xl lg:rounded-[34px] overflow-hidden">
          <div className="flow-root h-full w-full overflow-y-auto hiddenScrollbar">
            <div className="-my-5 md:-my-7 divide-y divide-neutral-200 dark:divide-neutral-700">
              {subPosts.map((post) => (
                <div key={post._id} className="block py-5 lg:py-7">
                  <h2 className="nc-card-title text-base font-semibold">
                    <Link to={`/blog/${post._id}`} className="line-clamp-2">
                      {post.title}
                    </Link>
                  </h2>
                  <PostCardMetaV3 className="mt-4" meta={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className={`nc-SectionMagazine6 ${className}`}>
      <Heading>{heading}</Heading>

      <Tab.Group>
        <Tab.List
          className="relative flex w-full overflow-x-auto text-sm md:text-base nc-Nav"
          data-nc-id="Nav"
        >
          {posts.map((category) => (
            <Tab
              key={category._id}
              className={({ selected }) =>
                classNames(
                  // "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  // "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  `${twFocusClass()}`,
                  "px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize block !leading-none font-medium nc-NavItem relative rounded-full",
                  selected
                    ? "bg-secondary-900 text-secondary-50"
                    : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {posts.map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <div>hi</div>
              {RenderMain(posts)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SectionMagazine6;
