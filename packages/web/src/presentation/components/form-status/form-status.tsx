import React from 'react'

type Props = {
  error?: string
  success?: string
}

const FormStatus: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.error && (
        <div className='badge badge-pill badge-danger border p-2 my-2 w-100'>{props.error}</div>
      )}
      {props.success && (
        <div className='badge badge-pill badge-success border p-2 my-2 w-100'>{props.success}</div>
      )}
    </>
  )
}

export default FormStatus
