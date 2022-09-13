import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

// function PasswordComponent(){
//   const [typePass, setTypePass] = useState(false);

//   return(<div>
//   <input type="password" className='block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full h-11 px-4 py-3 text-sm font-normal' />
//   {/* <small onClick={() => setTypePass(!typePass)} className=' flex mr-3 text-neutral-800 dark:text-neutral-200'>
//               {typePass ? <EyeOffIcon className="h-6 w-6 "/> : <EyeIcon className="h-6 w-6"/>}
//             </small> */}
//   </div>)

// }

function Password(props) {
  const { label, name, className, ...rest } = props;
  const [typePass, setTypePass] = useState(false);

  return (
    <div className="form-control mt-2 flex flex-col">
      <label htmlFor={name} className="">
        <span className="text-neutral-800 dark:text-neutral-200">{label}</span>
      </label>
      <Field
        id={name}
        name={name}
        className={`block w-full border-neutral-200 bg-transparent focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full h-11 px-4 py-3 text-sm font-normal${className}`}
        {...rest}
      />
      <small
        onClick={() => setTypePass(!typePass)}
        className=" w-fit  text-neutral-800 dark:text-neutral-200 self-end -mt-8 mr-3"
      >
        {typePass ? (
          <EyeOffIcon className="h-6 w-6 " />
        ) : (
          <EyeIcon className="h-6 w-6" />
        )}
      </small>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Password;
