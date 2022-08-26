import React, { useRef } from 'react'
import { FormFeedback, Input } from 'reactstrap'
import { InputType } from 'reactstrap/types/lib/Input'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type: InputType
  label: string
  state: any
  setState: any
}

const CustomInput: React.FC<Props> = ({ state, setState, ...props }: Props) => {
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
    <>
      <Input
        data-testid={props.name}
        name={props.name}
        value={props.value}
        type={props.type}
        className={`form-control ${props.className}`}
        placeholder={props.placeholder}
        onChange={handleChange}
        invalid={!!(isDirty.current && error)}
      />
      {isDirty.current && error ? (
        <FormFeedback data-testid={props.name ? `${props.name}-error` : ''} type='invalid'>
          {error}
        </FormFeedback>
      ) : null}
    </>
  )
}

export default CustomInput
