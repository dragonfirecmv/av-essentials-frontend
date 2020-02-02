import { h, Fragment as F } from 'preact'
import { AVContainer } from '../Container/AVContainer'
import { AVSpinner } from '../Spinner/AVSpinner'
import './_banner.scss'


export const AVBanner = (props: IProps) => {

  const cssClass = `
    av-banner
    ${props.size || 'default'}
    ${props.loadingMode && 'loading'}
  `

  return (
    <div class={cssClass} style={{ backgroundColor: props.backColor }}>
      <img class="background" src={props.backgroundSrc} alt="Banner" />
      <div class="background-mask" />
      <div class="enclosure-spinner">
        {
          props.loadingMode
          && <AVSpinner
            width="72px"
            height="72px" />
        }
      </div>
      <div class="enclosure-content">
        <AVContainer sizingType="bootstrap">
          <div class="enclosing">
            <h1>{props.titleText}</h1>
            {props.subText ? <h3>{props.subText}</h3> : ''}
            {props.footnote ? <h6>{props.footnote}</h6> : ''}
          </div>
        </AVContainer>
      </div>
    </div>
  )
}


interface IProps {
  loadingMode?: boolean
  titleText?: string
  subText?: string
  footnote?: string
  backgroundSrc?: string
  backColor?: string
  children?: any
  size?: 'small' | 'default'
}