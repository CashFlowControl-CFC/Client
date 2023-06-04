const initialState = {
    currency: [],
    symbols: [
        {id: '1', name: 'UAH', symb:'₴'}, 
        {id: '2', name: 'USD', symb:'$'}, 
        {id: '3', name: 'EUR', symb:'€'}
    ],
    current: 'UAH',
    currentSymb: '₴',
    currencyMoney: 0
}

export const currencyReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_CURRENCY':
            return {...state, currency: action.payload}
        case 'SET_CURRENT':
            return {...state, current: action.payload}
        case 'SET_CURRENT_SYMB':
            return {...state, currentSymb: action.payload}
        case 'SET_CURRENCY_MONEY':
            return {...state, currencyMoney: action.payload}
        default:
            return state;
    }
}