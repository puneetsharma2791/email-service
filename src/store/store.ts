import {  configureStore } from '@reduxjs/toolkit'

import {userSlice} from "./slices/userSlice"



export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('SEHAJ_ASSIGNMENT_LOCAL_STORE');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = (state:any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('SEHAJ_ASSIGNMENT_LOCAL_STORE', serializedState);
  } catch {
    // ignore write errors
  }
};
const persistedState = loadState();
export const store = configureStore({
  reducer: userSlice.reducer,
  preloadedState:persistedState
})

store.subscribe(() => {
  saveState(
    store.getState()
  );
});
