import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng local storage để lưu trữ trạng thái
import reducer from './reducer'; // Import reducer của bạn

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  app: reducer, // Đổi tên reducer nếu cần thiết
  // Thêm các reducer khác nếu có
});

export default persistReducer(persistConfig, rootReducer);
