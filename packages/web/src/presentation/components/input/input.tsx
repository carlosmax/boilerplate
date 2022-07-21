import React, { useContext } from 'react'
import FormContext from '@/presentation/contexts/form/form-context'

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
  const { state, setState } = useContext(FormContext)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.id]: event.target.value
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
        data-testid={props.id}
        id={props.id}
        type={props.type}
        className={props.className ?? 'form-control'}
        value={props.value}
        placeholder={props.placeholder}
        onChange={handleChange}
      />

      <div data-testid={props.id ? `${props.id}-error` : ''} className='text-danger fs-12'>
        {props.errorMessage}
      </div>
    </div>
  )
}

export default Input
