//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import './_browse.scss'
import { AVBanner, AVContainer } from '~/components/controls'
import { CommonBackground } from '~/static/img'
import { CardVendorThumbView } from '~/components/views/cards'
import { GalleryVendorActions, IVendorResponse } from '~/core/redux/gallery/vendors'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
//#endregion


export const BrowsePage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  const [vendorListing, setVendorListing] = useState(null as IVendorResponse[])
  const [isLoading, setIsLoading] = useState(true)

  const dummyCategoryLogo = 'https://artz_main_bucket.storage.googleapis.com/1565602070509_58fe3cef-1c77-46ab-a4f0-8865c6229670_merchandise_clem-onojeghuo_unsplash.jpeg'

  useEffect(() => {
    dispatch(GalleryVendorActions.listAll_request())
  }, [])

  useEffect(() => {
    const list_vendor = galleryState.vendors.listing

    setIsLoading(list_vendor.meta.server_status !== 'finished')

    if (list_vendor.meta.server_status === 'finished')
      setVendorListing(list_vendor.vendors)

  }, [galleryState.vendors.listing])


  const _renderVendorPlaceholder = () => (
    <F>
      {[1,2,3,4,5,6,7,8].map(() => (
        <div className="card-vendor-enclosing">
          <CardVendorThumbView
            loadingMode={true} />
        </div>
      ))}
    </F>
  )

 
  return (
    <div class="page-browse">
      <div className="area-header">
        <AVContainer sizingType="TKPDA">
          <div class="header-enclosure">

            <div className="area-text">
              <div className="tx header-tag">
                SHOWING ALL
              </div>
              <div className="tx header-main">
                Perlengkapan
              </div>
            </div>

            <div className="area-category-logo">
              <div className="image-enclosing">
                <img src={dummyCategoryLogo} alt="" />
              </div>
            </div>

          </div>
        </AVContainer>
      </div>

      <div className="area-content">
        <AVContainer sizingType="TKPDA">
          <div class="content-enclosure">

            {
              isLoading
                ? (
                  _renderVendorPlaceholder()
                )
                : (
                  vendorListing?.map(vendor => (
                    <div className="card-vendor-enclosing">
                      <CardVendorThumbView
                        onClick={e => history.push(`/v?slug=${e.meta.slug}`)}
                        vendor_data={vendor} />
                    </div>
                  ))
                )
            }



          </div>
        </AVContainer>
      </div>
    </div>
  )
}