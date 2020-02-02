//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import './_cardVendorThumb.scss'
import { IVendorResponse } from '~/core/redux/gallery/vendors'
import { AVSkeleton } from '~/components/controls'
//#endregion


export const CardVendorThumbView = (props: IProps) => {

  const [vendor, setVendor] = useState(null as IVendorResponse)

  useEffect(() => {
    if (!props.loadingMode)
      setVendor(props.vendor_data)

  }, [props.loadingMode, props.vendor_data])

  const _handleClick = (e) => {
    props.onClick && props.onClick({ e, meta: props.vendor_data })
  }

  const _renderPlaceholder = () => (
    <div className="view-card-vendor-thumb no-select">

      <div className="section header">
        <div className="image-enclosure">
          <AVSkeleton />
        </div>

      </div>

      <div className="section bio">
        <div className="tx vendor-title">
          <AVSkeleton />
        </div>
        <div className="tx vendor-address" style={{ paddingTop: '6px' }}>
          <AVSkeleton />
        </div>
      </div>

    </div>
  )

  const _renderContent = () => (
    <div className="view-card-vendor-thumb" onClick={_handleClick}>
      <div className="section header">
        <div className="image-enclosure">
          <img src={vendor?.vendor_logo_url?.url || vendor?.media && vendor?.media[0]?.url} alt="" />
        </div>

        {/* <div className="image-logo-area">
          <div className="image-logo-enclose">
            <img src={vendor?.vendor_logo_url?.url || vendor?.media && vendor?.media[0]?.url} alt="" />
          </div>
        </div> */}
      </div>

      <div className="section bio">
        <div className="tx vendor-title">{vendor?.vendor_name}</div>
        <div className="tx vendor-address">{vendor?.vendor_addess}</div>
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
  vendor_data?: IVendorResponse

  onClick?(e: IClickEvent): void
}

interface IClickEvent {
  e: MouseEvent,
  meta: IVendorResponse
}