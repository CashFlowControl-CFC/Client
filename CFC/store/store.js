import {createStore} from 'redux';
import { transactionReducer } from './transactionReducer';


const store = createStore(transactionReducer);

export default store;
