import { PostDataType } from "../../data/types";
import React, { FC } from "react";
import Badge from "../Badge/Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories?: PostDataType["categories"];
  category:any
}

const CategoryBadgeListV2: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  category,
}) => {
  
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >

       <Badge
          className={itemClass}
          key={category.id}
          name={category.name}
          href={`/category${category.id}`}
        //   color={item.color as any}
        />
      {/* {categories.map((item, index) => ( */}
       
      {/* ))} */}
    </div>
  );
};

export default CategoryBadgeListV2;
