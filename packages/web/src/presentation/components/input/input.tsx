import React, { useRef } from 'react'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
  state: any
  setState: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const isDirty = useRef(false)
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    isDirty.current = true
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

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
        {...props}
        className={props.className ?? 'form-control'}
        onChange={handleChange}
        data-testid={props.name}
      />

      <div data-testid={props.name ? `${props.name}-error` : ''} className='text-danger fs-12 pt-1'>
        {isDirty.current ? error : ''}
      </div>
    </div>
  )
}

export default Input
