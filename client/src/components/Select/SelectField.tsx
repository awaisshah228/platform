import { FieldProps } from 'formik'
import React from 'react'
import Select, { Options} from 'react-select'

export const SelectField = ({
  options,
  field,
  form,
  props
}) => (
  <Select
    options={options}
    {...field}
    {...props}
    // value={options ? options.find(option => option.value === field.value) : ''}
    // onChange={(option: Options) => form.setFieldValue(field.name, option.value)}
    // onBlur={field.onBlur}
  />
)