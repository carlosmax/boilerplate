import React from 'react'

type Props = {
  error?: string
  success?: string
}

const FormStatus: React.FC<Props> = (props: Props) => {
  return (
    <div data-testid='status-wrap'>
      {props.error && (
        <div
          data-testid='form-error'
          className='badge badge-pill badge-danger border p-2 my-2 w-100'
        >
          {props.error}
        </div>
      )}
      {props.success && (
        <div
          data-testid='form-success'
          className='badge badge-pill badge-success border p-2 my-2 w-100'
        >
          {props.success}
        </div>
      )}
    </div>
  )
}

export default FormStatus
