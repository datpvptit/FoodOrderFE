import {
  TOGGLE_SIDEBAR,
  LOGIN_SUCCESS,
  LOGOUT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAR_CART_ITEMS,
  ORDER_ITEMS,
  CLEAR_ORDER_ITEMS,
  ADD_ORDER_ID,
  CUSTOMER
} from "./actionTypes";

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const logout = () => ({
  type: LOGOUT,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  payload: product,
});

export const saveCurrentPath = (path) => ({
  type: "SAVE_CURRENT_PATH",
  payload: path,
});

export const updateCartItemQuantity = (itemId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: {
    itemId,
    quantity,
  },
});

export const clearCartItems = () => ({
  type: CLEAR_CART_ITEMS,
});


export const orderItems = () => ({
  type: ORDER_ITEMS
});

export const customer = () => ({
  type: CUSTOMER
});

export const clearOrderItems = () => ({
  type: CLEAR_ORDER_ITEMS
});

export const addOrderId = (orderId) => ({
  type: ADD_ORDER_ID,
  payload: {
    orderId: orderId
  }
})
