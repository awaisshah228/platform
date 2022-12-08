import React, { FC, useState } from "react";
import ButtonCircle from "../Button/ButtonCircle";
import rightImg from "../../images/SVG-subcribe2.png";
import NcImage from "../NcImage/NcImage";
import Badge from "../Badge/Badge";
import Input from "../Input/Input";
import { postAPI } from './../../utils/fetchData';
import { toast } from "react-toastify";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {

  const [email, setemail] = useState('')


  const signUp=async(e)=>{
    e.preventDefault();

    try {
      const res= await postAPI('subscribe-news',{email})

      if (res.data.status==400) {
        toast.error("Already Subscribed/Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        toast("You are subscribed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      console.log(res);
    } catch (error) {

      if (error.response && error.response.data.errors) {
        toast.error("Already Subscribed/Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

  }
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Join our newsletter 🎉</h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <ul className="space-y-5 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm" onSubmit={signUp}>
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e)=>{
              setemail(e.target.value)
            }}
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 right-1"
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
