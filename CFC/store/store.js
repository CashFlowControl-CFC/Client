import {combineReducers, createStore} from 'redux';
import { transactionReducer } from './transactionReducer';
import { categoriesReducer } from './categoriesReducer';
import { transDataReducer } from './transDataReducer';
import iconReducer from './iconReducer';
import { targetReducer } from './targetReducer';


const rootReducer = combineReducers({
    transaction: transactionReducer, 
    category: categoriesReducer,
    transData: transDataReducer,
    icon: iconReducer,
    target: targetReducer
})

export default store = createStore(rootReducer);
