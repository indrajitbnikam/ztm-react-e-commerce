import { shopActionTypes } from "./shop.types"

export const setShopCollections = collections => ({
  type: shopActionTypes.SET_COLLECTIONS,
  payload: collections
});