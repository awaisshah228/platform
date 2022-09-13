import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import ButtonPrimary from '../Button/ButtonPrimary';

function LoginForm () {
  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string().required('Required')
  })

  const onSubmit = values => {
    console.log('Form data', values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
          <Form className='grid grid-cols-1 gap-6'>
            <FormikControl
              control='input'
              // control='chakraInput'
              type='email'
              label='Email'
              name='email'
              placeholder="example@example.com"
              className="mt-1"
              
            />
            <FormikControl
              control='input'
              type='password'
              label='Password'
              name='password'
            />
            <ButtonPrimary type='submit' disabled={!formik.isValid}>Continue</ButtonPrimary>
          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginForm
