import { h, Component } from 'preact'
  
import './_skeleton.scss'
  
export const AVSkeleton = (props: IProps) => {
  
  const cssVar = {
    '--background-color': props.backgroundColor || "#eee",
    '--highlight-color': props.highlightColor || "#f5f5f5",
    '--animation-duration': props.duration || "1.2s",
  }

  return (
    <div class="az-skeleton" style={cssVar}>
      &zwnj; 
    </div>
  )
}
  
interface IProps {
  backgroundColor?: string
  highlightColor?: string
  duration?: string
}