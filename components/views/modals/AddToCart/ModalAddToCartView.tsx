//#region Imports
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { default as numeral } from 'numeral'
import { KeyboardDatePicker } from "@material-ui/pickers";
import { getDaysDelta } from '~/core/libs/tools/date-helper'
import { AVButton } from '~/components/controls'
import { AVCounter } from '~/components/controls/'
import './_addToCart.scss'
import { IShopCartState, ShopCartActions } from '~/core/redux/shop-cart';
import { IAppState } from '~/core/redux';
import { IGoodsResponse } from '~/core/redux/gallery/goods';
import { IPackageResponse } from '~/core/redux/gallery/packages';
import { IMedia } from '~/core/redux/gallery';
import { CommonPlaceholder } from '~/static/img';
import { SysActions } from '~/core/redux/sys';
//#endregion


export const ModalAddToCartView = (props: IProps) => {

  const dispatch = useDispatch()
  const shopCartState = useSelector<IAppState, IShopCartState>(state => state.shopcart)

  const [isLoading, setIsLoading] = useState(false)
  const [currGoods, setCurrGoods] = useState(null as IGoodsResponse)
  const [currPkg, setCurrPkg] = useState(null as IPackageResponse)

  const [itemTitle, setItemTitle] = useState('')
  const [itemPic, setItemPic] = useState(null as IMedia)
  const [itemDetails, setItemDetails] = useState('')
  const [itemBasePrice, setItemBasePrice] = useState(0)
  const [itemTotalPrice, setItemTotalPrice] = useState(0)

  const [itemMinOrderPrice, setItemMinOrderPrice] = useState(0)
  const [itemMinOrderDetail, setItemMinOrderDetail] = useState('')
  const [itemQty, setItemQty] = useState(1)

  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [dateDelta, setDateDelta] = useState(1)


  useEffect(() => {

    const dtFrom = (new Date()).toDateString()
    const dtTo = (new Date()).toDateString()

    setDateFrom(dtFrom)
    setDateTo(dtTo)
    setDateDelta(getDaysDelta(dtFrom, dtTo) + 1)
  }, [])

  useEffect(() => {
    const { meta, selected_item, type } = shopCartState.selection

    if (meta.server_status === 'finished') {
      if (type === 'goods') {
        setCurrPkg(null)
        setCurrGoods(selected_item.goods_item)
        setItemTitle(selected_item.goods_item?.main_label)
        setItemDetails(selected_item.goods_item?.description)
        setItemPic(selected_item.goods_item?.media && selected_item.goods_item?.media[0] || null)
        setItemBasePrice(parseInt(selected_item.goods_item?.price))
        setItemMinOrderPrice(parseInt(selected_item.goods_item?.min_order_price) || 0)
        setItemMinOrderDetail(selected_item.goods_item?.min_order_details || '(no minimum order)')
      }
      else if (type === 'package') {
        setCurrGoods(null)
        setCurrPkg(selected_item.pkg_item)
        setItemTitle(selected_item.pkg_item?.package_name)
        setItemDetails(selected_item.pkg_item?.description)
        setItemPic(selected_item.pkg_item?.media && selected_item.pkg_item?.media[0] || null)
        setItemBasePrice(parseInt(selected_item.pkg_item?.price_total))
        setItemMinOrderPrice(parseInt(selected_item.pkg_item?.min_order_price) || 0)
        setItemMinOrderDetail(selected_item.pkg_item?.min_order_details || '(no minimum order)')
      }
    }
  }, [shopCartState.selection])

  useEffect(() => {
    const today = (new Date()).toDateString()

    if (getDaysDelta(dateFrom, dateTo) < 0)
      setDateTo(dateFrom)

    else if (getDaysDelta(today, dateFrom) < 0)
      setDateFrom(today)

    setDateDelta(getDaysDelta(dateFrom, dateTo) + 1)
  }, [dateFrom, dateTo])


  // 🏄🏽‍♂️ Updates the final price by watching several variables.
  useEffect(() => {
    // setItemTotalPrice((itemBasePrice * dateDelta * itemQty) + (itemMinOrderPrice && (itemMinOrderPrice - itemBasePrice)))
    if (itemMinOrderPrice) {
      setItemTotalPrice(itemMinOrderPrice * dateDelta)
    }
    else {
      setItemTotalPrice(itemBasePrice * dateDelta * itemQty)
    }
  }, [itemBasePrice, itemMinOrderPrice, dateDelta, itemQty])

  useEffect(() => {
    const srvStatus = shopCartState.selection.meta.server_status
    const doType = (shopCartState.selection.meta.server_action === 'add-item-to-my-shop-cart')

    if (doType && srvStatus === 'finished') {
      dispatch(SysActions.toast_create({
        title: 'Information',
        content: 'Item added!',
        type: 'success'
      }))

      dispatch(SysActions.modal_close())
    }
    else if (doType && srvStatus === 'error') {
      dispatch(SysActions.toast_create({
        title: 'Oops!',
        content: "Item couldn't be added, please try again.",
        type: 'error'
      }))

    }
  }, [shopCartState.selection])


  const _handleAddToCartClick = e => {
    dispatch(SysActions.toast_create({
      title: 'Information',
      content: 'Adding item to shopping cart...',
      type: 'info'
    }))

    dispatch(SysActions.toast_create({
      title: "Adding to cart...",
      content: `"${itemTitle}" for "${numeral(itemTotalPrice).format('$0,0')}"`,
      type: "info"
    }))

    const shopCartItemPayload = {
      total_price: itemTotalPrice,
      buy_configuration: {
        dateFrom,
        dateTo
      },
      quantity: itemQty,
      additional_notes: ''
    }

    if (currGoods && !currPkg) {
      dispatch(ShopCartActions.addItemToMyShopCart_request({
        item_from_goods: currGoods,
        ...shopCartItemPayload
      }))
    }
    else if (currPkg && !currGoods) {
      dispatch(ShopCartActions.addItemToMyShopCart_request({
        item_from_packages: currPkg,
        ...shopCartItemPayload
      }))
    }
  }

  return (
    <div class="view-add-to-cart">

      <div class="enclosure-cart">

        <div class="enclosing-cart">

          <div class="enclosure item-preview">

            <div class="section-header">
              <div class="tx section-title">ITEM PREVIEW</div>
            </div>

            <div class="enclosing-subject">
              <div class="area-img">
                <img src={itemPic?.url || CommonPlaceholder} />
              </div>

              <div class="area-details">
                <div class="tx item-title">
                  {
                    isLoading ? 'Loading...' : itemTitle
                  }
                </div>
                <div class="tx item-price">
                  {numeral(itemBasePrice).format('$0,0')}
                </div>
                <div class="tx item-notes">
                  {!isLoading && itemDetails || "No details available."}
                </div>
              </div>
            </div>

          </div>

          <div class="enclosure config">

            <div class="section-header">
              <div class="tx section-title">CUSTOMIZATION</div>
              {/* <div class="enclose-action">
                <AVButton size="small" btnStyle="tertiary">RESET</AVButton>
              </div> */}
            </div>

            <div class="enclosing-edit">
              <div class="wrapper">
                <div class="part-config">
                  <div class="tx config-title disabled">
                    {
                      isLoading ? 'Loading...' : itemMinOrderDetail
                    }
                  </div>
                </div>
                <div class="part-price">
                  <div class="tx config-price">
                    {numeral(itemMinOrderPrice).format('$0,0')}
                  </div>
                </div>
              </div>
            </div>

            {
              !itemMinOrderPrice && (
                <div class="enclosing-edit">
                  <div class="wrapper">
                    <div class="part-config">
                      <div class="tx config-title">Quantity</div>
                      <AVCounter
                        minValue={1}
                        maxValue={99}
                        initValue={1}
                        onValueChanged={e => setItemQty(parseInt(e.value))}
                        size="small" />
                    </div>
                    <div class="part-price">
                      <div class="tx config-price">
                        {numeral(itemBasePrice * itemQty).format('$0,0')}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            <div class="enclosing-edit overflow">

              <div class="area-utils">
                <div>
                  <div class="tx config-title">Dari tanggal</div>

                  <KeyboardDatePicker
                    value={dateFrom}
                    onChange={date => setDateFrom(date)}
                    format="DD/MM/YYYY"
                  />
                </div>
                <div>
                  <div class="tx config-title spaced">Hingga</div>

                  <KeyboardDatePicker
                    value={dateTo}
                    onChange={date => setDateTo(date)}
                    format="DD/MM/YYYY"
                  />
                </div>
              </div>

              <div class="wrapper">
                <div class="part-config">
                  <div class="tx date-delta">
                    Number of days: <strong>{dateDelta}</strong>
                  </div>
                </div>
                <div class="part-price">
                  <div class="tx config-price">
                    {numeral(itemBasePrice * dateDelta).format('$0,0')}
                  </div>
                </div>
              </div>

            </div>


          </div>

        </div>
      </div>

      <div class="enclosure-action">
        <div class="enclosing-price-info">
          <div class="area-left">
            final price
          </div>
          <div class="area-right">
            <div class="tx price-total">
              {numeral(itemTotalPrice).format('$0,0')}
            </div>
          </div>
        </div>
        <div>
          <AVButton size="large" onClick={_handleAddToCartClick}>
            ADD TO CART
          </AVButton>
        </div>
      </div>

    </div>
  )
}

interface IProps {
  onSubmitClick?(): any
}