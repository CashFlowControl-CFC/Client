import {combineReducers, createStore} from 'redux';
import { transactionReducer } from './transactionReducer';
import { categoriesReducer } from './categoriesReducer';
import { transDataReducer } from './transDataReducer';
import iconReducer from './iconReducer';
import { targetReducer } from './targetReducer';
import paymentReducer from './paymentReducer';


const rootReducer = combineReducers({
    transaction: transactionReducer, 
    category: categoriesReducer,
    transData: transDataReducer,
    icon: iconReducer,
    target: targetReducer,
    payment: paymentReducer
})

export default store = createStore(rootReducer);
