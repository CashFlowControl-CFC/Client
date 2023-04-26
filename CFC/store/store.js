import {combineReducers, createStore} from 'redux';
import { transactionReducer } from './transactionReducer';
import { categoriesReducer } from './categoriesReducer';


const rootReducer = combineReducers({
    transaction: transactionReducer, 
    category: categoriesReducer
})

export default store = createStore(rootReducer);
