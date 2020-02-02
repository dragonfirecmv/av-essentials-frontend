//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import './_galleryPackages.scss'
import { IMedia } from '~/core/redux/gallery'
import { CardPhotoThumbView, CardItemGoodsThumbView, IGoodsItemClickEvent, CardItemPkgThumbView, IPkgItemClickEvent } from '../../cards'
import { IPackageResponse } from '~/core/redux/gallery/packages'
import { IGoodsResponse } from '~/core/redux/gallery/goods'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { SysActions } from '~/core/redux/sys'
import { ShopCartActions } from '~/core/redux/shop-cart'
//#endregion


interface IProps {
  loadingMode?: boolean
  packages?: IPackageResponse[]
  items?: IGoodsResponse[]
  dummy_pic_url?: string
}

export const PanelGalleryPackagesView = (props: IProps) => {

  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  const [currPackages, setCurrPackages] = useState(null as IPackageResponse[])
  const [currItems, setCurrItems] = useState(null as IGoodsResponse[])

  useEffect(() => {
    if (!props.loadingMode) {
      setCurrPackages(props.packages)
      setCurrItems(props.items)
    }

  }, [props.loadingMode])

  const _handleAddGoodsToCart = (e: IGoodsItemClickEvent) => {
    dispatch(ShopCartActions.addToCartDirect_forGoods(e.meta))
    dispatch(SysActions.modal_open('add_to_cart'))
  }

  const _handleAddPkgToCart = (e: IPkgItemClickEvent) => {
    dispatch(ShopCartActions.addToCartDirect_forPkg(e.meta))
    dispatch(SysActions.modal_open('add_to_cart'))
  }


  const _renderContent = () => (
    <div className="area-goods">
      <div className="tx header-title">
        Packages
    </div>
      <div className="area-content">
        {
          !!currPackages && currPackages.length > 0 
          ? (
            currPackages?.map(item_pkg => (
              <div className="card-item-enclosure">
                <CardItemPkgThumbView
                  loadingMode={false}
                  dummy_pic_url={props.dummy_pic_url}
                  item_pkg={item_pkg}
                  onAddToCartClick={_handleAddPkgToCart} />
              </div>
            ))
          )
          : (
            <div className="tx info">No packages available.</div>
          )
        }
      </div>
      <div className="tx header-title">
        Items
      </div>
      <div className="area-content">
        {
          !!currItems && currItems.length > 0
          ? (
            currItems?.map(item_goods => (
              <div className="card-item-enclosure">
                <CardItemGoodsThumbView
                  loadingMode={false}
                  dummy_pic_url={props.dummy_pic_url}
                  item_goods={item_goods}
                  onAddToCartClick={_handleAddGoodsToCart} />
              </div>
            ))
          )
          : (
            <div className="tx info">No items available.</div>
          )
        }
      </div>
    </div>
  )

  const _renderLoading = () => (
    <div></div>
  )

  return (
    <div className="view-panel-gallery-packages">
      {
        props.loadingMode
          ? _renderLoading()
          : _renderContent()
      }
    </div>
  )
}