//#region imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { default as numeral } from 'numeral'
import { AVContainer, AVButton, AVInput, AVSkeleton } from '~/components/controls'
import './_cart.scss'
import { IShopCartState, ShopCartActions, IShopCartResponse } from '~/core/redux/shop-cart';
import { IAppState } from '~/core/redux';
import { CommonPlaceholder } from '~/static/img'
import { SysActions } from '~/core/redux/sys'
//#endregion


export const CartPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const shopCartState = useSelector<IAppState, IShopCartState>(state => state.shopcart)

  const [isLoading, setIsLoading] = useState(true)
  const [myCart, setMyCart] = useState(null as IShopCartResponse)
  const [totalPrice, setTotalPrice] = useState(0)

  const [infoEventName, setInfoEventName] = useState('')
  const [infoEventPJName, setInfoEventPJName] = useState('')
  const [infoDateFrom, setInfoEventDateFrom] = useState('')
  const [infoEventDateTo, setInfoEventDateTo] = useState('')
  const [infoEventContact, setInfoEventContact] = useState('')
  const [infoEventDetails, setInfoEventDetails] = useState('')

  useEffect(() => {
    dispatch(ShopCartActions.getMyCurrentShopCart_request())
  }, [])

  useEffect(() => {

    const { meta, cart_list } = shopCartState.my_cart
    const type = meta.server_action


    if (type === 'get-my-current-shop-cart') {
      setIsLoading(meta.server_status === 'loading')

      if (meta.server_status === 'finished') {
        setMyCart(cart_list)
  
        let price = 0
  
        cart_list.cart_items?.forEach(item => {
          price += parseInt(item.total_price.toString())
        })
  
        setTotalPrice(price)
      }
    }
    
    else if (type === 'edit-my-current-cart-info-shop-cart') {
      if (meta.server_status === 'loading') {
        dispatch(SysActions.toast_create({
          title: 'Your cart',
          content: 'Registering your event details...',
          type: 'info'
        }))
      }
      else if (meta.server_status === 'finished') {
        dispatch(SysActions.toast_create({
          title: 'Your cart',
          content: 'Event registered.',
          type: 'success'
        }))
        dispatch(ShopCartActions.checkoutMyShopCart_request())
      }
      else if (meta.server_status === 'error') {
        dispatch(SysActions.toast_create({
          title: 'Your cart',
          content: 'Something wrong when registering event, please try again.',
          type: 'error'
        }))
      }
    }

    else if (type === 'checkout-my-current-shop-cart') {
      if (meta.server_status === 'loading') {
        dispatch(SysActions.toast_create({
          title: 'Your cart',
          content: 'Checking out...',
          type: 'info'
        }))
      }
      else if (meta.server_status === 'finished') {
        dispatch(SysActions.toast_create({
          title: 'Your cart',
          content: 'Item checked out. Thank you!',
          type: 'success'
        }))
        history.replace('/')
      }
      else if (meta.server_status === 'error') {
        dispatch(SysActions.toast_create({
          title: 'Your cart',
          content: 'Something wrong when checking out, please try again.',
          type: 'error'
        }))
      }

    }


  }, [shopCartState.my_cart])


  const _renderActualCart = () => (
    <div class="enclosure-main">

      <div class="section title">
        <div class="tx section-title">
          Your cart
        </div>
      </div>

      <div class="section items">

        <div class="table header">
          <div class="column img"> </div>
          <div class="column details">
            <div class="tx table-head">ITEM DETAILS</div>
          </div>
          <div class="column config">
            <div class="tx table-head">CONFIG</div>
          </div>
          <div class="column price right">
            <div class="tx table-head">PRICE</div>

          </div>

        </div>

        {
          myCart?.cart_items?.map(cart_item => {

            const type =
              (!cart_item.item_from_goods && cart_item.item_from_packages) && 'goods'
              || (cart_item.item_from_goods && !cart_item.item_from_packages) && 'pkg'
              || null

            if (!type) return
            else
              return (
                <div class="table content">
                  <div class="column img">
                    <div class="enclosing-img">
                      <img src={CommonPlaceholder} />
                    </div>
                  </div>
                  <div class="column details">
                    <div class="tx item-title">
                      {cart_item?.item_from_goods
                        && cart_item?.item_from_goods?.main_label
                        || cart_item?.item_from_packages?.package_name}
                    </div>
                    <div class="tx item-details">
                      {
                        cart_item?.additional_notes
                      }
                    </div>
                  </div>
                  <div class="column config">
                    <div class="tx item-config">QTY: {cart_item?.quantity || '1'}</div>
                  </div>
                  <div class="column price right">
                    <div class="tx item-price">{numeral(cart_item?.total_price).format('$0,0')}</div>
                  </div>
                </div>
              )
          })
        }

        <div class="enclosure-final">
          <div></div>
          <div class="enclosing-content">
            <div class="cart price-details">

              <div>
                <div class="tx price-total-label">Price Total</div>
                <div class="tx price-item-details">(5 items)</div>
              </div>
              <div>
                <div class="tx total-price">{numeral(totalPrice).format('$0,0')}</div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  )

  const _renderPlaceholderCart = () => (
    <div class="enclosure-main">

      <div class="section title">
        <div class="tx section-title">
          Your cart
        </div>
      </div>

      <div class="section items">

        {/* <div class="table header">
          <div class="column img"> </div>
          <div class="column details">
            <div class="tx table-head">ITEM DETAILS</div>
          </div>
          <div class="column config">
            <div class="tx table-head">CONFIG</div>
          </div>
          <div class="column price right">
            <div class="tx table-head">PRICE</div>

          </div>

        </div> */}

        {
          [1, 2, 3, 4, 5].map(() => (
            <div className="enclosure-placeholder">
              <AVSkeleton />
            </div>
          ))
        }


      </div>

    </div>
  )

  const _onCheckoutClick = () => {
    dispatch(ShopCartActions.editMyCurrentCartInfoShopCart_request({
      event_name: infoEventName,
      event_pjname: infoEventPJName,
      event_datefrom: infoDateFrom,
      event_dateto: infoEventDateTo,
      event_contact: infoEventContact,
      event_details: infoEventDetails
    }))
  }

  return (
    <div class="page-cart">

      <div className="section-top cart">
        <AVContainer className="container" sizingType="TKPDA">
          {
            !isLoading && _renderActualCart() || _renderPlaceholderCart()
          }
        </AVContainer>
      </div>

      {
        !isLoading && myCart && (

          <div className="section-top event-details">

            <AVContainer className="container" sizingType="TKPDA">
              <div class="enclosure-main">

                <div class="section title">
                  <div class="tx section-title">
                    Rincian event
                  </div>
                  <div className="tx section-details">
                    Ceritakan event impian kamu agar kami dapat membantu mewujudkannya!
                  </div>
                </div>

                <div class="section items">

                  <div className="split-2-col">
                    <div className="child">
                      <AVInput
                        id="event-name"
                        label="Nama acara"
                        onChange={e => setInfoEventName(e.target.value)}>
                      </AVInput>
                    </div>
                    <div className="child">
                      <AVInput
                        id="pj-name"
                        label="Nama penanggungjawab yang dapat dihubungi"
                        onChange={e => setInfoEventPJName(e.target.value)}>
                      </AVInput>
                    </div>
                  </div>

                  <div className="split-2-col">
                    <div className="split-2-col">
                      <div className="child">
                        <AVInput
                          id="event-date-from"
                          label="Tanggal acara - mulai dari"
                          onChange={e => setInfoEventDateFrom(e.target.value)}>
                        </AVInput>
                      </div>
                      <div className="child">
                        <AVInput
                          id="event-date-to"
                          label="Tanggal acara - hingga"
                          onChange={e => setInfoEventDateTo(e.target.value)}>
                        </AVInput>
                      </div>
                    </div>
                    <div className="child">
                      <AVInput
                        id="pj-contact"
                        label="Kontak penanggungjawab"
                        onChange={e => setInfoEventContact(e.target.value)}>
                      </AVInput>
                    </div>
                  </div>

                  <div className="child">
                    <AVInput
                      id="event-desc"
                      label="Deskripsikan acara anda..."
                      onChange={e => setInfoEventDetails(e.target.value)}>
                    </AVInput>
                  </div>

                  <div className="tx cart-agreement">
                    Dengan menekan tombol Checkout, anda setuju dan tunduk pada syarat dan ketentuan kami.
                  </div>

                  <div class="enclosure-final">
                    <div></div>
                    <div class="enclosing-content">
                      <div class="cart price-details">
                      </div>
                      <div class="cart actions">
                        <AVButton size="large" onClick={_onCheckoutClick}>
                          Checkout
                        </AVButton>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </AVContainer>
          </div>

        )
      }

    </div>
  )
}