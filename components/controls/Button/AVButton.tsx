import { h, Fragment as F } from 'preact'
import { AVSpinner } from '../Spinner/AVSpinner'
import './_button.scss'


export const AVButton =
  ({ children,
    className,
    loadingMode,
    size,
    btnStyle,
    shape,
    ...rest }: IProps) => {

    const cssClass = `
      av-button noselect
      ${size || 'default'}
      ${btnStyle || 'primary'}
      ${loadingMode && 'loading'}
      ${shape || 'shape-rounded'}
      ${className}
    `.replace(/\s+/g,' ').trim();

    return (
      <div class={cssClass} {...rest}>
        <div class="enclosure-loader">
          <div class="enclosing">
            {
              loadingMode
              && <AVSpinner
                width="20px"
                height="20px"
                backgroundColor={btnStyle !== 'primary' && 'var(--color-loading-background)'}
                prominentColor={btnStyle !== 'primary' && 'var(--color-loading-prominent)'} />

            }
          </div>
        </div>
        <div class="enclosure-content">
          {children}
        </div>
      </div>
    )
  }

interface IProps{
  children?: any
  className?: string
  loadingMode?: boolean
  size?: 'small' | 'default' | 'large' | 'conform'
  btnStyle?: 'primary' | 'secondary' | 'tertiary' | 'borderless'
  shape?: 'shape-rounded' | 'shape-rectangle' | 'shape-pill'
  [key: string]: any
}