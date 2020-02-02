//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import './_cardPhotoThumb.scss'
import { AVSkeleton } from '~/components/controls'
import { IMedia } from '~/core/redux/gallery'
//#endregion


export const CardPhotoThumbView = (props: IProps) => {

  const [photo, setPhoto] = useState(null as IMedia)

  useEffect(() => {
    if (!props.loadingMode)
      setPhoto(props.photo)

  }, [props.loadingMode, props.photo])

  const _handleClick = (e) => {
    props.onClick && props.onClick({ e, meta: props.photo })
  }

  const _renderPlaceholder = () => (
    <div className="view-card-photo-thumb no-select">
      <div className="image-enclosure">
        <AVSkeleton />
      </div>
    </div>
  )

  const _renderContent = () => (
    <div className="view-card-photo-thumb" onClick={_handleClick}>
      <div className="image-enclosure">
        <img src={photo?.url || ''} alt="" />
      </div>
    </div>
  )

  return (
    props.loadingMode
      ? _renderPlaceholder()
      : _renderContent()
  )
}

interface IProps {
  loadingMode?: boolean
  photo?: IMedia

  onClick?(e: IClickEvent): void
}

interface IClickEvent {
  e: MouseEvent,
  meta: IMedia
}