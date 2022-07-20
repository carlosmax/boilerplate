import React from 'react'

type Props = {
  id?: string
  label?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const CustomCheckbox: React.FC<Props> = (props: Props) => {
  return (
    <div className='form-group mb-3'>
      <div className='custom-control custom-checkbox ml-1'>
        <input
          type='checkbox'
          className='form-check-input'
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        />
        <label className='form-check-label' htmlFor={props.id}>
          {props.label}
        </label>
      </div>
    </div>
  )
}

export default CustomCheckbox
