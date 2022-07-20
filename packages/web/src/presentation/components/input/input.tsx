import React from 'react'

type Props = {
  id?: string
  type: string
  label?: string
  className?: string
  value?: string
  placeholder?: string
  errorMessage?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className='form-group mb-3'>
      {props.label ? (
        <label className='mb-1' htmlFor={props.id}>
          <strong>{props.label}</strong>
        </label>
      ) : (
        <></>
      )}
      <input
        id={props.id}
        type={props.type}
        className={props.className ?? 'form-control'}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      {props.errorMessage && <div className='text-danger fs-12'>{props.errorMessage}</div>}
    </div>
  )
}

export default Input
