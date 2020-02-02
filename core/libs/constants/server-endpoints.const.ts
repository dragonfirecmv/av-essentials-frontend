export const BASE_URL = "https://artz-backend.appspot.com"

export const API_AUTH = {
  USER_LOGIN:           () => `${BASE_URL}/auth/login`,
  USER_REGISTER:        () => `${BASE_URL}/auth/login`,

  USER_UPDATE:          () => `${BASE_URL}/auth/me/update`,
  USER_UPDATEPASSWORD:  () => `${BASE_URL}/auth/me/update-password`
}

export const API_GALLERY = {
  CATEGORIES:                   ()                   => `${BASE_URL}/api/categories`,
  CATEGORIES_BYID:              (id: string)         => `${BASE_URL}/api/categories/by-id/${id}`,
  CATEGORIES_BYSLUG:            (slug: string)       => `${BASE_URL}/api/categories/by-slug/${slug}`,

  VENDOR:                     ()                   => `${BASE_URL}/api/vendors`,
  VENDOR_BYID:                (id: string)         => `${BASE_URL}/api/vendors/id/${id}`,
  VENDOR_BYSLUG:              (slug: string)       => `${BASE_URL}/api/vendors/slug/${slug}`,
  VENDOR_BYID_UPDATECATEGORY: (slug: string)       => `${BASE_URL}/api/vendors/api/vendors/slug/${slug}/update-category`,
  VENDOR_BYCATEGORY:          (categoryId: string) => `${BASE_URL}/api/vendors/by-category/${categoryId}`,
  VENDOR_BYCATEGORY_DEEP:     (categoryId: string) => `${BASE_URL}/api/vendors/by-category-deep/${categoryId}`,
  VENDOR_GET_ME:              ()                   => `${BASE_URL}/api/vendors/by-user}`,

  PACKAGES:                   (id?: string)        => `${BASE_URL}/api/vendorapi-packages/${id}`,
  PACKAGEITEMS:               (id?: string)        => `${BASE_URL}/api/vendorapi-package-items/${id}`,
  GOODS:                      (id?: string)        => `${BASE_URL}/api/vendorapi-goods/${id}`
}

export const API_SHOPCART = {
  GET_ALL:                      ()           => `${BASE_URL}/api/shop-cart/`,
  GET_LISTMY_BYTOKEN:           ()           => `${BASE_URL}/api/shop-cart/by-user`,
          
  PUT_EDITCARTINFO:                ()           => `${BASE_URL}/api/shop-cart/my-shopcart/additional-info`,
  POST_CREATENEW_BYTOKEN:       ()           => `${BASE_URL}/api/shop-cart/my-shopcart/new`,
  POST_CHECKOUT_BYTOKEN:       ()           => `${BASE_URL}/api/shop-cart/my-shopcart/check-out`,
  GET_MY_BYTOKEN:               ()           => `${BASE_URL}/api/shop-cart/my-shopcart`,
  DELETE_MY_BYTOKEN:            ()           => `${BASE_URL}/api/shop-cart/my-shopcart`,
          
  POST_ADDITEMTOMINE_BYTOKEN:   ()           => `${BASE_URL}/api/shop-cart/my-shopcart/add-items`,
  GET_ITEMDETAILS_BYTOKEN:      (id: string) => `${BASE_URL}/api/shop-cart/shopcart/item/${id}`,
  PUT_EDITITEM_BYTOKEN:         (id: string) => `${BASE_URL}/api/shop-cart/shopcart/item/${id}`,
  DELETE_ITEMFROMMINE_BYTOKEN:  (id: string) => `${BASE_URL}/api/shop-cart/shopcart/item/${id}`
}