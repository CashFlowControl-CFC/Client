import {combineReducers, createStore} from 'redux';
import { transactionReducer } from './transactionReducer';
import { categoriesReducer } from './categoriesReducer';
import { transDataReducer } from './transDataReducer';
import iconReducer from './iconReducer';
import { targetReducer } from './targetReducer';
import paymentReducer from './paymentReducer';
import { userReducer } from './userReducer';
import { currencyReducer } from './currencyReducer';
import {avatarReducer} from './avatarReducer'
const rootReducer = combineReducers({
    transaction: transactionReducer, 
    category: categoriesReducer,
    transData: transDataReducer,
    icon: iconReducer,
    target: targetReducer,
    payment: paymentReducer,
    user:userReducer,
    currency: currencyReducer,
    avatar:avatarReducer
})

export default store = createStore(rootReducer);
