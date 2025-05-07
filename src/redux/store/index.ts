import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import achievementsReducer from 'redux/reducers/achievements';
import darkModeReducer from 'redux/reducers/darkMode';

const persistConfig = {
  key: 'root',
  storage,
};

const combinedReducers = combineReducers({
  achievements: achievementsReducer,
  darkMode: darkModeReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    });
    if (process.env.NODE_ENV !== 'production') {
      return middleware.concat(logger);
    }
    return middleware;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
