//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { default as numeral } from 'numeral'
import './_cardItemPkgThumb.scss'
import { IVendorResponse } from '~/core/redux/gallery/vendors'
import { AVSkeleton, AVButton } from '~/components/controls'
import { IGoodsResponse } from '~/core/redux/gallery/goods'
import { CommonPlaceholder } from '~/static/img'
import { IPackageResponse } from '~/core/redux/gallery/packages'
//#endregion


export const CardItemPkgThumbView = (props: IProps) => {

  const [itemPkg, setItemPkg] = useState(null as IPackageResponse)

  useEffect(() => {
    if (!props.loadingMode)
    setItemPkg(props.item_pkg)

  }, [props.loadingMode])

  const _handleClick = (e) => {
    e.stopPropagation()
    props.onClick && props.onClick({ e, meta: props.item_pkg })
  }

  const _handleAddToCartClick = (e) => {
    e.stopPropagation()
    props.onAddToCartClick && props.onAddToCartClick({ e, meta: props.item_pkg })
  }

  const _renderPlaceholder = () => (
    <div className="view-card-item-pkg-thumb no-select">

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
    <div className="view-card-item-pkg-thumb" onClick={_handleClick}>
      <div className="section header">
        <div className="image-enclosure">
          <img src={itemPkg?.media && itemPkg?.media[0]?.url || props.dummy_pic_url || CommonPlaceholder} alt="" />
        </div>
      </div>

      <div className="section bio">
        <div className="tx pkg-title">{itemPkg?.package_name}</div>
        <div className="tx pkg-price">{numeral(parseInt(itemPkg?.price_total)).format('$0,0')}</div>
        <div className="tx pkg-desc">{itemPkg?.description}</div>
      </div>

      <div className="section action">
        <AVButton btnStyle="tertiary" size="large" onClick={_handleAddToCartClick}>
          Add
        </AVButton>
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
  item_pkg?: IPackageResponse
  dummy_pic_url?: string

  onClick?(e: IPkgItemClickEvent): void
  onAddToCartClick?(e: IPkgItemClickEvent): void
}

export interface IPkgItemClickEvent {
  e: MouseEvent,
  meta: IPackageResponse
}