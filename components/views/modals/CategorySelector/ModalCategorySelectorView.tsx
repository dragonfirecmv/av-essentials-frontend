//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';

import './_categorySelector.scss'
import { AVButton, AVToggleButton, AVSkeleton } from '~/components/controls';
import { IAppState } from '~/core/redux';
import { SysActions } from '~/core/redux/sys';
import { GalleryCategoryActions, ICategoryResponse } from '~/core/redux/gallery/categories';
import { IGalleryState } from '~/core/redux/gallery';
import { CommonPlaceholder } from '~/static/img';
import { CardCategoryView } from '../../cards';

//#endregion


export const ModalCategorySelectorView = () => {

  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  const [categoryHeadList, setCategoryHeadList] = useState([] as ICategoryResponse[])
  const [currCategoryHeadIdx, setCurrCategoryHeadIdx] = useState(0)
  const [currSubCategory, setCurrSubCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // initialize component
  useEffect(() => {
    dispatch(GalleryCategoryActions.listAll_request())
  }, [])

  useEffect(() => {

    const categoryListing = galleryState.categories.listing

    setIsLoading(categoryListing.meta.server_status !== 'finished')

    if (categoryListing.meta.server_status === 'finished')
      setCategoryHeadList(categoryListing.categories)


  }, [galleryState.categories.listing])


  const _onCloseClick = e => {
    dispatch(SysActions.modal_close())
  }

  const _onHeadCategoryItemClick = e => {
    setCurrSubCategory(null)
    setCurrCategoryHeadIdx(e.headIdx)
  }

  const _onCategoryItemClick = ev => {
    console.log(ev)
    setCurrSubCategory(null)

    if (ev.e.meta?.children?.length < 1) {
      window.location.href = `/b/${categoryHeadList[currCategoryHeadIdx]?.slug}/${ev.e.meta?.slug}`
    }

    else {
      if (ev.pos === 'root')
        window.location.href = `/b/${categoryHeadList[currCategoryHeadIdx]?.slug}`

      if (ev.pos === 'main')
        window.location.href = `/b/${categoryHeadList[currCategoryHeadIdx]?.slug}/${ev.e.meta?.slug}`

      if (ev.pos === 'sub')
        window.location.href = `/b/${categoryHeadList[currCategoryHeadIdx]?.slug}/${ev.e.meta?.slug}/${ev.e.meta?.children[ev.subIdx]?.slug}`

      else
        setCurrSubCategory(ev.e.meta?.name)
    }
  }


  const _renderLeftPane = () => (
    <div className="left-pane">
      {
        categoryHeadList?.map((headCategory, headIdx) => (
          <div
            className={`category-head-btn-enclosing ${currCategoryHeadIdx === headIdx ? 'active' : ''}`}
            onClick={() => _onHeadCategoryItemClick({ headIdx })}>
            <div className="area-img">
              <img src={headCategory?.media && headCategory?.media[0]?.url || CommonPlaceholder} />
            </div>
            <div className="area-label">
              <div className="tx category-head-label">
                {headCategory?.name}
              </div>
            </div>
          </div>
        ))
      }
      <div
        className={`category-head-btn-enclosing`}
        onClick={() => window.location.href = '/browse'}>
        <div className="area-img">
          {/* <img src={CommonPlaceholder} /> */}
        </div>
        <div className="area-label">
          <div className="tx category-head-label">
            Lihat semua
          </div>
        </div>
      </div>
    </div>
  )

  const _renderRightPane = () => (
    <div className="right-pane">
      {
        // [3 head category] -> [Main category]
        categoryHeadList?.map((headCategory, headIdx) => (
          <div className={`area-category main ${headCategory?.name} ${(!currSubCategory && currCategoryHeadIdx === headIdx) ? 'active' : ''}`}>
            <div className="category-enclosure">
              <CardCategoryView
                onClick={e => _onCategoryItemClick({ e, pos: 'root' })}
                categoryName={`Lihat semua ${headCategory?.name}`}
                categoryImg={headCategory?.media && headCategory?.media[0]?.url}
                categoryMeta={headCategory} />
            </div>
            {
              headCategory?.children?.map((category, idx) => (
                <div className="category-enclosure">
                  <CardCategoryView
                    onClick={e => _onCategoryItemClick({ e })}
                    categoryName={category?.name}
                    categoryImg={(category?.media && category?.media[0]?.url) || (headCategory?.media && headCategory?.media[0]?.url)}
                    categoryMeta={category} />
                </div>
              ))
            }
          </div>
        ))
      }
      {
        _renderSubCategories()
      }
    </div>
  )

  const _renderSubCategories = () =>
    // [3 head category] -> [Main categories] -> [Sub categories]
    categoryHeadList?.map((headCategory, headIdx) =>
      headCategory?.children?.map((category, idx) => {
        if (category?.children?.length < 1) return ""
        else
          return (
            <div className={`area-category subcategory ${category?.name} ${currSubCategory === category?.name ? 'active' : ''}`}>
              <div className="category-enclosure">
                <CardCategoryView
                  onClick={() => _onHeadCategoryItemClick({ headIdx })}
                  categoryName="Kembali"
                  categoryImg={headCategory?.media && headCategory?.media[0]?.url}
                  categoryMeta={headCategory} />
              </div>
              {
                category?.children?.map((subCategory, subIdx) => (
                  <div className="category-enclosure">
                    <CardCategoryView
                      onClick={e => _onCategoryItemClick({ e, pos: 'sub', subIdx })}
                      categoryName={subCategory?.name}
                      categoryImg={subCategory?.media && subCategory?.media[0]?.url || category?.media && category?.media[0]?.url || headCategory?.media && headCategory?.media[0]?.url}
                      categoryMeta={category} />

                  </div>
                ))
              }
              <div className="category-enclosure">
                <CardCategoryView
                  onClick={e => _onCategoryItemClick({ e, pos: 'main' })}
                  categoryName={`Lihat semua ${category?.name}`}
                  categoryImg={category?.media && category?.media[0]?.url || headCategory?.media && headCategory?.media[0]?.url}
                  categoryMeta={category} />
              </div>

            </div>
          )
      })
    )

  const _renderPlaceholder = () => (
    <div className="selector-category">
      <div className="left-pane">
        {
          [1, 2, 3, 4]?.map(() => (
            <div className={`category-head-btn-enclosing`}>
              <div className="area-img">
                <AVSkeleton />
              </div>
              <div className="area-label">
                <div className="enclose-skeleton-label">
                  <AVSkeleton />
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="right-pane">
        <div className={`area-category main active`}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
              <div className="category-enclosure">
                <CardCategoryView
                  loadingMode={isLoading} />
              </div>
            ))

          }
        </div>
      </div>
    </div>
  )


  return (
    <div className="modal-category-selector-view">
      <div className="selector-enclosure">
        <div className="selector-header">
          <div class="enclosing-button">
            <AVButton
              className="button-close"
              onClick={_onCloseClick}
              size="conform"
              btnStyle="borderless">
              &times;
            </AVButton>
          </div>
          <div class="tx title">
            Pilih kategori
          </div>
        </div>
        {
          !isLoading
            ? (
              <div className="selector-category">
                {
                  <F>
                    {_renderLeftPane()}
                    {_renderRightPane()}
                  </F>
                }
              </div>
            )
            : _renderPlaceholder()
        }
      </div>
    </div>
  )
}