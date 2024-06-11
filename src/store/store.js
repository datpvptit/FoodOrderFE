import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng local storage để lưu trữ trạng thái
import rootReducer from '../reducers/rootReducer'; // Import rootReducer đã được cấu hình với Redux Persist

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
