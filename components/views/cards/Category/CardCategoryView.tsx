//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import './_cardCategory.scss'
import { ICategoryResponse } from '~/core/redux/gallery/categories'
import { CommonPlaceholder } from '~/static/img'
import { AVSkeleton } from '~/components/controls'
//#endregion


export const CardCategoryView = (props: IProps) => {

  const _onClick = e => {
    props.onClick
      && props.onClick({ e, meta: props.categoryMeta })
  }

  const _renderPlaceholder = () => (
    <div className="view-card-category no-select" onClick={_onClick}>
      <div className="area image">
        <div className="enclosing-img">
          <AVSkeleton />
        </div>
      </div>
      <div className="area label">
        <div className="eclose-skeleton-text">
          <AVSkeleton />
        </div>
      </div>
    </div>
  )

  const _renderContent = () => (
    <div className="view-card-category" onClick={_onClick}>
      <div className="area image">
        <div className="enclosing-img">
          <img src={props.categoryImg || CommonPlaceholder} alt="" />
        </div>
      </div>
      <div className="area label">
        <div className="tx category-name">{props.categoryName}</div>
      </div>
    </div>
  )

  return (
    props.loadingMode
      ? (
        _renderPlaceholder()
      )
      : (
        _renderContent()
      )
  )
}

interface IProps {
  categoryName?: string
  categoryImg?: string
  categoryMeta?: ICategoryResponse
  loadingMode?: boolean

  onClick?: any
}