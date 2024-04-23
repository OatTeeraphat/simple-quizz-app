import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import { quizzSliceReducer } from '@/store/quizz/quizzSlice'
import { leaderBoardSliceReducer } from '@/store/leaderBoard/leaderBoardSlice'


export const rootReducer = combineReducers({
  questions: quizzSliceReducer,
  leaderBoard : leaderBoardSliceReducer
})


const persistConfig = {
    key: 'root',
    storage,
};

export const store = configureStore({ 
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }), // fix redux persist non serialize
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, ReturnType<typeof rootReducer>, null, Action<string>>;
