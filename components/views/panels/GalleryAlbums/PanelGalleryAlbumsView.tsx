//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import './_galleryAlbums.scss'
import { IMedia } from '~/core/redux/gallery'
import { CardPhotoThumbView } from '../../cards'
//#endregion


interface IProps {
  loadingMode?: boolean
  medias?: IMedia[]
}

export const PanelGalleryAlbumsView = (props: IProps) => {

  const [currMedia, setCurrMedia] = useState(null as IMedia[])

  useEffect(() => {
    if (!props.loadingMode)
      setCurrMedia(props.medias)
  }, [props.loadingMode])

  const _renderContent = () => (
    currMedia?.map(photox => (
      <div className="card-photo-enclosure">
        <CardPhotoThumbView loadingMode={false} photo={photox}/>
      </div>
    ))
  )

  const _renderLoading = () => (
    [1,2,3,4,5].map(() => (
      <div className="card-photo-enclosure">
        <CardPhotoThumbView loadingMode={true}/>
      </div>
    ))
  )

  return (
    <div className="view-panel-gallery-albums">
      {
        props.loadingMode
        ? _renderLoading()
        : _renderContent()
      }
    </div>
  )
}