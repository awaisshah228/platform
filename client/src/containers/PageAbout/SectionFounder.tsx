import Heading from "../../components/Heading/Heading";
import NcImage from "../../components/NcImage/NcImage";
import React from "react";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Muhammad Awais Shah`,
    job: "Co-founder and Chief Executive",
    avatar:
      "data:image/jpeg;base64,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",
  },
  {
    id: "4",
    name: `Danien Jame`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: `Orla Dwyer`,
    job: "Co-founder, Chairman",
    avatar:
      "https://images.unsplash.com/photo-1560365163-3e8d64e762ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: `Dara Frazier`,
    job: "Co-Founder, Chief Strategy Officer",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="We’re impartial and independent, and every day we create distinctive,
          world-class programmes and content"
      >
        ⛱ Founder
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={item.avatar}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
