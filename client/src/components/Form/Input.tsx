import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input (props) {
  const { label, name,className, ...rest } = props
  return (
    <div className='form-control mt-2'>
      <label htmlFor={name} className='text-neutral-800 dark:text-neutral-200'>{label}</label>
      <Field id={name} name={name} className={` block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 bg-white dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 rounded-full h-11 px-4 py-3 text-sm font-normal  ${className}`} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Input
