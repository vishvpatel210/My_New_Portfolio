import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import jobReducer from './jobSlice';
import workerReducer from './workerSlice';
import themeReducer from './themeSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    workers: workerReducer,
    theme: themeReducer,
  },
});
