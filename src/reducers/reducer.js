// reducer.js
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
} from "../actions/actionTypes";

const initialState = {
  isSidebarOpen: false,
  isLoggedIn: false,
  isAdmin: false,
  isCounter: false,
  user: null,
  currentPath: "/",
  cartItems: [],
  cartItemsOrder: [],
  listOrderId: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
        isStaff: action.payload.isStaff,
        isChef: action.payload.isChef,
        isRecep: action.payload.isRecep
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        isStaff: false,
        isChef: false,
        isRecep: false,
        user: null,
      };
    case ADD_TO_CART:
      // Kiểm tra xem món hàng đã tồn tại trong giỏ hàng chưa
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // Nếu món hàng đã tồn tại, tăng số lượng lên một        
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // Nếu món hàng chưa tồn tại, thêm vào giỏ hàng
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case "SAVE_CURRENT_PATH":
      return {
        ...state,
        currentPath: action.payload,
      };
    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case CLEAR_CART_ITEMS:
      return {
        ...state,
        cartItems: [], // Xóa tất cả sản phẩm trong cartItem bằng cách gán mảng rỗng
      };
    case ORDER_ITEMS:
      if (state.cartItemsOrder && state.cartItemsOrder.length > 0) {
        let updatedOrderItems = [...state.cartItemsOrder];
        let cartItemsCopy = [...state.cartItems];
        for (let i = 0; i < updatedOrderItems.length; i++) {
          for (let j = 0; j < cartItemsCopy.length; j++) {
            if (updatedOrderItems[i].id === cartItemsCopy[j].id) {
              updatedOrderItems[i].quantity += cartItemsCopy[j].quantity;
              cartItemsCopy.splice(j, 1);
            }
          }
        }
        updatedOrderItems = updatedOrderItems.concat(cartItemsCopy);
        return {
          ...state,
          cartItemsOrder: updatedOrderItems,
          cartItems: [], // Xóa các sản phẩm trong cartItems sau khi order
        };
      } else {
        return {
          ...state,
          cartItemsOrder: [...state.cartItems],
          cartItems: [], // Xóa các sản phẩm trong cartItems sau khi order
        };
      }

    case CLEAR_ORDER_ITEMS:
      return {
        ...state,
        cartItemsOrder: [],
      };
    case ADD_ORDER_ID:
      // Chuyển đổi listOrderId thành một mảng nếu nó không phải là mảng
      const updatedListOrderId = Array.isArray(state.listOrderId)
        ? state.listOrderId
        : [];
      return {
        ...state,
        listOrderId: [...updatedListOrderId, action.payload.orderId],
      };
    default:
      return state;
  }
};

export default reducer;
