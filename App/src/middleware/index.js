import { toast } from 'react-toastify';
import { generateStore } from 'drizzle';
import drizzleOptions from '../drizzleOptions';

const contractEventNotifier = store => next => action => {
  //BLOCK_RECEIVED
  if (action.type === 'CONTRACT_SYNCED') {
    toast.dismiss();
    toast.success('Success! ✔️', {
      autoclose: 5000,
    });
  }
  return next(action);
};

const appMiddlewares = [contractEventNotifier];

const store = generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false, // enable ReduxDevTools!
});

// Use the store with DrizzleProvider
export default store;
