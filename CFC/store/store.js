import {combineReducers, createStore} from 'redux';
import { transactionReducer } from './transactionReducer';
import { categoriesReducer } from './categoriesReducer';
import { accountReducer } from './accountsReducer';


const rootReducer = combineReducers({
    transaction: transactionReducer, 
    category: categoriesReducer,
    account: accountReducer
})

export default store = createStore(rootReducer);
