//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import './_vendorOverview.scss'
import { AVBanner, AVContainer, AVChip, AVSkeleton, AVToggleButton } from '~/components/controls'
import { CommonBackground } from '~/static/img'
import { CardVendorThumbView } from '~/components/views/cards'
import { GalleryVendorActions, IVendorResponse } from '~/core/redux/gallery/vendors'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { PanelGalleryAlbumsView } from '~/components/views/panels'
import { PanelGalleryPackagesView } from '~/components/views/panels/GalleryPackages/PanelGalleryPackagesView'
//#endregion


export const VendorOverviewPage = () => {

  const VImgConst = `https://artz_main_bucket.storage.googleapis.com/1565580791783_58fe3cef-1c77-46ab-a4f0-8865c6229670_ev-equipment_markus-spiske_unsplash.jpeg`

  const history = useHistory()
  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  const query = new URLSearchParams(history.location.search)

  const [isLoading, setIsLoading] = useState(false)
  const [tabs, setTabs] = useState('albums' as 'albums' | 'packages' | 'info')
  const [currVendor, setCurrVendor] = useState(null as IVendorResponse)

  useEffect(() => {
    const slug = query.get('slug')

    if (!slug)
      history.replace('/browse')

    else {
      dispatch(GalleryVendorActions.getFromSlug_request({ slug }))
    }
  }, [])

  useEffect(() => {
    const seldVendorS = galleryState.vendors.selected
    setIsLoading(seldVendorS.meta.server_status === 'loading')

    if (seldVendorS.meta.server_status === 'finished')
      setCurrVendor(seldVendorS.vendor)

  }, [galleryState.vendors.selected])

  return (
    <div className="page-vendor-overview">

      <div className="area-header">
        <AVContainer sizingType="TKPDA">
          <div className="header-enclosure">

            <div className="header-area img">
              <div className="img-enclosure">
                {
                  isLoading
                    ? <AVSkeleton />
                    : <img src={currVendor?.vendor_logo_url?.url || VImgConst} alt="Vendor logo" />
                }
              </div>
            </div>

            <div className="header-area info">
              <div className="area-info vendor-name">
                <div className="tx header-vendor-name">
                  {isLoading ? 'Loading...' : currVendor?.vendor_name}
                </div>
              </div>
              <div className="area-info vendor-address">
                <div className="tx header-vendor-address">
                  {!isLoading && currVendor?.vendor_addess}
                </div>
              </div>
              <div className="area-info categories">
                {
                  !isLoading && currVendor?.vendor_categories?.map(vendor_cat => (
                    <AVChip chipStyle="wireframe" text={vendor_cat?.name} />
                  ))
                }

              </div>
            </div>

          </div>
        </AVContainer>
      </div>

      <div className="area-content">
        <AVContainer sizingType="TKPDA">
          <div className="content-enclosure">

            <div className="panel-tabs">
              <div className="tab-enclosure">
                <AVToggleButton checked={tabs === 'albums'} onClick={() => setTabs('albums')}>
                  Album
                </AVToggleButton>
              </div>
              <div className="tab-enclosure">
                <AVToggleButton checked={tabs === 'packages'} onClick={() => setTabs('packages')}>
                  Harga + Paket
                </AVToggleButton>
              </div>
              <div className="tab-enclosure">
                <AVToggleButton checked={tabs === 'info'} onClick={() => setTabs('info')}>
                  Info
                </AVToggleButton>
              </div>
            </div>

            <div className="panel-container">

              <div className={`enclosure gallery ${tabs !== 'albums' ? 'hide' : ''}`}>
                <PanelGalleryAlbumsView
                  loadingMode={isLoading}
                  medias={currVendor?.media || null} />
              </div>
              <div className={`enclosure packages ${tabs !== 'packages' ? 'hide' : ''}`}>
                <PanelGalleryPackagesView
                  loadingMode={isLoading}
                  items={currVendor?.goods_items || null}
                  dummy_pic_url={currVendor?.vendor_logo_url?.url}
                  packages={currVendor?.packages_to_sell || null} />
              </div>

            </div>

          </div>
        </AVContainer>
      </div>

    </div>
  )
}