import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './_input.scss'


export const AVInput = (props: IProps) => {

  const [textValue, setTextValue] = useState(props.value || '')
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(false)

  const cssClass = `
      av-input
      ${props.size || 'default'}
      ${props.loadingMode && 'loading'}
      ${props.locked
        ? 'locked'
        : focused || textValue
          ? 'focused'
          : ''}
      ${props.className}
    `

  const _onChange = e => {
    const value = e.target.value;
    setTextValue(value)
    if (error) setError(false)

    props.onChange && props.onChange(e)
  }

  return (
    <div class={cssClass} data-theme={props.theme || 'light'}>
      <input
        id={props.id}
        type={props.type && props.type || 'text'}
        value={textValue}
        placeholder={props.label}
        onChange={_onChange}
        onFocus={() => !props.locked && setFocused(true)}
        onBlur={() => !props.locked && setFocused(false)}
      />
      <label htmlFor={props.id} className={error && 'error'}>
        {error || props.label}
      </label>
    </div>
  )
}


interface IProps {
  id: string
  value?: string
  children?: any
  className?: string
  loadingMode?: boolean
  size?: 'small' | 'default' | 'large' 
  theme?: 'light' | 'dark'

  locked?: boolean
  type?: 'text' | 'email' | 'search' | 'tel' | 'number' | 'url' | "password"
  label?: string
  error?: string

  onChange?: any
  [key: string]: any
}