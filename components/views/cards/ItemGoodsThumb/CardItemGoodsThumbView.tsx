//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { default as numeral } from 'numeral'
import './_cardItemGoodsThumb.scss'
import { IVendorResponse } from '~/core/redux/gallery/vendors'
import { AVSkeleton, AVButton } from '~/components/controls'
import { IGoodsResponse } from '~/core/redux/gallery/goods'
import { CommonPlaceholder } from '~/static/img'
//#endregion


export const CardItemGoodsThumbView = (props: IProps) => {

  const [itemGoods, setItemGoods] = useState(null as IGoodsResponse)

  useEffect(() => {
    if (!props.loadingMode)
      setItemGoods(props.item_goods)

  }, [props.loadingMode])

  const _handleClick = (e) => {
    e.stopPropagation()
    props.onClick && props.onClick({ e, meta: props.item_goods })
  }

  const _handleAddToCartClick = (e) => {
    e.stopPropagation()
    props.onAddToCartClick && props.onAddToCartClick({ e, meta: props.item_goods })
  }

  const _renderPlaceholder = () => (
    <div className="view-card-item-goods-thumb no-select">

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
    <div className="view-card-item-goods-thumb" onClick={_handleClick}>
      <div className="section header">
        <div className="image-enclosure">
          <img src={itemGoods?.media && itemGoods?.media[0]?.url || props.dummy_pic_url || CommonPlaceholder} alt="" />
        </div>
      </div>

      <div className="section bio">
        <div className="tx goods-title">{itemGoods?.main_label}</div>
        <div className="tx goods-price">{numeral(parseInt(itemGoods?.price)).format('$0,0')}</div>
        <div className="tx goods-desc">{itemGoods?.description}</div>
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
  item_goods?: IGoodsResponse
  dummy_pic_url?: string

  onClick?(e: IGoodsItemClickEvent): void
  onAddToCartClick?(e: IGoodsItemClickEvent): void
}

export interface IGoodsItemClickEvent {
  e: MouseEvent,
  meta: IGoodsResponse
}