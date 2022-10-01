import React, {
    FC,
    ImgHTMLAttributes,
    useEffect,
    useRef,
    useState,
  } from "react";
  import checkInViewIntersectionObserver from "../../utils/isInViewPortIntersectionObserver";
  import PlaceIcon from "./PlaceIcon";
  
  export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
  }
  
  const NcImageV2: FC<NcImageProps> = ({
    containerClassName = "",
    alt = "nc-imgs",
    src = "",
    className = "object-cover w-full h-full",
    ...args
  }) => {
    
  
    
  
    const renderLoadingPlaceholder = () => {
      return (
        <div
          className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
        >
          <div className="h-2/4 max-w-[50%]">
           {!src && <PlaceIcon />} 
          </div>
        </div>
      );
    };
  
    return (
      <div
        className={`nc-NcImage ${containerClassName}`}
        data-nc-id="NcImage"
      >
        {src  ? (
          <img src={src} className={className} alt={alt} {...args} />
        ) : (
          renderLoadingPlaceholder()
        )}
      </div>
    );
  };
  
  export default NcImageV2;
  