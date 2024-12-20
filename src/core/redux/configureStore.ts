import { configureStore } from '@reduxjs/toolkit';

import ChatReducer from 'src/modules/chat/adapters/in/slicers/ChatSlice';
import PatienPlansReducer from 'src/modules/patient-plans/adapters/in/slicers/PatientPlanSlice';

// const {applyMiddleware, combineReducers, createStore} = require('redux');
import thunk from 'redux-thunk';

/* const middleware = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return (process.env.NODE_ENV !== 'production' ? [await import('redux-immutable-state-invariant'), thunk] : [thunk]) as any;
}; */

// Note passing middleware as the last argument to createStore requires redux@>=3.1.0
// const store = createStore(reducer);
export default configureStore({
  reducer: {
    chat: ChatReducer,
    patientPlans: PatienPlansReducer,
  },
  devTools: true,
  // enhancers

  /* middleware: [
    () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
      return (process.env.NODE_ENV !== 'production' ? [import('redux-immutable-state-invariant'), thunk] : [thunk]) as any;
    },
  ], */
});
